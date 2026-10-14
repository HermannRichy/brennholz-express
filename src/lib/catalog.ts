import { cache } from "react";
import { fetchShopifyProducts, isShopifyConfigured } from "./shopify";
import type { Product } from "./types";

/**
 * Katalog: direkt aus Shopify (Storefront API). Nur in der Entwicklung und
 * solange Shopify nicht konfiguriert ist, dient ein Vorschau-Katalog.
 * In Produktion schlägt eine Anfrage bei Fehlern bewusst fehl, statt einen
 * leeren Shop anzuzeigen.
 */
export const getProducts = cache(async (): Promise<Product[]> => {
  if (!isShopifyConfigured() && process.env.NODE_ENV === "development") {
    const { DEMO_PRODUCTS } = await import("./demo-products");
    return DEMO_PRODUCTS;
  }
  return fetchShopifyProducts();
});

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}
