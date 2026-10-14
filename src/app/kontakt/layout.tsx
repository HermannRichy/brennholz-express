import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt & Angebot",
  description: `Kostenloses Angebot, Antwort innerhalb von 24 Stunden. Rufen Sie an unter ${SITE.phone} oder schreiben Sie an ${SITE.email}.`,
  alternates: { canonical: "/kontakt" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
