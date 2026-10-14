import type { Metadata } from "next";
import { IconFlameOff } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-12 py-24 md:py-40">
      <IconFlameOff size={52} stroke={1} className="text-gold" />
      <p className="eyebrow mt-8">Fehler 404</p>
      <h1 className="mt-5 font-serif font-light text-[3.2rem] md:text-[6.4rem] leading-[0.98]">
        Dieses Feuer ist <em>erloschen</em>.
      </h1>
      <p className="mt-6 max-w-md text-ink/65">
        Die gesuchte Seite existiert nicht oder wurde verschoben. Stöbern Sie im Shop oder rufen Sie
        uns an unter{" "}
        <a href={SITE.phoneHref} className="text-gold-deep underline underline-offset-4">{SITE.phone}</a>.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:w-fit">
        <Button href="/shop" arrow>Zum Shop</Button>
        <Button href="/" variant="outline">Zur Startseite</Button>
      </div>
    </div>
  );
}
