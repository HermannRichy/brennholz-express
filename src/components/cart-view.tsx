"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowBackUp, IconDroplet, IconLock, IconMinus, IconPlus, IconTruckDelivery, IconX } from "@tabler/icons-react";
import { useCart } from "@/context/cart-context";
import { DELIVERY_OPTIONS } from "@/lib/products";
import { EUR, UNIT_LABEL, unitPrice } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import type { Product } from "@/lib/types";

const REASSURANCE = [
  {
    icon: IconLock,
    title: "Sichere Zahlung",
    body: "Bezahlt wird auf einer gesicherten Zahlungsseite – keine Bankdaten gelangen auf diese Website.",
  },
  {
    icon: IconDroplet,
    title: "Garantiert trocken",
    body: "Unter 20 % Restfeuchte, mit dem Messgerät geprüft und dem Lieferschein beigelegt.",
  },
  {
    icon: IconTruckDelivery,
    title: "Lieferung in 48–72 h",
    body: "Zeitfenster von 2 Stunden, am Vortag per SMS bestätigt.",
  },
  {
    icon: IconArrowBackUp,
    title: "14 Tage Widerrufsrecht",
    body: "Für Verbraucher, Rücknahme in Absprache mit Ihnen.",
    href: "/versand-rueckgabe",
  },
] as const;

export function CartView({ products }: { products: Product[] }) {
  const { lines, bump, remove, count } = useCart();
  const [delivery, setDelivery] = useState<(typeof DELIVERY_OPTIONS)[number]["id"]>("vrac");
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);

  const resolved = useMemo(
    () =>
      lines
        .map((l) => ({ line: l, product: products.find((p) => p.id === l.productId) }))
        .filter((x): x is { line: (typeof lines)[number]; product: Product } => !!x.product),
    [lines, products]
  );

  const subtotal = resolved.reduce((sum, { line, product }) => sum + unitPrice(product, line.qty) * line.qty, 0);
  const savings = resolved.reduce((sum, { line, product }) => {
    if (product.unit !== "ster") return sum;
    return sum + (product.price - unitPrice(product, line.qty)) * line.qty;
  }, 0);
  const delCost = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.price ?? 0;
  const grandTotal = subtotal + delCost;

  async function handleCheckout() {
    setCheckingOut(true);
    setCheckoutError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, delivery }),
      });
      if (res.ok) {
        const { checkoutUrl } = await res.json();
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
          return;
        }
      }
      setCheckoutError(true);
    } catch {
      setCheckoutError(true);
    } finally {
      setCheckingOut(false);
    }
  }

  const checkoutLabel = checkingOut ? "Einen Moment …" : "Zur Kasse";

  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-12 pb-28 md:pb-36">
      <header className="pt-8 md:pt-14 pb-10 border-b border-line flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Ihre Auswahl</p>
          <h1 className="mt-5 font-serif font-light text-[3.2rem] md:text-[5.6rem] leading-[0.98]">
            Warenkorb
          </h1>
        </div>
        <span className="text-[11px] tracking-[0.22em] uppercase text-ink/50 pb-2">
          {count} {count === 1 ? "Artikel" : "Artikel"}
        </span>
      </header>

      {resolved.length === 0 ? (
        <div className="py-24 md:py-32 max-w-xl">
          <p className="font-serif font-light text-[2.4rem] md:text-[3.4rem] leading-[1.05]">
            Ihr Warenkorb ist <em>leer</em>.
          </p>
          <p className="mt-5 text-ink/65">Entdecken Sie unser trockenes Premium-Brennholz.</p>
          <div className="mt-8">
            <Button href="/shop" arrow>Zum Shop</Button>
          </div>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-12 md:gap-16 pt-4">
          <div className="md:col-span-7">
            {resolved.map(({ line, product }) => (
              <div key={line.productId} className="flex gap-5 md:gap-7 py-7 border-b border-line">
                <Link
                  href={`/produkt/${product.slug}`}
                  className="relative w-24 h-28 md:w-32 md:h-40 shrink-0 overflow-hidden bg-surface"
                >
                  {product.img && <Image src={product.img} alt="" fill sizes="130px" className="object-cover" />}
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex gap-4 justify-between">
                    <div>
                      <Link href={`/produkt/${product.slug}`} className="font-serif text-[1.5rem] md:text-[1.8rem] leading-tight hover:text-gold-deep transition-colors">
                        {product.name}
                      </Link>
                      <div className="mt-1 text-[11px] tracking-[0.18em] uppercase text-ink/45">
                        {EUR.format(unitPrice(product, line.qty))} / {UNIT_LABEL[product.unit].short}
                      </div>
                    </div>
                    <div className="font-serif text-[1.4rem] md:text-[1.6rem]">
                      {EUR.format(unitPrice(product, line.qty) * line.qty)}
                    </div>
                  </div>
                  <div className="mt-auto pt-5 flex items-center gap-4 md:gap-6">
                    <div className="inline-flex items-stretch border border-ink/30">
                      <button onClick={() => bump(line.productId, -1)} aria-label="Menge verringern" className="w-10 h-10 grid place-items-center cursor-pointer hover:bg-ink hover:text-bg active:scale-90 transition">
                        <IconMinus size={14} stroke={1.5} />
                      </button>
                      <div className="w-11 grid place-items-center font-serif text-[1.2rem] border-x border-ink/30">
                        <span key={line.qty} className="animate-pop inline-block">{line.qty}</span>
                      </div>
                      <button onClick={() => bump(line.productId, 1)} aria-label="Menge erhöhen" className="w-10 h-10 grid place-items-center cursor-pointer hover:bg-ink hover:text-bg active:scale-90 transition">
                        <IconPlus size={14} stroke={1.5} />
                      </button>
                    </div>
                    <button onClick={() => remove(line.productId)} className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.16em] uppercase text-ink/50 hover:text-ember cursor-pointer transition-colors">
                      <IconX size={14} stroke={1.5} />
                      Entfernen
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3 md:gap-4 py-10">
              {REASSURANCE.map((r) => {
                const inner = (
                  <>
                    <r.icon size={26} stroke={1.1} className="text-gold transition-transform duration-500 group-hover:scale-110" />
                    <div className="mt-4 font-serif text-[1.25rem] md:text-[1.4rem] leading-tight">{r.title}</div>
                    <p className="mt-2 text-[12px] text-ink/55 leading-relaxed m-0">{r.body}</p>
                  </>
                );
                const cls = "group p-5 md:p-6 bg-surface/70 border border-line transition-all duration-500 hover:border-gold hover:-translate-y-0.5";
                return "href" in r ? (
                  <Link key={r.title} href={r.href} className={cls}>{inner}</Link>
                ) : (
                  <div key={r.title} className={cls}>{inner}</div>
                );
              })}
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="md:sticky md:top-32 bg-ink text-bg grain p-7 md:p-10">
              {checkoutError && (
                <p role="alert" className="mb-6 p-4 text-[12.5px] border border-ember/60 bg-ember/10 text-bg/90">
                  Die Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es gleich noch einmal oder rufen
                  Sie uns an: {SITE.phone}.
                </p>
              )}
              <h2 className="font-serif text-[2rem]">Zusammenfassung</h2>

              <fieldset className="mt-7 border-0 p-0 m-0">
                <legend className="mb-3 text-[10px] font-semibold tracking-[0.28em] uppercase text-gold">Lieferart</legend>
                <div className="flex flex-col gap-2">
                  {DELIVERY_OPTIONS.map((d) => (
                    <label
                      key={d.id}
                      className={`flex items-center gap-4 px-4 py-3.5 border cursor-pointer transition-colors duration-300 ${
                        delivery === d.id ? "border-gold bg-bg/5" : "border-line-light hover:border-bg/40"
                      }`}
                    >
                      <input type="radio" name="delivery" checked={delivery === d.id} onChange={() => setDelivery(d.id)} className="sr-only" />
                      <span className={`w-4 h-4 rounded-full border grid place-items-center ${delivery === d.id ? "border-gold" : "border-bg/40"}`}>
                        <span className={`w-2 h-2 rounded-full bg-gold transition-transform ${delivery === d.id ? "scale-100" : "scale-0"}`} />
                      </span>
                      <span className="flex-1 text-[13px]">{d.label}</span>
                      <span className="text-[13px] text-bg/60">{d.price === 0 ? "kostenlos" : `+ ${EUR.format(d.price)}`}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <dl className="mt-8 flex flex-col gap-3 text-[14px]">
                <div className="flex justify-between"><dt className="text-bg/60">Zwischensumme</dt><dd>{EUR.format(subtotal)}</dd></div>
                {savings > 0 && (
                  <div className="flex justify-between text-gold-light"><dt>Mengenrabatt</dt><dd>− {EUR.format(savings)}</dd></div>
                )}
                <div className="flex justify-between"><dt className="text-bg/60">Lieferung</dt><dd>{delCost === 0 ? "kostenlos" : EUR.format(delCost)}</dd></div>
                <div className="flex justify-between items-baseline pt-5 mt-2 border-t border-line-light">
                  <dt className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold">Gesamt inkl. MwSt.</dt>
                  <dd key={grandTotal} className="animate-fade-in font-serif text-[2.4rem] leading-none">{EUR.format(grandTotal)}</dd>
                </div>
              </dl>

              <div className="hidden md:block mt-8">
                <Button block arrow onClick={handleCheckout} disabled={checkingOut}>{checkoutLabel}</Button>
              </div>
              <p className="mt-5 text-[11px] text-bg/45 leading-relaxed">
                Mit der Bestellung akzeptieren Sie unsere <Link href="/agb" className="underline underline-offset-4 hover:text-gold-light">AGB</Link>.
              </p>
            </div>
          </aside>
        </div>
      )}

      {resolved.length > 0 && (
        <>
          <div className="h-24 md:hidden" aria-hidden />
          <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg/95 backdrop-blur-md border-t border-line px-5 py-3 flex gap-4 items-center">
            <div className="mr-auto">
              <div className="text-[9px] font-semibold tracking-[0.24em] uppercase text-ink/50">Gesamt inkl. MwSt.</div>
              <div key={grandTotal} className="animate-fade-in font-serif text-[1.6rem] leading-none mt-1">{EUR.format(grandTotal)}</div>
            </div>
            <Button className="!px-6" onClick={handleCheckout} disabled={checkingOut}>{checkoutLabel}</Button>
          </div>
        </>
      )}
    </div>
  );
}
