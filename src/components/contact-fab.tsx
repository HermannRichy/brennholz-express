"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { IconChevronRight, IconMail, IconMessageCircle2, IconPhone, IconX } from "@tabler/icons-react";
import { SITE } from "@/lib/site";

const ACTIONS = [
  {
    href: SITE.phoneHref,
    icon: IconPhone,
    label: "Anrufen",
    note: `${SITE.phone} · ${SITE.hours}`,
  },
  {
    href: `mailto:${SITE.email}?subject=${encodeURIComponent("Anfrage")}`,
    icon: IconMail,
    label: "E-Mail schreiben",
    note: SITE.email,
  },
] as const;

export function ContactFab() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Warenkorb und Produktseiten haben auf dem Handy eine feste Kaufleiste.
  const hasBottomBar = pathname === "/warenkorb" || pathname.startsWith("/produkt/");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`fixed right-4 md:right-8 z-40 flex flex-col items-end gap-4 transition-[bottom] duration-500 ${
        hasBottomBar ? "bottom-24 md:bottom-8" : "bottom-5 md:bottom-8"
      }`}
    >
      {open && (
        <div
          id="kontakt-panel"
          role="dialog"
          aria-label="Kontakt"
          className="animate-panel-in origin-bottom-right w-[min(21rem,calc(100vw-2rem))] bg-ink text-bg border border-gold/50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        >
          <div className="px-6 py-5 border-b border-line-light">
            <div className="font-serif text-[1.6rem] leading-none">Ihre <em>Fragen</em></div>
            <div className="mt-2 text-[12px] text-bg/55">Schnelle Antwort, kostenloses Angebot.</div>
          </div>
          {ACTIONS.map(({ href, icon: Icon, label, note }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-4 px-6 py-4 border-b border-line-light last:border-b-0 hover:bg-bg/5 transition-colors"
            >
              <Icon size={22} stroke={1.25} className="text-gold transition-transform duration-500 group-hover:scale-110" />
              <span className="flex-1 min-w-0">
                <span className="block text-[11px] font-semibold tracking-[0.22em] uppercase">{label}</span>
                <span className="block mt-1 text-[12px] text-bg/55 truncate">{note}</span>
              </span>
              <IconChevronRight size={16} stroke={1.25} className="text-gold transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="kontakt-panel"
        aria-label={open ? "Kontaktmenü schließen" : "Kontakt aufnehmen"}
        className={`relative w-14 h-14 rounded-full grid place-items-center bg-ink text-gold-light border border-gold/60 cursor-pointer shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-gold hover:text-ink hover:-translate-y-0.5 active:scale-95 ${
          open ? "" : "animate-ring"
        }`}
      >
        <IconMessageCircle2
          size={24}
          stroke={1.25}
          className={`absolute transition-all duration-300 ${open ? "opacity-0 rotate-90 scale-50" : "opacity-100"}`}
        />
        <IconX
          size={24}
          stroke={1.25}
          className={`absolute transition-all duration-300 ${open ? "opacity-100" : "opacity-0 -rotate-90 scale-50"}`}
        />
      </button>
    </div>
  );
}
