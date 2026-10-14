import type { Product, ProductUnit } from "./types";

export const EUR = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

export const UNIT_LABEL: Record<ProductUnit, { one: string; many: string; short: string }> = {
  ster: { one: "Ster", many: "Ster", short: "Ster" },
  palette: { one: "Palette", many: "Paletten", short: "Palette" },
  sack: { one: "Sack", many: "Säcke", short: "Sack" },
};

/** Mengenrabatt nur auf Scheitholz, das pro Ster verkauft wird. */
export function unitPrice(product: Product, qty: number): number {
  if (product.unit !== "ster") return product.price;
  if (qty >= 5) return product.price - 10;
  if (qty >= 3) return product.price - 5;
  return product.price;
}

export function discountNote(qty: number): string {
  if (qty >= 5) return "Mengenrabatt angewendet: −10 € pro Ster.";
  if (qty >= 3)
    return "Mengenrabatt angewendet: −5 € pro Ster. Ab 5 Ster: −10 € pro Ster.";
  return "Ab 3 Ster: −5 € pro Ster.";
}
