import Link from "next/link";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { Logo } from "@/components/logo";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { SITE, FULL_ADDRESS } from "@/lib/site";

const SHOP_LINKS = [
  { label: "Alle Produkte", href: "/shop" },
  { label: "Scheitholz", href: "/shop" },
  { label: "Briketts & Pellets", href: "/shop" },
  { label: "Anzündholz", href: "/shop" },
  { label: "Gastronomie", href: "/shop" },
];

const HOUSE_LINKS = [
  { label: "Unser Holz", href: "/unser-holz" },
  { label: "Lieferung & Rückgabe", href: "/versand-rueckgabe" },
  { label: "Angebot anfragen", href: "/kontakt" },
  { label: "Kontakt", href: "/kontakt" },
];

const LEGAL_LINKS = [
  { label: "AGB", href: "/agb" },
  { label: "Nutzungsbedingungen", href: "/nutzungsbedingungen" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Versand & Rückgabe", href: "/versand-rueckgabe" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-gold">{title}</h2>
      <ul className="mt-6 flex flex-col gap-3.5 text-[14px] text-bg/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="link-line hover:text-bg transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-bg grain">
      <div className="max-w-[1500px] mx-auto px-5 md:px-12">
        <div className="py-20 md:py-28 border-b border-line-light grid md:grid-cols-12 gap-14">
          <div className="md:col-span-5">
            <Logo light className="items-start" />
            <p className="mt-8 font-serif font-light italic text-[1.7rem] leading-snug text-bg/85 max-w-sm">
              Premium-Brennholz aus dem Familiensägewerk – seit 1974.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-10">
            <Column title="Shop" links={SHOP_LINKS} />
            <Column title="Haus" links={HOUSE_LINKS} />
          </div>
        </div>

        <div className="py-12 grid md:grid-cols-3 gap-8 border-b border-line-light text-[14px] text-bg/75">
          <div className="flex gap-4">
            <IconMapPin size={20} stroke={1.25} className="text-gold shrink-0 mt-0.5" />
            <span>
              {SITE.name}
              <br />
              {FULL_ADDRESS}, {SITE.address.country}
            </span>
          </div>
          <a href={SITE.phoneHref} className="flex gap-4 hover:text-gold-light transition-colors">
            <IconPhone size={20} stroke={1.25} className="text-gold shrink-0 mt-0.5" />
            <span>
              {SITE.phone}
              <br />
              <span className="text-bg/50">{SITE.hours}</span>
            </span>
          </a>
          <a href={`mailto:${SITE.email}`} className="flex gap-4 hover:text-gold-light transition-colors">
            <IconMail size={20} stroke={1.25} className="text-gold shrink-0 mt-0.5" />
            <span className="break-all">{SITE.email}</span>
          </a>
        </div>

        <div className="py-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-bg/50">
          <span>© 2026 {SITE.name}</span>
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gold-light transition-colors">
              {l.label}
            </Link>
          ))}
          <CookieSettingsButton className="hover:text-gold-light transition-colors" />
          <span className="md:ml-auto">Preise inkl. MwSt. · Sichere Zahlung</span>
        </div>
      </div>
    </footer>
  );
}
