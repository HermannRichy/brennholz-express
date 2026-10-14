import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { SITE, FULL_ADDRESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Versand & Rückgabe",
  description:
    "Liefergebiet rund um Steinbourg, Lieferzeit von 48–72 Stunden, Zeitfenster von 2 Stunden, Reklamation und Widerrufsbelehrung.",
  alternates: { canonical: "/versand-rueckgabe" },
};

export default function VersandRueckgabePage() {
  return (
    <LegalPage
      title={<>Versand &amp; <em>Rückgabe</em></>}
      intro="Wann und wie Ihr Holz ankommt, was Sie bei der Annahme prüfen sollten und was bei Problemen zu tun ist."
      current="/versand-rueckgabe"
    >
      <LegalSection n={1} title="Liefergebiet">
        <p>
          Wir liefern im Umkreis von ca. <strong>100 km um Steinbourg</strong> (Elsass). Liegt Ihre Adresse
          außerhalb dieses Gebiets? Rufen Sie uns an unter <a href={SITE.phoneHref}>{SITE.phone}</a> oder schreiben
          Sie an <a href={`mailto:${SITE.email}`}>{SITE.email}</a> – wir prüfen jede Anfrage.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Lieferzeit und Zeitfenster">
        <p>
          Die Lieferung erfolgt in <strong>48 bis 72 Stunden</strong> nach der Bestellung. Das Zeitfenster von 2
          Stunden bestätigen wir am Vortag per SMS. Bitte seien Sie erreichbar und sorgen Sie dafür, dass eine
          Person vor Ort ist, die den Fahrer einweisen kann.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Liefervarianten">
        <ul>
          <li>
            <strong>Lose Abladung</strong> am Lagerplatz: kostenlos.
          </li>
          <li>
            <strong>Auf Palette gestapelt</strong>: + 29 €.
          </li>
        </ul>
        <p>Wir liefern mit Kipper oder Anhänger, je nach Zufahrt, möglichst nah an Ihren Lagerplatz.</p>
      </LegalSection>

      <LegalSection n={4} title="Zufahrt und Abladung">
        <ul>
          <li>Weisen Sie uns bei der Bestellung oder telefonisch auf schwierige Zufahrten hin (enger Weg, Gefälle, Tor, begrenzte Höhe).</li>
          <li>Abgeladen wird an der dem Lagerplatz nächsten für das Fahrzeug erreichbaren Stelle; das Stapeln ist – außer bei der Palettenoption – nicht enthalten.</li>
          <li>Kann der Fahrer den vereinbarten Ort nicht erreichen, wird eine neue Lieferung vereinbart; dafür können zusätzliche Kosten anfallen.</li>
        </ul>
      </LegalSection>

      <LegalSection n={5} title="Bei der Annahme">
        <p>
          Prüfen Sie Menge und Zustand gemeinsam mit dem Fahrer. Das Messprotokoll zur Restfeuchte liegt dem
          Lieferschein bei. Vermerken Sie Auffälligkeiten auf dem Lieferschein und bestätigen Sie sie innerhalb von
          48 Stunden telefonisch oder per E-Mail, möglichst mit Fotos.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Nicht ordnungsgemäße Lieferung">
        <p>
          Entspricht die Ware nicht Ihrer Bestellung (Holzart, Länge, Menge) oder überschreitet sie die angegebene
          Restfeuchte, liefern wir nach, ersetzen die Charge oder erstatten den Kaufpreis – je nach Situation, im
          Rahmen der gesetzlichen Mängelrechte.
        </p>
      </LegalSection>

      <section id="widerruf" className="mb-12 scroll-mt-32">
        <h2 className="mb-5 flex items-baseline gap-4 font-serif text-[1.9rem] md:text-[2.2rem] text-ink">
          <span className="font-sans text-[11px] font-semibold tracking-[0.24em] text-gold">07</span>
          Widerrufsbelehrung
        </h2>
        <p>
          <strong>Widerrufsrecht.</strong> Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen
          Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen
          benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
        </p>
        <p>
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({SITE.legal.companyName}, {FULL_ADDRESS},{" "}
          {SITE.address.country}, Telefon {SITE.phone}, E-Mail <a href={`mailto:${SITE.email}`}>{SITE.email}</a>)
          mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren
          Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das Muster-Widerrufsformular
          verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
          Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
        </p>
        <p>
          <strong>Folgen des Widerrufs.</strong> Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen,
          die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten,
          die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste
          Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen,
          an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist. Für diese Rückzahlung verwenden wir
          dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben. Wir können die
          Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht
          haben, dass Sie die Waren zurückgesandt haben.
        </p>
        <p>
          Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie
          uns über den Widerruf unterrichten, an uns zurückzusenden oder zu übergeben. Wegen des Volumens und
          Gewichts der Produkte vereinbaren wir die Rücknahme (Abholung oder Rücksendung) mit Ihnen. Sie tragen die
          unmittelbaren Kosten der Rücksendung der Waren. Sie müssen für einen etwaigen Wertverlust der Waren nur
          aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und
          Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
        </p>
        <p>Das Widerrufsrecht besteht nicht für Bestellungen von Unternehmern.</p>
        <p>
          Weitere Bedingungen finden Sie in den <Link href="/agb">AGB</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
