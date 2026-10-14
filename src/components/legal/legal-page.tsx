import type { ReactNode } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const LEGAL_PAGES = [
  { href: "/agb", label: "Allgemeine Geschäftsbedingungen" },
  { href: "/nutzungsbedingungen", label: "Nutzungsbedingungen" },
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutzerklärung" },
  { href: "/versand-rueckgabe", label: "Versand & Rückgabe" },
] as const;

export function LegalPage({
  title,
  intro,
  current,
  children,
}: {
  title: ReactNode;
  intro?: string;
  current: (typeof LEGAL_PAGES)[number]["href"];
  children: ReactNode;
}) {
  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-12 pb-24 md:pb-36">
      <header className="pt-8 md:pt-14 pb-12 md:pb-16 border-b border-line">
        <p className="eyebrow">Rechtliches</p>
        <h1 className="mt-5 font-serif font-light text-[2.8rem] md:text-[5.4rem] leading-[1] max-w-4xl">{title}</h1>
        {intro && <p className="mt-6 max-w-xl text-ink/65">{intro}</p>}
        <p className="mt-6 text-[10px] font-semibold tracking-[0.24em] uppercase text-ink/40">
          Stand: {SITE.lastUpdate}
        </p>
      </header>

      <div className="md:grid md:grid-cols-12 md:gap-20 pt-12 md:pt-16">
        <div className="md:col-span-8 text-[15px] leading-[1.75] text-ink/80 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1.5 [&_a]:text-gold-deep [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-ink [&_strong]:font-semibold [&_strong]:text-ink">
          {children}
        </div>

        <nav aria-label="Weitere Dokumente" className="md:col-span-4 mt-14 md:mt-0">
          <div className="md:sticky md:top-32 bg-surface p-7 flex flex-col gap-3">
            <div className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-deep mb-2">Weitere Dokumente</div>
            {LEGAL_PAGES.filter((l) => l.href !== current).map((l) => (
              <Link key={l.href} href={l.href} className="link-line w-fit text-[14px] hover:text-gold-deep transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/kontakt" className="link-line w-fit text-[14px] hover:text-gold-deep transition-colors">
              Kontakt
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function LegalSection({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-5 flex items-baseline gap-4 font-serif text-[1.9rem] md:text-[2.2rem] text-ink">
        <span className="font-sans text-[11px] font-semibold tracking-[0.24em] text-gold">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
