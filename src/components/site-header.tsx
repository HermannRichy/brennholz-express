"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconSearch, IconShoppingBag } from "@tabler/icons-react";
import { useCart } from "@/context/cart-context";
import { MobileMenu } from "@/components/mobile-menu";
import { SearchDialog } from "@/components/search-dialog";
import { Logo } from "@/components/logo";
import { NAV_LINKS } from "@/lib/nav";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const pathname = usePathname();

  // Auf der Startseite liegt der Header transparent über dem Hero.
  const overHero = pathname === "/" && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Strg/Cmd + K öffnet die Suche.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const tone = overHero ? "text-bg" : "text-ink";
  const iconBtn = `w-11 h-11 shrink-0 grid place-items-center cursor-pointer transition-[color,transform] duration-300 hover:text-gold active:scale-90 ${tone}`;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter,padding] duration-500 border-b ${
          overHero
            ? "bg-transparent border-transparent py-4 md:py-6"
            : "bg-bg/90 backdrop-blur-md border-line py-2.5 md:py-3.5"
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-4 md:px-12 grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center">
            <button
              className={`${iconBtn} md:hidden -ml-2.5`}
              onClick={() => setMenuOpen(true)}
              aria-label="Menü öffnen"
            >
              <IconMenu2 size={24} stroke={1.25} />
            </button>
            <nav className={`hidden md:flex items-center gap-10 ${tone}`} aria-label="Hauptnavigation">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                  className="link-line text-[11px] font-semibold tracking-[0.24em] uppercase"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" aria-label="Brennholz Express – Startseite" className="justify-self-center">
            <Logo light={overHero} className="scale-[0.82] md:scale-100 origin-center" />
          </Link>

          <div className="flex items-center justify-end md:gap-1 -mr-2.5">
            <button
              className={iconBtn}
              onClick={() => setSearchOpen(true)}
              aria-label="Suchen"
              aria-haspopup="dialog"
            >
              <IconSearch size={22} stroke={1.25} />
            </button>
            <Link href="/warenkorb" className={`relative ${iconBtn}`} aria-label={`Warenkorb, ${count} Artikel`}>
              <IconShoppingBag size={22} stroke={1.25} />
              {count > 0 && (
                <span
                  key={count}
                  className="animate-pop absolute top-1 right-0.5 min-w-4 h-4 px-1 grid place-items-center bg-gold text-ink text-[9px] font-bold leading-none rounded-full"
                >
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </>
  );
}
