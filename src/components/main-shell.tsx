"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Reserviert Platz unter dem festen Header – außer auf der Startseite (Vollbild-Hero). */
export function MainShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <main
      id="inhalt"
      tabIndex={-1}
      className={`flex-1 focus:outline-none ${pathname === "/" ? "" : "pt-20 md:pt-28"}`}
    >
      {children}
    </main>
  );
}
