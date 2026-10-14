"use client";

import { useEffect } from "react";
import Link from "next/link";
import { IconX, IconPhone, IconMail } from "@tabler/icons-react";
import { NAV_LINKS } from "@/lib/nav";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

const LINKS = [{ label: "Startseite", href: "/" }, ...NAV_LINKS];

export function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[55] bg-ink text-bg grain flex flex-col animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Menü"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className="w-11" />
        <Logo light className="scale-[0.82]" />
        <button
          className="w-11 h-11 grid place-items-center cursor-pointer hover:text-gold transition-colors"
          onClick={onClose}
          aria-label="Menü schließen"
        >
          <IconX size={24} stroke={1.25} />
        </button>
      </div>

      <nav className="flex-1 flex flex-col justify-center px-8 gap-1" aria-label="Mobile Navigation">
        {LINKS.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClose}
            style={{ animationDelay: `${120 + i * 70}ms` }}
            className="animate-rise group flex items-baseline gap-4 py-3 border-b border-line-light"
          >
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold w-6">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-serif text-[2.6rem] font-light leading-none transition-colors group-hover:text-gold-light group-active:text-gold">
              {l.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="px-8 pb-8 flex flex-col gap-3 text-sm text-bg/75 animate-rise" style={{ animationDelay: "500ms" }}>
        <a href={SITE.phoneHref} className="inline-flex items-center gap-3 hover:text-gold-light transition-colors">
          <IconPhone size={18} stroke={1.25} className="text-gold" />
          {SITE.phone}
        </a>
        <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-3 hover:text-gold-light transition-colors">
          <IconMail size={18} stroke={1.25} className="text-gold" />
          {SITE.email}
        </a>
      </div>
    </div>
  );
}
