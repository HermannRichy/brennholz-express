import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { SITE, FULL_ADDRESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description: `Preise, Bestellung, Zahlung, Lieferung, Widerruf und Gewährleistung: die AGB von ${SITE.name}.`,
  alternates: { canonical: "/agb" },
};

export default function AgbPage() {
  const { legal } = SITE;
  return (
    <LegalPage
      title={<>Allgemeine <em>Geschäftsbedingungen</em></>}
      intro="Diese Bedingungen gelten für jede Bestellung über die Website. Sie werden Ihnen vor der Bestellung zur Verfügung gestellt."
      current="/agb"
    >
      <LegalSection n={1} title="Anbieter und Geltungsbereich">
        <p>
          Vertragspartner ist <strong>{legal.companyName}</strong>, {legal.legalForm}, Inhaber {legal.owner},{" "}
          {FULL_ADDRESS}, {SITE.address.country}. Telefon: <a href={SITE.phoneHref}>{SITE.phone}</a>, E-Mail:{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <p>
          Diese AGB gelten für alle Verträge zwischen {SITE.name} und Kunden über den Online-Shop. Abweichende
          Bedingungen des Kunden werden nicht Vertragsbestandteil, es sei denn, wir stimmen ihnen ausdrücklich zu.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Produkte">
        <p>
          {SITE.name} verkauft Brennholz und verwandte Produkte: Scheitholz (Eiche, Buche, Hainbuche), Briketts,
          Pellets, Anzündholz und Kochholz für die Gastronomie. Die Produktseite nennt jeweils Holzart, Länge und
          Verkaufseinheit.
        </p>
        <ul>
          <li>
            <strong>Ein Ster</strong> entspricht 1 m³ geschichteten Holzes (Raummeter).
          </li>
          <li>
            Das Holz wird 24 Monate unter Dach getrocknet und mit einer Restfeuchte unter 20 % verkauft, vor der
            Verladung mit dem Feuchtemessgerät geprüft.
          </li>
          <li>
            Holz ist ein Naturprodukt: Aussehen, Kaliber und Rindenanteil können von Charge zu Charge leicht
            abweichen.
          </li>
        </ul>
      </LegalSection>

      <LegalSection n={3} title="Preise">
        <p>
          Alle Preise sind Endpreise in Euro inklusive der gesetzlichen Mehrwertsteuer, zuzüglich eventueller
          Lieferkosten, die vor Abschluss der Bestellung angezeigt werden. Für Scheitholz, das pro Ster verkauft
          wird, gilt automatisch im Warenkorb ein Mengenrabatt: −5 € pro Ster ab 3 Ster, −10 € pro Ster ab 5 Ster.
        </p>
        <p>
          Maßgeblich ist der bei Abschluss der Bestellung angezeigte Preis. Preisänderungen berühren bereits
          bezahlte Bestellungen nicht.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Vertragsschluss">
        <p>
          Die Darstellung der Produkte im Shop ist kein verbindliches Angebot. Mit dem Abschluss des Bestellvorgangs
          geben Sie ein verbindliches Angebot zum Kauf ab. Der Vertrag kommt zustande, sobald wir die Bestellung
          bestätigen; die Bestätigung erhalten Sie per E-Mail. Wir können eine Bestellung ablehnen, etwa bei
          Lieferadressen außerhalb unseres Liefergebiets, unzugänglicher Zufahrt für das Fahrzeug oder offensichtlichem
          Preisfehler. Bereits gezahlte Beträge werden dann vollständig erstattet.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Zahlung">
        <p>
          Die Zahlung erfolgt online auf der gesicherten Zahlungsseite unseres E-Commerce-Dienstleisters, auf die
          Sie über „Zur Kasse“ weitergeleitet werden. Bankdaten werden von {SITE.name} weder erhoben noch
          gespeichert. Der Kaufpreis ist mit der Bestellung fällig.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Lieferung">
        <p>
          Wir liefern in einem Umkreis von ca. 100 km um Steinbourg. Die Lieferzeit beträgt voraussichtlich 48 bis
          72 Stunden nach Bestellung; ein Zeitfenster von 2 Stunden wird am Vortag per SMS bestätigt. Angeboten
          werden lose Abladung (kostenlos) oder Lieferung auf Palette gestapelt (+ 29 €).
        </p>
        <p>
          Einzelheiten zu Liefergebiet, Zufahrt und Prüfung bei Annahme finden Sie unter{" "}
          <Link href="/versand-rueckgabe">Versand &amp; Rückgabe</Link>. Angegebene Lieferzeiten sind unverbindliche
          Richtwerte; die gesetzlichen Rechte des Verbrauchers bei Lieferverzug bleiben unberührt.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Prüfung bei Annahme und Reklamation">
        <p>
          Bitte prüfen Sie Menge und Zustand des Holzes bei der Lieferung gemeinsam mit dem Fahrer und vermerken
          Sie Auffälligkeiten auf dem Lieferschein. Reklamationen teilen Sie uns bitte innerhalb von 48 Stunden
          telefonisch oder per E-Mail mit, möglichst mit Fotos, damit wir schnell helfen können. Ihre gesetzlichen
          Rechte werden dadurch nicht eingeschränkt.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Widerrufsrecht für Verbraucher">
        <p>
          Verbrauchern steht ein gesetzliches Widerrufsrecht von 14 Tagen zu. Die vollständige Widerrufsbelehrung
          finden Sie unter <Link href="/versand-rueckgabe#widerruf">Versand &amp; Rückgabe</Link>. Das Widerrufsrecht
          gilt nicht für Bestellungen von Unternehmern.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Eigentumsvorbehalt">
        <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
      </LegalSection>

      <LegalSection n={10} title="Gewährleistung">
        <p>
          Es gelten die gesetzlichen Mängelrechte. Entspricht eine Lieferung nicht der Beschreibung – etwa bei
          einer höheren als der angegebenen Restfeuchte – kann der Verbraucher Nacherfüllung (Nachbesserung oder
          Ersatzlieferung) und, wenn diese fehlschlägt, Minderung des Kaufpreises oder Rücktritt verlangen.
        </p>
      </LegalSection>

      <LegalSection n={11} title="Haftung">
        <p>
          Brennholz muss in einer geeigneten, fachgerecht installierten und gewarteten Feuerstätte gemäß den
          Herstellerangaben und den örtlichen Vorschriften verwendet werden. {SITE.name} haftet nicht für Schäden
          durch unsachgemäße Verwendung oder fehlerhafte Installation. Unberührt bleibt die Haftung für Vorsatz und
          grobe Fahrlässigkeit, bei Verletzung von Leben, Körper und Gesundheit sowie nach zwingenden gesetzlichen
          Vorschriften.
        </p>
      </LegalSection>

      <LegalSection n={12} title="Datenschutz">
        <p>
          Ihre Daten werden gemäß unserer <Link href="/datenschutz">Datenschutzerklärung</Link> verarbeitet.
        </p>
      </LegalSection>

      <LegalSection n={13} title="Anwendbares Recht">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Bei Verbrauchern
          gilt diese Rechtswahl nur, soweit nicht der gewährte Schutz zwingender Bestimmungen des Staates, in dem
          der Verbraucher seinen gewöhnlichen Aufenthalt hat, entzogen wird.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
