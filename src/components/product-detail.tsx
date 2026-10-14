"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconCheck, IconChevronDown, IconMinus, IconPlus, IconShieldCheck, IconTruckDelivery } from "@tabler/icons-react";
import type { Product } from "@/lib/types";
import { EUR, UNIT_LABEL, unitPrice, discountNote } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

function Accordion({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="group border-t border-line last:border-b" open={open}>
      <summary className="flex items-center justify-between py-5 cursor-pointer list-none text-[11px] font-semibold tracking-[0.24em] uppercase [&::-webkit-details-marker]:hidden hover:text-gold-deep transition-colors">
        {title}
        <IconChevronDown size={18} stroke={1.25} className="transition-transform duration-500 group-open:rotate-180" />
      </summary>
      <div className="pb-6 text-[14px] text-ink/70 leading-relaxed">{children}</div>
    </details>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const isSter = product.unit === "ster";
  const unit = isSter ? unitPrice(product, qty) : product.price;
  const total = unit * qty;
  const unitName = UNIT_LABEL[product.unit];

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1800);
  };

  const addLabel = added ? (
    <>
      <IconCheck size={16} stroke={2} className="animate-check-in" />
      Hinzugefügt
    </>
  ) : (
    "In den Warenkorb"
  );

  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-12 pb-28 md:pb-36">
      <nav aria-label="Brotkrumen" className="pt-6 md:pt-10 pb-8 text-[10px] font-semibold tracking-[0.24em] uppercase text-ink/45 flex gap-3">
        <Link href="/shop" className="link-line hover:text-ink">Shop</Link>
        <span aria-hidden>/</span>
        <span className="text-ink">{product.category}</span>
      </nav>

      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-7">
          <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-surface">
            {product.img && (
              <Image
                src={product.img}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover animate-ken-burns"
              />
            )}
            <div className="absolute inset-4 border border-bg/40 pointer-events-none" />
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="eyebrow">
              {product.essence ? `${product.essence} · ` : ""}Elsass
            </p>
            <h1 className="mt-5 font-serif font-light text-[2.8rem] md:text-[4rem] leading-[1]">{product.name}</h1>
            <p className="mt-6 text-ink/70 leading-relaxed">{product.description}</p>

            <div className="mt-8 flex items-baseline gap-3 pb-8 border-b border-line">
              <span key={unit} className="animate-fade-in font-serif text-[3rem] leading-none">{EUR.format(unit)}</span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-ink/50">
                / {unitName.short} · inkl. MwSt.
              </span>
            </div>

            <div className="py-8 flex flex-wrap items-end gap-8">
              <div>
                <div className="mb-3 text-[10px] font-semibold tracking-[0.26em] uppercase text-ink/55">
                  Menge ({qty === 1 ? unitName.one : unitName.many})
                </div>
                <div className="inline-flex items-stretch border border-ink/30">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Menge verringern"
                    className="w-12 h-12 grid place-items-center cursor-pointer hover:bg-ink hover:text-bg active:scale-90 transition"
                  >
                    <IconMinus size={16} stroke={1.5} />
                  </button>
                  <div className="w-14 grid place-items-center font-serif text-[1.5rem] border-x border-ink/30">
                    <span key={qty} className="animate-pop inline-block">{qty}</span>
                  </div>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Menge erhöhen"
                    className="w-12 h-12 grid place-items-center cursor-pointer hover:bg-ink hover:text-bg active:scale-90 transition"
                  >
                    <IconPlus size={16} stroke={1.5} />
                  </button>
                </div>
              </div>
              <div>
                <div className="mb-3 text-[10px] font-semibold tracking-[0.26em] uppercase text-ink/55">Gesamt</div>
                <div key={total} className="animate-fade-in font-serif text-[1.9rem] leading-[3rem]">{EUR.format(total)}</div>
              </div>
            </div>
            {isSter && <p className="-mt-3 mb-6 text-[12px] text-gold-deep">{discountNote(qty)}</p>}

            <div className="hidden md:block">
              <Button block arrow={!added} className={added ? "!bg-ink !text-gold-light" : ""} onClick={handleAdd} aria-live="polite">
                {addLabel}
              </Button>
            </div>

            <ul className="mt-8 grid gap-3 text-[13px] text-ink/70">
              <li className="flex items-center gap-3"><IconTruckDelivery size={20} stroke={1.25} className="text-gold" />Lieferung in 48–72 Stunden</li>
              <li className="flex items-center gap-3"><IconShieldCheck size={20} stroke={1.25} className="text-gold" />Restfeuchte unter 20 % garantiert</li>
            </ul>

            <div className="mt-10">
              <Accordion title="Eigenschaften" open>
                <table className="w-full text-[14px]">
                  <tbody>
                    {product.specs.map((s) => (
                      <tr key={s.k} className="border-b border-line last:border-0">
                        <td className="py-3 text-ink/55 w-[44%]">{s.k}</td>
                        <td className="py-3 font-medium">{s.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Accordion>
              <Accordion title="Lieferung">
                Mit Kipper oder Anhänger, je nach Zufahrt. Lose Abladung am Lagerplatz oder auf Palette
                gestapelt (+ 29 €). Das Zeitfenster von 2 Stunden bestätigen wir am Vortag per SMS.
              </Accordion>
              <Accordion title="Garantie & Rückgabe">
                Die Restfeuchte wird vor der Verladung gemessen, das Protokoll liegt dem Lieferschein bei.
                Verbrauchern steht ein 14-tägiges Widerrufsrecht zu –{" "}
                <Link href="/versand-rueckgabe" className="text-gold-deep underline underline-offset-4">Details</Link>.
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Feste Kaufleiste (Handy) */}
      <div className="h-24 md:hidden" aria-hidden />
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg/95 backdrop-blur-md border-t border-line px-5 py-3 flex gap-4 items-center">
        <div className="mr-auto">
          <div className="text-[9px] font-semibold tracking-[0.24em] uppercase text-ink/50">Gesamt</div>
          <div key={total} className="animate-fade-in font-serif text-[1.6rem] leading-none mt-1">{EUR.format(total)}</div>
        </div>
        <Button className={`!px-6 ${added ? "!bg-ink !text-gold-light" : ""}`} onClick={handleAdd} aria-live="polite">
          {addLabel}
        </Button>
      </div>
    </div>
  );
}
