import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconAxe,
  IconDroplet,
  IconFlame,
  IconPlant2,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { getProducts } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

const U = (id: string, w = 1800, h = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}&h=${h}`;

const FACTS = [
  { n: "1974", l: "Gegründet im Elsass" },
  { n: "< 20 %", l: "Garantierte Restfeuchte" },
  { n: "24 Mon.", l: "Trocknung unter Dach" },
  { n: "48–72 h", l: "Lieferzeit" },
];

const CRAFT = [
  {
    icon: IconPlant2,
    t: "Verantwortungsvoll geschlagen",
    b: "Nachhaltig bewirtschaftete Wälder in weniger als 100 km Entfernung zu unserem Sägewerk.",
  },
  {
    icon: IconAxe,
    t: "Gespalten & kalibriert",
    b: "Jedes Scheit nach Holzart und Länge sortiert – für einen gleichmäßigen, ruhigen Abbrand.",
  },
  {
    icon: IconDroplet,
    t: "24 Monate Geduld",
    b: "Unter offenem, belüftetem Dach getrocknet, geschützt vor Regen, bis die Restfeuchte stimmt.",
  },
  {
    icon: IconTruckDelivery,
    t: "Geprüft & geliefert",
    b: "Messung mit dem Feuchtemessgerät vor der Verladung. Das Protokoll liegt dem Lieferschein bei.",
  },
];

const REVIEWS = [
  {
    quote: "Wirklich trockenes Holz – es brennt beim ersten Anzünden. Die Lieferung kam pünktlich im angekündigten Zeitfenster.",
    author: "Céline B.",
    place: "Saverne",
  },
  {
    quote: "Seit zwei Jahren feuern wir unseren Pizzaofen mit der Buche von Brennholz Express. Gleichmäßig, kalibriert, verlässlich.",
    author: "Trattoria Da Marco",
    place: "Straßburg",
  },
];

const MARQUEE = ["Eiche", "Buche", "Hainbuche", "Briketts", "Pellets DIN+", "Kochholz", "Anzündholz"];

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-ink text-bg">
        <Image
          src={U("1576791606138-89367074a68f", 2400, 1500)}
          alt="Gestapeltes, gespaltenes Brennholz im Abendlicht"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

        <div className="relative max-w-[1500px] w-full mx-auto px-5 md:px-12 pb-14 md:pb-24 pt-40">
          <p className="eyebrow animate-rise" style={{ animationDelay: "200ms" }}>
            Familiensägewerk im Elsass · seit 1974
          </p>
          <h1
            className="mt-7 font-serif font-light text-[3.4rem] leading-[0.98] md:text-[6.4rem] lg:text-[8rem] max-w-5xl animate-rise"
            style={{ animationDelay: "350ms" }}
          >
            Wärme, die <em>Charakter</em> hat.
          </h1>
          <p
            className="mt-8 max-w-md text-[15px] md:text-base text-bg/80 leading-relaxed animate-rise"
            style={{ animationDelay: "550ms" }}
          >
            Eiche, Buche und Hainbuche aus nachhaltiger Forstwirtschaft – 24 Monate getrocknet
            und in 48 bis 72 Stunden zu Ihnen geliefert.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row gap-3 animate-rise"
            style={{ animationDelay: "750ms" }}
          >
            <Button href="/shop" arrow>
              Kollektion entdecken
            </Button>
            <Button href="/unser-holz" variant="outline-light">
              Unser Handwerk
            </Button>
          </div>
        </div>

        {/* Kennzahlen */}
        <div className="relative border-t border-line-light bg-ink/55 backdrop-blur-md">
          <div className="max-w-[1500px] mx-auto px-5 md:px-12 grid grid-cols-2 md:grid-cols-4">
            {FACTS.map((f, i) => (
              <div
                key={f.l}
                className={`py-4 md:py-6 ${i % 2 === 1 ? "border-l" : ""} ${
                  i > 0 ? "md:border-l" : ""
                } border-line-light ${i % 2 === 1 ? "pl-5" : ""} md:pl-8 md:first:pl-0`}
              >
                <div className="font-serif text-[1.7rem] md:text-[2.2rem] leading-none text-gold-light">{f.n}</div>
                <div className="mt-1.5 text-[9px] md:text-[10px] font-semibold tracking-[0.22em] uppercase text-bg/60">
                  {f.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block absolute right-12 bottom-48 h-20 w-px bg-gold/70 animate-scroll-cue" aria-hidden />
      </section>

      {/* LAUFBAND */}
      <div className="bg-ink-2 text-bg border-y border-line-light overflow-hidden py-5" aria-hidden>
        <div className="flex w-max animate-marquee">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center font-serif italic font-light text-[1.6rem] md:text-[2rem] text-bg/70">
              <span className="px-8 md:px-12">{m}</span>
              <IconFlame size={16} stroke={1.25} className="text-gold" />
            </span>
          ))}
        </div>
      </div>

      {/* MANIFEST */}
      <section className="max-w-[1500px] mx-auto px-5 md:px-12 py-24 md:py-40">
        <Reveal>
          <p className="eyebrow">Unsere Haltung</p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-10 font-serif font-light text-[2rem] leading-[1.18] md:text-[3.6rem] md:leading-[1.12] max-w-5xl">
            Wir schlagen, spalten und trocknen selbst. Kein Zwischenhandel, kein Importholz:
            die Eiche, die heute Abend in Ihrem Kamin brennt, wuchs <em>zwanzig Minuten</em> von
            unserem Trockenschuppen entfernt.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <Link
            href="/unser-holz"
            className="group mt-12 inline-flex items-center gap-4 text-[11px] font-semibold tracking-[0.24em] uppercase"
          >
            <span className="link-line">Unsere Geschichte</span>
            <IconArrowRight size={18} stroke={1.25} className="text-gold transition-transform duration-500 group-hover:translate-x-2" />
          </Link>
        </Reveal>
      </section>

      {/* KOLLEKTION */}
      <section className="max-w-[1500px] mx-auto px-5 md:px-12 pb-24 md:pb-40">
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <Reveal>
            <p className="eyebrow">Die Kollektion</p>
            <h2 className="mt-5 font-serif font-light text-[2.8rem] md:text-[4.6rem]">
              Unsere <em>Hölzer</em>
            </h2>
          </Reveal>
          <Reveal className="hidden md:block">
            <Button href="/shop" variant="link" arrow>
              Alle Produkte
            </Button>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-14">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 140} className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}>
              <ProductCard product={p} tall />
            </Reveal>
          ))}
        </div>
        <div className="mt-14 md:hidden">
          <Button href="/shop" variant="outline" block arrow>
            Alle Produkte
          </Button>
        </div>
      </section>

      {/* HANDWERK */}
      <section className="bg-ink text-bg grain">
        <div className="max-w-[1500px] mx-auto px-5 md:px-12 py-24 md:py-40 grid md:grid-cols-12 gap-14 md:gap-20 items-center">
          <Reveal mask className="md:col-span-5 relative aspect-[4/5] overflow-hidden">
            <Image
              src={U("1672984581785-60e0ff402fd4", 1200, 1500)}
              alt="Trockenschuppen für Brennholz"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-3 border border-bg/25 pointer-events-none" />
          </Reveal>
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow">Vom Wald zum Kamin</p>
              <h2 className="mt-5 font-serif font-light text-[2.8rem] md:text-[4.4rem]">
                Das Handwerk der <em>Geduld</em>
              </h2>
            </Reveal>
            <ul className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-10">
              {CRAFT.map((c, i) => (
                <Reveal as="li" key={c.t} delay={i * 110} className="border-t border-line-light pt-6">
                  <c.icon size={30} stroke={1} className="text-gold" />
                  <h3 className="mt-5 font-serif text-[1.55rem] leading-tight">{c.t}</h3>
                  <p className="mt-2 text-[13px] text-bg/60 leading-relaxed">{c.b}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* LIEFERUNG */}
      <section id="lieferung" className="max-w-[1500px] mx-auto px-5 md:px-12 py-24 md:py-40 grid md:grid-cols-12 gap-10 md:gap-20 items-end">
        <Reveal className="md:col-span-7">
          <p className="eyebrow">Lieferung</p>
          <h2 className="mt-5 font-serif font-light text-[2.8rem] md:text-[5rem] leading-[1]">
            100 km rund um <em>Steinbourg</em>. In 48 bis 72 Stunden.
          </h2>
        </Reveal>
        <Reveal delay={150} className="md:col-span-5">
          <p className="text-[15px] text-ink/70 leading-relaxed max-w-md">
            Wir entladen so nah wie möglich an Ihrem Lagerplatz. Das Zeitfenster von zwei Stunden
            bestätigen wir am Vortag per SMS. Eine Lieferung liegt außerhalb unseres Gebiets?
            Rufen Sie uns an – wir prüfen jede Anfrage.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href="/versand-rueckgabe" variant="outline" arrow>
              Lieferdetails
            </Button>
            <Button href={SITE.phoneHref} variant="link">
              {SITE.phone}
            </Button>
          </div>
        </Reveal>
      </section>

      {/* STIMMEN */}
      <section className="bg-surface">
        <div className="max-w-[1500px] mx-auto px-5 md:px-12 py-24 md:py-36">
          <Reveal>
            <p className="eyebrow">Stimmen unserer Kunden</p>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 gap-14 md:gap-24">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.author} delay={i * 160}>
                <span className="font-serif text-[5rem] leading-[0.5] text-gold block h-8" aria-hidden>
                  „
                </span>
                <blockquote className="mt-6 font-serif font-light text-[1.7rem] md:text-[2.2rem] leading-[1.25]">
                  {r.quote}
                </blockquote>
                <p className="mt-6 text-[10px] font-semibold tracking-[0.26em] uppercase text-ink/55">
                  {r.author} · {r.place}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABSCHLUSS */}
      <section className="relative bg-ink text-bg grain overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-5 md:px-12 py-24 md:py-36 text-center">
          <Reveal>
            <p className="eyebrow justify-center">Persönliche Beratung</p>
            <h2 className="mt-6 font-serif font-light text-[2.8rem] md:text-[5.6rem] leading-[1]">
              Wie viel Holz <em>brauchen</em> Sie?
            </h2>
            <p className="mt-6 mx-auto max-w-lg text-bg/65">
              Große Menge, Gastronomie, schwieriger Zugang? Wir beraten Sie gern und erstellen ein
              kostenloses Angebot – Antwort innerhalb von 24 Stunden.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/kontakt" arrow>
                Angebot anfragen
              </Button>
              <Button href={SITE.phoneHref} variant="outline-light">
                {SITE.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
