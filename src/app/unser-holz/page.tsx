import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Unser Holz",
  description:
    "Herkunft, Einschlag und 24 Monate Trocknung: So bereitet das Sägewerk in Steinbourg trockenes Brennholz vor – vor jeder Lieferung mit dem Feuchtemessgerät geprüft.",
  alternates: { canonical: "/unser-holz" },
};

const STATS = [
  { n: "1974", l: "Gründungsjahr" },
  { n: "3", l: "Generationen im Sägewerk" },
  { n: "< 20 %", l: "Garantierte Restfeuchte" },
  { n: "24 Mon.", l: "Trocknung unter Dach" },
];

const STEPS = [
  { n: "I", t: "Verantwortungsvoller Einschlag", b: "Auswahl in nachhaltig bewirtschafteten Wäldern, in weniger als 100 km Entfernung." },
  { n: "II", t: "Spalten & Kalibrieren", b: "Die Scheite werden gespalten und nach Holzart und Länge sortiert." },
  { n: "III", t: "24 Monate Trocknung", b: "Unter offenem, belüftetem Dach, geschützt vor Regen." },
  { n: "IV", t: "Prüfung & Lieferung", b: "Die Restfeuchte wird vor der Verladung mit dem Feuchtemessgerät gemessen." },
];

export default function UnserHolzPage() {
  return (
    <>
      <section className="max-w-[1500px] mx-auto px-5 md:px-12 pt-8 md:pt-14 pb-16 md:pb-24">
        <p className="eyebrow">Unser Holz</p>
        <h1 className="mt-5 font-serif font-light text-[3.2rem] md:text-[7rem] leading-[0.96] max-w-5xl">
          Drei Generationen, <em>ein</em> Wald.
        </h1>
      </section>

      <Reveal mask className="relative h-[52vh] md:h-[78vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1672984581785-60e0ff402fd4?auto=format&fit=crop&q=75&w=2400&h=1400"
          alt="Trockenschuppen für Brennholz"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </Reveal>

      <section className="max-w-[1500px] mx-auto px-5 md:px-12 py-20 md:py-36 grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">Herkunft</p>
        </Reveal>
        <Reveal delay={120} className="md:col-span-8">
          <p className="font-serif font-light text-[1.9rem] md:text-[2.8rem] leading-[1.2]">
            Wir schlagen, spalten und trocknen selbst. Kein Zwischenhandel, kein Importholz: die Eiche,
            die heute Abend in Ihrem Kamin brennt, wuchs <em>zwanzig Minuten</em> von unserem
            Trockenschuppen entfernt.
          </p>
        </Reveal>
      </section>

      <section className="bg-ink text-bg grain">
        <div className="max-w-[1500px] mx-auto px-5 md:px-12 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 100} className={`py-12 md:py-16 ${i % 2 === 1 ? "pl-6 border-l border-line-light" : ""} ${i > 0 ? "md:pl-10 md:border-l md:border-line-light" : ""}`}>
              <div className="font-serif font-light text-[3rem] md:text-[4.4rem] leading-none text-gold-light">{s.n}</div>
              <div className="mt-3 text-[10px] font-semibold tracking-[0.24em] uppercase text-bg/55">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto px-5 md:px-12 py-24 md:py-40">
        <Reveal>
          <p className="eyebrow">Der Weg</p>
          <h2 className="mt-5 font-serif font-light text-[2.8rem] md:text-[4.8rem]">Vom Einschlag zum <em>Kamin</em></h2>
        </Reveal>
        <ol className="mt-16 md:mt-24">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80} className="group grid md:grid-cols-12 gap-4 md:gap-10 py-9 md:py-12 border-t border-line last:border-b items-baseline">
              <span className="md:col-span-2 font-serif italic font-light text-[2.6rem] md:text-[3.4rem] leading-none text-gold transition-transform duration-700 group-hover:translate-x-3">{s.n}</span>
              <h3 className="md:col-span-5 font-serif text-[1.9rem] md:text-[2.4rem]">{s.t}</h3>
              <p className="md:col-span-5 text-ink/65 leading-relaxed">{s.b}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-surface">
        <div className="max-w-[1500px] mx-auto px-5 md:px-12 py-20 md:py-28 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <Reveal>
            <h2 className="font-serif font-light text-[2.4rem] md:text-[3.6rem] leading-[1.02]">Überzeugen Sie sich <em>selbst</em>.</h2>
            <p className="mt-4 text-ink/65 max-w-md">
              Die Restfeuchte wird bei jeder Charge mit dem Messgerät geprüft; das Protokoll liegt dem Lieferschein bei.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <Button href="/shop" arrow>Zur Kollektion</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
