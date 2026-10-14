import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { SITE, FULL_ADDRESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Welche Daten ${SITE.name} erhebt, warum, wie lange – und wie Sie Ihre Rechte ausüben.`,
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <LegalPage
      title={<>Datenschutz<em>erklärung</em></>}
      intro="Wir erheben nur das Nötigste, um Ihre Anfragen zu beantworten und Ihre Bestellungen zu liefern. Hier die Einzelheiten."
      current="/datenschutz"
    >
      <LegalSection n={1} title="Verantwortlicher">
        <p>
          {SITE.legal.companyName}, Inhaber {SITE.legal.owner}, {FULL_ADDRESS}, {SITE.address.country}. Kontakt:{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> oder <a href={SITE.phoneHref}>{SITE.phone}</a>.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Erhobene Daten und Zwecke">
        <ul>
          <li>
            <strong>Kontakt- bzw. Angebotsanfrage</strong>: Name, PLZ des Lieferorts, Telefonnummer, Beschreibung
            Ihres Anliegens und Profil (Privatkunde, Ferienhaus, Gastronomie). Zweck: Beantwortung und
            Angebotserstellung. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen).
          </li>
          <li>
            <strong>Bestellung</strong>: Name, Lieferadresse, E-Mail, Telefonnummer und Zahlungsdaten, die auf der
            gesicherten Zahlungsseite unseres E-Commerce-Dienstleisters eingegeben werden. Zweck: Abwicklung,
            Lieferung und Rechnungsstellung. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und
            lit. c DSGVO (gesetzliche Aufbewahrungspflichten).
          </li>
          <li>
            <strong>Korrespondenz per E-Mail oder Telefon</strong>: Kontaktdaten und Inhalt Ihrer Nachricht. Zweck:
            Bearbeitung Ihrer Anfrage oder Bestellung.
          </li>
        </ul>
        <p>Bankdaten werden von {SITE.name} nicht erhoben oder gespeichert.</p>
      </LegalSection>

      <LegalSection n={3} title="Lokaler Speicher und Cookies">
        <p>
          Die Website speichert den Inhalt Ihres Warenkorbs im lokalen Speicher Ihres Browsers (Schlüssel
          „bex-cart“). Er verbleibt auf Ihrem Gerät, dient ausschließlich dem Erhalt Ihres Warenkorbs und wird nicht
          zu Tracking- oder Werbezwecken verwendet. Dieser technisch erforderliche Speicher bedarf nach § 25 Abs. 2
          Nr. 2 TDDDG keiner Einwilligung; Sie können ihn jederzeit in den Browsereinstellungen löschen.
        </p>
        <p>
          Ihre Auswahl zur Reichweitenmessung (Schlüssel „bex-consent“) wird in Ihrem Browser gespeichert und nach 6
          Monaten erneut abgefragt. Derzeit ist kein Messdienst aktiv; sollten wir einen einsetzen, geschieht dies nur
          mit Ihrer Einwilligung. Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ im Seitenfuß ändern.
        </p>
        <p>
          Die Website verwendet keine Werbe-Cookies. Die Zahlungsseite unseres E-Commerce-Dienstleisters kann für
          Funktion und Sicherheit der Zahlung technisch notwendige Cookies setzen.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Empfänger">
        <p>
          Ihre Daten erhalten {SITE.name} und die für die genannten Zwecke eingesetzten technischen Dienstleister:
          E-Commerce- und Zahlungsplattform, Hosting-Anbieter ({SITE.host.name}) sowie gegebenenfalls Fahrer oder
          Spediteur. Eine Veräußerung oder Weitergabe zu Werbezwecken findet nicht statt.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Speicherdauer">
        <ul>
          <li>Anfragen und Angebote ohne Folgegeschäft: höchstens 3 Jahre nach dem letzten Kontakt.</li>
          <li>Bestell- und Rechnungsdaten: entsprechend den gesetzlichen Aufbewahrungsfristen (bis zu 10 Jahre).</li>
        </ul>
      </LegalSection>

      <LegalSection n={6} title="Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch. Zur Ausübung schreiben Sie an{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>; wir antworten innerhalb eines Monats. Außerdem haben
          Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Sicherheit">
        <p>
          Die Website wird per HTTPS ausgeliefert, Zahlungen laufen über einen gesicherten Dienstleister. Der Zugriff
          auf Ihre Daten ist auf Personen beschränkt, die sie benötigen.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Änderungen">
        <p>
          Diese Erklärung kann sich ändern; das Datum der letzten Aktualisierung steht oben. Siehe auch das{" "}
          <Link href="/impressum">Impressum</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
