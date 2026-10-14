"use client";

import { useEffect } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-12 py-24 md:py-40">
      <IconAlertTriangle size={52} stroke={1} className="text-gold" />
      <p className="eyebrow mt-8">Fehler</p>
      <h1 className="mt-5 font-serif font-light text-[3.2rem] md:text-[6.4rem] leading-[0.98]">
        Etwas ist <em>schiefgelaufen</em>.
      </h1>
      <p className="mt-6 max-w-md text-ink/65">
        Die Seite konnte nicht geladen werden. Bitte versuchen Sie es gleich noch einmal – oder rufen Sie uns
        an unter{" "}
        <a href={SITE.phoneHref} className="text-gold-deep underline underline-offset-4">{SITE.phone}</a>.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:w-fit">
        <Button onClick={() => retry()}>Erneut versuchen</Button>
        <Button href="/" variant="outline">Zur Startseite</Button>
      </div>
    </div>
  );
}
