import { getProductBySlug } from "@/lib/catalog";
import { EUR, UNIT_LABEL } from "@/lib/pricing";
import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Produkt von Brennholz Express";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return renderOgImage({
      eyebrow: "Shop",
      title: "Premium-Brennholz",
      subtitle: "Lieferung im Elsass und angrenzenden Gebieten.",
    });
  }

  return renderOgImage({
    eyebrow: `${product.category}${product.essence ? ` · ${product.essence}` : ""}`,
    title: product.name,
    subtitle: product.spec,
    badge: `${EUR.format(product.price)} / ${UNIT_LABEL[product.unit].short}`,
  });
}
