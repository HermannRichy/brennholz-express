"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IconArrowRight,
  IconFlame,
  IconLoader2,
  IconMail,
  IconSearch,
  IconTrees,
  IconTruckDelivery,
  IconX,
} from "@tabler/icons-react";
import { EUR, UNIT_LABEL } from "@/lib/pricing";
import type { Product } from "@/lib/types";

const SHORTCUTS = [
  { label: "Gesamte Kollektion", href: "/shop", icon: IconFlame },
  { label: "Unser Holz & Trocknung", href: "/unser-holz", icon: IconTrees },
  { label: "Lieferung & Rückgabe", href: "/versand-rueckgabe", icon: IconTruckDelivery },
  { label: "Angebot anfragen", href: "/kontakt", icon: IconMail },
];

const SUGGESTIONS = ["Eiche", "Buche", "Pellets", "Anzündholz", "50 cm"];

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ß/g, "ss")
    .toLowerCase();
}

function searchProducts(products: Product[], query: string): Product[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return products
    .map((p) => {
      const name = normalize(p.name);
      const rest = normalize([p.category, p.essence, p.length, p.spec, p.description].join(" "));
      let score = 0;
      for (const t of terms) {
        if (name.includes(t)) score += 3;
        else if (rest.includes(t)) score += 1;
        else return { p, score: 0 };
      }
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: { products: Product[] }) => {
        if (!cancelled) setProducts(data.products);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const results = useMemo(() => searchProducts(products, query), [products, query]);
  const hasQuery = query.trim().length > 0;
  const items = hasQuery
    ? results.map((p) => ({ key: p.id, href: `/produkt/${p.slug}` }))
    : SHORTCUTS.map((s) => ({ key: s.href, href: s.href }));

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (items[active]) go(items[active].href);
      else if (hasQuery) go("/shop");
    }
  };

  const rowCls = (i: number) =>
    `w-full flex items-center gap-5 px-6 md:px-8 py-4 border-b border-line-light text-left cursor-pointer transition-colors duration-300 ${
      i === active ? "bg-bg/[0.06]" : ""
    }`;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-ink/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Suche"
      onKeyDown={onKeyDown}
    >
      <div className="bg-ink text-bg grain animate-drop-in md:max-w-3xl md:w-full md:mx-auto md:mt-20 md:border md:border-gold/40 flex flex-col max-h-[88dvh]">
        <div className="flex items-center gap-4 px-6 md:px-8 py-5 border-b border-line-light">
          {loading ? (
            <IconLoader2 size={22} stroke={1.25} className="text-gold animate-spin shrink-0" />
          ) : (
            <IconSearch size={22} stroke={1.25} className="text-gold shrink-0" />
          )}
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            placeholder="Eiche, Pellets, 50 cm …"
            aria-label="Produkt suchen"
            className="flex-1 min-w-0 bg-transparent font-serif font-light text-[1.7rem] md:text-[2rem] placeholder:text-bg/30 focus-visible:!outline-0 [&::-webkit-search-cancel-button]:hidden"
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold hover:text-gold-light cursor-pointer shrink-0"
            >
              Löschen
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Suche schließen"
            className="w-10 h-10 shrink-0 grid place-items-center cursor-pointer hover:text-gold active:scale-90 transition"
          >
            <IconX size={22} stroke={1.25} />
          </button>
        </div>

        <div className="overflow-y-auto">
          {!hasQuery && (
            <>
              <div className="px-6 md:px-8 pt-6 pb-3 text-[10px] font-semibold tracking-[0.3em] uppercase text-gold">
                Vorschläge
              </div>
              <div className="px-6 md:px-8 pb-6 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQuery(s);
                      setActive(0);
                      inputRef.current?.focus();
                    }}
                    className="text-[11px] tracking-[0.12em] px-4 py-2 border border-line-light text-bg/80 cursor-pointer hover:border-gold hover:text-gold-light active:scale-95 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="px-6 md:px-8 pt-5 pb-3 border-t border-line-light text-[10px] font-semibold tracking-[0.3em] uppercase text-gold">
                Direkt zu
              </div>
              {SHORTCUTS.map(({ label, href, icon: Icon }, i) => (
                <button
                  key={href}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(href)}
                  className={rowCls(i)}
                >
                  <Icon size={22} stroke={1.25} className="text-gold" />
                  <span className="flex-1 font-serif text-[1.35rem]">{label}</span>
                  <IconArrowRight size={18} stroke={1.25} className="text-bg/40" />
                </button>
              ))}
            </>
          )}

          {hasQuery && results.length > 0 && (
            <>
              <div
                className="px-6 md:px-8 pt-6 pb-3 text-[10px] font-semibold tracking-[0.3em] uppercase text-gold"
                role="status"
                aria-live="polite"
              >
                {results.length} {results.length === 1 ? "Ergebnis" : "Ergebnisse"}
              </div>
              {results.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(`/produkt/${p.slug}`)}
                  className={rowCls(i)}
                >
                  <span className="relative w-16 h-20 shrink-0 overflow-hidden bg-ink-3">
                    {p.img && <Image src={p.img} alt="" fill sizes="64px" className="object-cover" />}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-serif text-[1.4rem] leading-tight">{p.name}</span>
                    <span className="block mt-1 text-[12px] text-bg/50 truncate">{p.spec}</span>
                  </span>
                  <span className="font-serif text-[1.3rem] shrink-0">
                    {EUR.format(p.price)}
                    <span className="ml-1 text-[10px] tracking-[0.18em] uppercase text-bg/40">
                      / {UNIT_LABEL[p.unit].short}
                    </span>
                  </span>
                </button>
              ))}
            </>
          )}

          {hasQuery && results.length === 0 && (
            <div className="px-6 md:px-8 py-12 flex flex-col gap-3 items-start">
              <div className="font-serif text-[1.8rem] leading-tight">
                Kein Produkt für „{query.trim()}“
              </div>
              <p className="text-[14px] text-bg/55 m-0">
                Versuchen Sie „Eiche“, „Buche“ oder „Pellets“ – oder stöbern Sie in der ganzen Kollektion.
              </p>
              <button
                type="button"
                onClick={() => go("/shop")}
                className="mt-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-gold hover:text-gold-light cursor-pointer"
              >
                Zur Kollektion →
              </button>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-6 px-8 py-3 border-t border-line-light text-[10px] tracking-[0.18em] uppercase text-bg/40">
          <span>↑ ↓ Navigieren</span>
          <span>↵ Öffnen</span>
          <span className="ml-auto">Esc Schließen</span>
        </div>
      </div>
      <button
        type="button"
        className="flex-1 border-0 bg-transparent cursor-default"
        onClick={onClose}
        aria-label="Suche schließen"
        tabIndex={-1}
      />
    </div>
  );
}
