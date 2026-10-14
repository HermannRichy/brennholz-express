"use client";

import { useState } from "react";
import Link from "next/link";
import { IconCircleCheck, IconLoader2, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { Field, Input, Textarea, Radio } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SITE, FULL_ADDRESS } from "@/lib/site";

export default function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  // Kein Formular-Server: Die Anfrage wird im Mailprogramm des Besuchers
  // vorbereitet und an die Firmen-E-Mail adressiert.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Lieferort (PLZ): ${data.get("plz")}`,
      `Telefon: ${data.get("tel")}`,
      `Profil: ${data.get("profil")}`,
      "",
      String(data.get("anliegen")),
    ].join("\n");
    setSending(true);
    window.setTimeout(() => {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        "Angebotsanfrage"
      )}&body=${encodeURIComponent(body)}`;
      setSending(false);
      setSent(true);
    }, 500);
  }

  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-12 pb-24 md:pb-36">
      <header className="pt-8 md:pt-14 pb-12 md:pb-20">
        <p className="eyebrow">Persönliche Beratung</p>
        <h1 className="mt-5 font-serif font-light text-[3.2rem] md:text-[6.4rem] leading-[0.98]">
          Schreiben Sie <em>uns</em>
        </h1>
        <p className="mt-6 max-w-lg text-ink/65">
          Große Menge, Gastronomie oder schwieriger Zugang? Wir antworten innerhalb von 24
          Stunden an Werktagen – das Angebot ist kostenlos und unverbindlich.
        </p>
      </header>

      <div className="grid md:grid-cols-12 gap-14 md:gap-24">
        <aside className="md:col-span-4 order-2 md:order-1">
          <div className="bg-ink text-bg grain p-8 md:p-10 flex flex-col gap-8">
            <div>
              <h2 className="font-serif text-[2rem]">Direkt erreichbar</h2>
              <p className="mt-2 text-[13px] text-bg/55">{SITE.hours}</p>
            </div>
            <a href={SITE.phoneHref} className="group flex gap-4 items-start">
              <IconPhone size={22} stroke={1.25} className="text-gold shrink-0 mt-1" />
              <span>
                <span className="block text-[10px] font-semibold tracking-[0.26em] uppercase text-gold">Telefon</span>
                <span className="block mt-1 font-serif text-[1.6rem] group-hover:text-gold-light transition-colors">{SITE.phone}</span>
              </span>
            </a>
            <a href={`mailto:${SITE.email}`} className="group flex gap-4 items-start">
              <IconMail size={22} stroke={1.25} className="text-gold shrink-0 mt-1" />
              <span>
                <span className="block text-[10px] font-semibold tracking-[0.26em] uppercase text-gold">E-Mail</span>
                <span className="block mt-1 text-[14px] break-all group-hover:text-gold-light transition-colors">{SITE.email}</span>
              </span>
            </a>
            <div className="flex gap-4 items-start">
              <IconMapPin size={22} stroke={1.25} className="text-gold shrink-0 mt-1" />
              <span>
                <span className="block text-[10px] font-semibold tracking-[0.26em] uppercase text-gold">Sägewerk</span>
                <span className="block mt-1 text-[14px] text-bg/80">{FULL_ADDRESS}<br />{SITE.address.country}</span>
              </span>
            </div>
          </div>
        </aside>

        <div className="md:col-span-8 order-1 md:order-2">
          {sent ? (
            <div className="animate-panel-in py-6" role="status">
              <IconCircleCheck size={48} stroke={1} className="text-gold animate-check-in" />
              <h2 className="mt-6 font-serif font-light text-[2.6rem] leading-tight">Ihre Nachricht ist <em>bereit</em></h2>
              <p className="mt-4 max-w-md text-ink/65">
                Ihr Mailprogramm hat sich mit Ihrer Anfrage geöffnet – senden Sie sie nur noch ab. Nichts
                erhalten? Schreiben Sie an{" "}
                <a href={`mailto:${SITE.email}`} className="text-gold-deep underline underline-offset-4">{SITE.email}</a>{" "}
                oder rufen Sie an unter{" "}
                <a href={SITE.phoneHref} className="text-gold-deep underline underline-offset-4">{SITE.phone}</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-9">
              <div className="grid sm:grid-cols-2 gap-9">
                <Field label="Name">
                  <Input type="text" name="name" autoComplete="name" placeholder="Marie Schmitt" required />
                </Field>
                <Field label="PLZ des Lieferorts">
                  <Input type="text" name="plz" inputMode="numeric" autoComplete="postal-code" placeholder="77704" required />
                </Field>
              </div>
              <Field label="Telefon">
                <Input type="tel" name="tel" autoComplete="tel" placeholder="+49 170 0000000" required />
              </Field>
              <Field label="Ihr Anliegen">
                <Textarea name="anliegen" placeholder="6 Ster Eiche 50 cm, Zufahrt über einen schmalen Weg …" required />
              </Field>
              <fieldset className="border-0 p-0 m-0">
                <legend className="mb-4 text-[10px] font-semibold tracking-[0.26em] uppercase text-ink/55">Ich bin</legend>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                  <Radio name="profil" label="Privatkunde" defaultChecked />
                  <Radio name="profil" label="Ferienhaus" />
                  <Radio name="profil" label="Gastronomie" />
                </div>
              </fieldset>
              <div>
                <Button type="submit" arrow={!sending} disabled={sending} className="w-full sm:w-auto">
                  {sending ? (
                    <>
                      <IconLoader2 size={16} className="animate-spin" />
                      Wird vorbereitet …
                    </>
                  ) : (
                    "Anfrage senden"
                  )}
                </Button>
                <p className="mt-5 text-[12px] text-ink/50 max-w-md">
                  Kostenlos und unverbindlich. Ihre Angaben dienen ausschließlich der Beantwortung Ihrer Anfrage –
                  siehe <Link href="/datenschutz" className="underline underline-offset-4 hover:text-gold-deep">Datenschutz</Link>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
