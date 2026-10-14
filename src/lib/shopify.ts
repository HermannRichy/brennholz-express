import "server-only";
import type { Product, ProductCategory, ProductUnit } from "./types";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN;
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-01";

export function isShopifyConfigured(): boolean {
  return Boolean(DOMAIN && TOKEN);
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error("Shopify ist nicht konfiguriert (SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_API_TOKEN fehlen).");
  }
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Die Shopify Storefront API antwortete mit Status ${res.status}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(", "));
  }
  return json.data as T;
}

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        productType
        tags
        images(first: 1) {
          nodes {
            url
          }
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        variants(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
`;

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  images: { nodes: { url: string }[] };
  priceRange: { minVariantPrice: { amount: string } };
  variants: { nodes: { id: string }[] };
}

/**
 * Tag-Konventionen im Shopify-Admin (Produkt > Tags) :
 *   holzart:eiche      -> Holzart "eiche"
 *   laenge:33 cm       -> Scheitlänge "33 cm"
 *   einheit:palette    -> Einheit "palette" (ster | palette | sack, Standard "ster")
 */
function readTag(tags: string[], prefix: string): string | undefined {
  const tag = tags.find((t) => t.toLowerCase().startsWith(`${prefix}:`));
  return tag?.slice(prefix.length + 1).trim();
}

const UNIT_ALIASES: Record<string, ProductUnit> = {
  ster: "ster",
  raummeter: "ster",
  palette: "palette",
  sack: "sack",
  "säcke": "sack",
};

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function mapProduct(node: ShopifyProductNode): Product {
  const essence = capitalize(readTag(node.tags, "holzart") ?? "");
  const length = readTag(node.tags, "laenge") ?? "—";
  const unit = UNIT_ALIASES[(readTag(node.tags, "einheit") ?? "ster").toLowerCase()] ?? "ster";
  const price = Number(node.priceRange.minVariantPrice.amount);

  return {
    id: node.handle,
    slug: node.handle,
    img: node.images.nodes[0]?.url ?? "",
    name: node.title,
    category: (node.productType || "Scheitholz") as ProductCategory,
    essence,
    length,
    spec: [essence, length !== "—" ? length : null].filter(Boolean).join(" · "),
    description: node.description,
    price,
    unit,
    specs: [
      essence && { k: "Holzart", v: essence },
      length !== "—" && { k: "Scheitlänge", v: length },
    ].filter((s): s is { k: string; v: string } => Boolean(s)),
    variantId: node.variants.nodes[0]?.id,
  };
}

export async function fetchShopifyProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{ products: { nodes: ShopifyProductNode[] } }>(
    PRODUCTS_QUERY,
    { first: 50 }
  );
  return data.products.nodes.map(mapProduct);
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!, $note: String) {
    cartCreate(input: { lines: $lines, note: $note }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createShopifyCheckout(
  lines: { variantId: string; quantity: number }[],
  note?: string
): Promise<string> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(CART_CREATE_MUTATION, {
    lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity })),
    note,
  });
  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
  }
  if (!data.cartCreate.cart) {
    throw new Error("Shopify hat keinen Warenkorb zurückgegeben.");
  }
  return data.cartCreate.cart.checkoutUrl;
}
