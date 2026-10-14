import type { Metadata } from "next";
import { getProducts } from "@/lib/catalog";
import { ShopClient } from "@/components/shop-client";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Scheitholz aus Eiche, Buche und Hainbuche, Briketts, Pellets und Anzündholz – trocken, kalibriert, in 48–72 Stunden geliefert.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopClient products={products} />;
}
