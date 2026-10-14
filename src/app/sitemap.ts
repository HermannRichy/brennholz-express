import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { SITE } from "@/lib/site";

const STATIC_PAGES = [
  { path: "", priority: 1 },
  { path: "/shop", priority: 0.9 },
  { path: "/unser-holz", priority: 0.7 },
  { path: "/kontakt", priority: 0.7 },
  { path: "/versand-rueckgabe", priority: 0.5 },
  { path: "/agb", priority: 0.3 },
  { path: "/nutzungsbedingungen", priority: 0.3 },
  { path: "/impressum", priority: 0.3 },
  { path: "/datenschutz", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    ...STATIC_PAGES.map((p) => ({
      url: `${SITE.url}${p.path}`,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...products.map((p) => ({
      url: `${SITE.url}/produkt/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
