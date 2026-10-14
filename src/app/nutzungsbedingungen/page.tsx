import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen",
  description: `Regeln für den Zugang zur und die Nutzung der Website ${SITE.name}.`,
  alternates: { canonical: "/nutzungsbedingungen" },
};

export default function NutzungsbedingungenPage() {
  return (
    <LegalPage
      title={<>Nutzungs<em>bedingungen</em></>}
      intro={`Diese Bedingungen regeln den Zugang zur und die Nutzung der Website ${SITE.url.replace(/^https?:\/\//, "")}. Mit der Nutzung erklären Sie sich damit einverstanden.`}
      current="/nutzungsbedingungen"
    >
      <LegalSection n={1} title="Gegenstand">
        <p>
          Die Website stellt die Tätigkeit von {SITE.name} (Brennholz, Pellets, Anzündholz und Kochholz) vor und
          ermöglicht es, den Shop zu durchsuchen, einen Warenkorb zu füllen und ein Angebot anzufragen. Für
          Käufe gelten die <Link href="/agb">Allgemeinen Geschäftsbedingungen</Link>.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Zugang zur Website">
        <p>
          Die Website ist für jeden Internetnutzer kostenlos zugänglich. Verbindungs- und Gerätekosten tragen Sie
          selbst. {SITE.name} kann den Zugang aus technischen Gründen oder zu Wartungszwecken jederzeit und ohne
          Vorankündigung einschränken oder unterbrechen.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Nutzung">
        <p>Sie verpflichten sich, die Website redlich zu nutzen und insbesondere:</p>
        <ul>
          <li>den Betrieb nicht zu stören und keine nicht öffentlichen Bereiche aufzurufen;</li>
          <li>keine Daten automatisiert ohne Genehmigung auszulesen;</li>
          <li>im Kontaktformular und bei Bestellungen keine falschen Angaben zu machen;</li>
          <li>Inhalte nicht ohne schriftliche Zustimmung kommerziell zu verwerten.</li>
        </ul>
      </LegalSection>

      <LegalSection n={4} title="Warenkorb">
        <p>
          Der Inhalt Ihres Warenkorbs wird im lokalen Speicher Ihres Browsers abgelegt – ausschließlich auf Ihrem
          Gerät. Er geht verloren, wenn Sie diese Daten löschen oder das Gerät wechseln. Das Ablegen im Warenkorb
          ist keine Bestellung: Ein Vertrag kommt erst nach Abschluss des Bestellvorgangs zustande.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Produktinformationen und Preise">
        <p>
          Beschreibungen, Eigenschaften (Holzart, Länge, Restfeuchte) und Fotos werden nach bestem Wissen
          dargestellt. Holz ist ein Naturprodukt: Aussehen kann von Charge zu Charge leicht variieren. Preise
          verstehen sich in Euro inklusive gesetzlicher Mehrwertsteuer und können sich ändern; maßgeblich ist der
          zum Zeitpunkt der Bestellung angezeigte Preis.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Geistiges Eigentum">
        <p>
          Die Inhalte der Website sind urheberrechtlich geschützt. Siehe das <Link href="/impressum">Impressum</Link>.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Haftung">
        <p>
          {SITE.name} bemüht sich um Verfügbarkeit und Richtigkeit der Website, ohne einen unterbrechungsfreien
          Zugang oder völlige Fehlerfreiheit zusichern zu können. Für Schäden durch unsachgemäße Nutzung oder die
          Nichtverfügbarkeit Dritter (Zahlung, Hosting) haftet {SITE.name} nur im Rahmen der gesetzlichen
          Vorschriften.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Datenschutz">
        <p>
          Die Verarbeitung personenbezogener Daten ist in unserer <Link href="/datenschutz">Datenschutzerklärung</Link> beschrieben.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Änderungen">
        <p>
          {SITE.name} kann diese Bedingungen jederzeit ändern; es gilt die jeweils online veröffentlichte Fassung.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
