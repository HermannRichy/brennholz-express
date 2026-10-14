export type ProductCategory = string;

/** Verkaufseinheit : Ster (Raummeter), Palette oder Sack. */
export type ProductUnit = "ster" | "palette" | "sack";

export interface Product {
  id: string;
  slug: string;
  img: string;
  name: string;
  category: ProductCategory;
  /** Holzart (Eiche, Buche …) */
  essence: string;
  /** Scheitlänge, "—" si non applicable */
  length: string;
  spec: string;
  description: string;
  price: number;
  unit: ProductUnit;
  specs: { k: string; v: string }[];
  /** Shopify variant GID. */
  variantId?: string;
}
