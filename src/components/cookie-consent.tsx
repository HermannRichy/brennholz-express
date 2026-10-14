"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { IconCookie } from "@tabler/icons-react";
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  parseConsent,
  readConsentRaw,
  saveConsent,
} from "@/lib/consent";
import { Button } from "@/components/ui/button";

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function CookieConsent() {
  // Serverseitig gilt die Entscheidung als getroffen: kein Banner im ersten HTML,
  // es erscheint nach der Hydration, falls keine gültige Wahl vorliegt.
  const raw = useSyncExternalStore(subscribe, readConsentRaw, () => "server");
  const consent = raw === "server" ? { analytics: false, at: 0 } : parseConsent(raw);

  const [reopened, setReopened] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const open = () => {
      setAnalytics(parseConsent(readConsentRaw())?.analytics ?? false);
      setCustom(true);
      setReopened(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  if (consent && !reopened) return null;

  const choose = (value: boolean) => {
    saveConsent(value);
    setReopened(false);
    setCustom(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      aria-describedby="cookie-desc"
      className="animate-sheet-in fixed inset-x-0 bottom-0 z-[70] md:inset-x-auto md:left-8 md:bottom-8 md:max-w-md bg-ink text-bg border-t border-gold/50 md:border md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] p-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <IconCookie size={24} stroke={1.25} className="text-gold shrink-0" />
        <h2 className="font-serif text-[1.6rem]">Ihre <em>Privatsphäre</em></h2>
      </div>
      <p id="cookie-desc" className="text-[12.5px] text-bg/65 leading-relaxed m-0">
        Wir verwenden nur den technisch notwendigen Speicher (Ihr Warenkorb) – keine Werbe-Tracker. Sie
        entscheiden, ob eine anonyme Reichweitenmessung aktiviert werden darf.{" "}
        <Link href="/datenschutz" className="text-gold-light underline underline-offset-4">
          Mehr erfahren
        </Link>
      </p>

      {custom && (
        <div className="flex flex-col border border-line-light animate-fade-in">
          <label className="flex items-start gap-3 p-4 border-b border-line-light opacity-70">
            <input type="checkbox" checked disabled className="mt-1 accent-[var(--color-gold)]" />
            <span className="text-[12px] text-bg/70">
              <strong className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-bg">Notwendig</strong>
              Warenkorb und Grundfunktionen. Immer aktiv.
            </span>
          </label>
          <label className="flex items-start gap-3 p-4 cursor-pointer hover:bg-bg/5 transition-colors">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 accent-[var(--color-gold)]"
            />
            <span className="text-[12px] text-bg/70">
              <strong className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-bg">Reichweitenmessung</strong>
              Anonyme Besuchsstatistiken zur Verbesserung der Website.
            </span>
          </label>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        {custom ? (
          <Button className="flex-1 !py-3.5" onClick={() => choose(analytics)}>
            Auswahl speichern
          </Button>
        ) : (
          <>
            <Button variant="outline-light" className="flex-1 !px-4 !py-3.5" onClick={() => choose(false)}>
              Ablehnen
            </Button>
            <Button variant="outline-light" className="flex-1 !px-4 !py-3.5" onClick={() => setCustom(true)}>
              Anpassen
            </Button>
            <Button className="flex-1 !px-4 !py-3.5" onClick={() => choose(true)}>
              Akzeptieren
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
