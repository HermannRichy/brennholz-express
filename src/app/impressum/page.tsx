import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { SITE, FULL_ADDRESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Anbieterkennzeichnung, Kontakt und Hosting der Website ${SITE.name}.`,
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  const { legal, host } = SITE;
  return (
    <LegalPage title="Impressum" current="/impressum">
      <LegalSection n={1} title="Angaben zum Anbieter">
        <p>
          <strong>{legal.companyName}</strong>
          <br />
          {legal.legalForm} · Inhaber: {legal.owner}
          <br />
          {FULL_ADDRESS}, {SITE.address.country}
        </p>
      </LegalSection>

      <LegalSection n={2} title="Kontakt">
        <ul>
          <li>
            Telefon: <a href={SITE.phoneHref}>{SITE.phone}</a> ({SITE.hours})
          </li>
          <li>
            E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection n={3} title="Verantwortlich für den Inhalt">
        <p>
          {legal.owner}, {FULL_ADDRESS}, {SITE.address.country}.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Hosting">
        <p>
          Diese Website wird betrieben bei {host.name}, {host.address}.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Urheberrecht">
        <p>
          Die Inhalte dieser Website (Texte, Logo, Gestaltung) sind urheberrechtlich geschützt. Jede
          Vervielfältigung, Bearbeitung oder Verbreitung bedarf der vorherigen schriftlichen Zustimmung von{" "}
          {SITE.name}.
        </p>
        <p>
          Die Illustrationsfotos stammen von{" "}
          <a href="https://unsplash.com" rel="noopener noreferrer" target="_blank">Unsplash</a> und
          verbleiben im Eigentum ihrer Urheber.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Zahlung">
        <p>
          Zahlungen werden auf einer gesicherten Zahlungsseite unseres E-Commerce-Dienstleisters abgewickelt.
          Bankdaten werden weder über diese Website übertragen noch von {SITE.name} gespeichert.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Haftung für Inhalte und Links">
        <p>
          Wir erstellen die Inhalte dieser Website mit größter Sorgfalt, können jedoch keine Gewähr für
          Richtigkeit, Vollständigkeit und Aktualität übernehmen. Für Inhalte externer Websites, auf die wir
          verweisen, sind ausschließlich deren Betreiber verantwortlich.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Datenschutz">
        <p>
          Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in unserer{" "}
          <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
