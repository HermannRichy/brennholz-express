"use client";

import { useMemo, useState } from "react";
import { IconAdjustmentsHorizontal, IconX } from "@tabler/icons-react";
import { SORTS, type SortId } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import type { Product } from "@/lib/types";

export function ShopClient({ products }: { products: Product[] }) {
  const categories = useMemo(
    () => ["Alle", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const essences = useMemo(
    () => Array.from(new Set(products.map((p) => p.essence).filter(Boolean))),
    [products]
  );
  const lengths = useMemo(
    () => Array.from(new Set(products.map((p) => p.length).filter((l) => l !== "—"))),
    [products]
  );

  const [cat, setCat] = useState("Alle");
  const [fEssences, setFEssences] = useState<string[]>([]);
  const [fLengths, setFLengths] = useState<string[]>([]);
  const [sort, setSort] = useState<SortId>("pop");
  const [filterOpen, setFilterOpen] = useState(false);

  const toggle = (list: string[], value: string, setList: (v: string[]) => void) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const visible = useMemo(() => {
    let list = products
      .filter((p) => cat === "Alle" || p.category === cat)
      .filter((p) => fEssences.length === 0 || fEssences.includes(p.essence))
      .filter((p) => fLengths.length === 0 || fLengths.includes(p.length));
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, cat, fEssences, fLengths, sort]);

  const activeFilters = fEssences.length + fLengths.length;
  const reset = () => {
    setFEssences([]);
    setFLengths([]);
  };

  const chip = (active: boolean) =>
    `cursor-pointer text-[11px] tracking-[0.14em] px-4 py-2.5 border transition-all duration-300 active:scale-95 ${
      active
        ? "bg-ink text-bg border-ink"
        : "border-ink/25 text-ink hover:border-gold hover:text-gold-deep"
    }`;

  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-12 pb-24 md:pb-36">
      <header className="pt-8 md:pt-14 pb-10 md:pb-16 border-b border-line">
        <p className="eyebrow">Die Kollektion</p>
        <h1 className="mt-5 font-serif font-light text-[3.2rem] md:text-[6.4rem] leading-[0.98]">
          Der <em>Shop</em>
        </h1>
        <p className="mt-6 max-w-md text-ink/65">
          Scheitholz, Briketts, Pellets und Anzündholz – trocken, kalibriert und frisch aus dem
          Sägewerk.
        </p>
      </header>

      <div className="sticky top-[60px] md:top-[76px] z-30 bg-bg/92 backdrop-blur-md border-b border-line -mx-5 px-5 md:-mx-12 md:px-12">
        <div className="flex items-center gap-4 py-4">
          <div className="flex gap-7 overflow-x-auto no-scrollbar flex-1" role="tablist" aria-label="Kategorien">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={c === cat}
                onClick={() => setCat(c)}
                className={`shrink-0 cursor-pointer text-[11px] font-semibold tracking-[0.24em] uppercase pb-1 border-b transition-colors duration-300 ${
                  c === cat ? "border-gold text-ink" : "border-transparent text-ink/45 hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            onClick={() => setFilterOpen((o) => !o)}
            aria-expanded={filterOpen}
            className="shrink-0 inline-flex items-center gap-2 cursor-pointer text-[11px] font-semibold tracking-[0.22em] uppercase hover:text-gold-deep transition-colors"
          >
            <IconAdjustmentsHorizontal size={18} stroke={1.25} />
            <span className="hidden sm:inline">Filter</span>
            {activeFilters > 0 && <span className="text-gold">({activeFilters})</span>}
          </button>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
            filterOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pb-8 pt-2 grid md:grid-cols-3 gap-8">
              {essences.length > 0 && (
                <fieldset className="m-0 p-0 border-0">
                  <legend className="mb-3 text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-deep">
                    Holzart
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {essences.map((e) => (
                      <button key={e} onClick={() => toggle(fEssences, e, setFEssences)} aria-pressed={fEssences.includes(e)} className={chip(fEssences.includes(e))}>
                        {e}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
              {lengths.length > 0 && (
                <fieldset className="m-0 p-0 border-0">
                  <legend className="mb-3 text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-deep">
                    Scheitlänge
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {lengths.map((l) => (
                      <button key={l} onClick={() => toggle(fLengths, l, setFLengths)} aria-pressed={fLengths.includes(l)} className={chip(fLengths.includes(l))}>
                        {l}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
              <fieldset className="m-0 p-0 border-0">
                <legend className="mb-3 text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-deep">
                  Sortieren
                </legend>
                <div className="flex flex-wrap gap-2">
                  {SORTS.map((s) => (
                    <button key={s.id} onClick={() => setSort(s.id)} aria-pressed={sort === s.id} className={chip(sort === s.id)}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              {activeFilters > 0 && (
                <button onClick={reset} className="md:col-span-3 justify-self-start inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-ember cursor-pointer hover:underline underline-offset-4">
                  <IconX size={14} stroke={1.5} />
                  Filter zurücksetzen
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="py-6 text-[11px] tracking-[0.2em] uppercase text-ink/45" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? "Produkt" : "Produkte"}
      </p>

      {visible.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-20">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 110}>
              <ProductCard product={p} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="font-serif text-[2rem]">Keine Produkte für diese Auswahl.</p>
          <button onClick={reset} className="mt-4 text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-deep cursor-pointer link-line">
            Filter zurücksetzen
          </button>
        </div>
      )}

      <section className="mt-24 md:mt-32 bg-ink text-bg grain px-8 py-12 md:px-16 md:py-16 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <p className="eyebrow">Mengenrabatt</p>
          <h2 className="mt-4 font-serif font-light text-[2.2rem] md:text-[3rem]">
            Mehr Holz, <em>bessere</em> Preise
          </h2>
        </div>
        <p className="text-bg/65 text-[14px] leading-relaxed">
          Auf Scheitholz gewähren wir −5 € pro Ster ab 3 Ster und −10 € pro Ster ab 5 Ster. Der
          Rabatt wird automatisch im Warenkorb angewendet.
        </p>
      </section>
    </div>
  );
}
