import Image from "next/image";
import Link from "next/link";
import { EUR, UNIT_LABEL } from "@/lib/pricing";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  priority = false,
  tall = false,
}: {
  product: Product;
  priority?: boolean;
  tall?: boolean;
}) {
  return (
    <Link href={`/produkt/${product.slug}`} className="group block">
      <div
        className={`relative overflow-hidden bg-surface ${tall ? "aspect-[4/5.4]" : "aspect-[4/5]"}`}
      >
        {product.img && (
          <Image
            src={product.img}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 text-[9px] font-semibold tracking-[0.26em] uppercase text-bg bg-ink/60 backdrop-blur-sm px-3 py-1.5">
          {product.category}
        </span>
        <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-bg text-[10px] font-semibold tracking-[0.24em] uppercase translate-y-3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          Ansehen
          <span className="h-px w-10 bg-gold-light" />
        </span>
      </div>
      <div className="pt-5 flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif text-[1.5rem] md:text-[1.65rem] leading-[1.1] transition-colors duration-500 group-hover:text-gold-deep">
            {product.name}
          </h3>
          <p className="mt-1.5 text-[12px] text-ink/55 truncate">{product.spec}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-serif text-[1.35rem] leading-none">{EUR.format(product.price)}</div>
          <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-ink/45">
            / {UNIT_LABEL[product.unit].short}
          </div>
        </div>
      </div>
    </Link>
  );
}
