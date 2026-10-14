"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Lässt Inhalt beim Einblenden erscheinen (Fade + Gleiten) oder – mit
 * `mask` – wie einen Vorhang aufgehen. Ohne IntersectionObserver oder bei
 * „Bewegung reduzieren" bleibt der Inhalt sichtbar.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  mask = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  mask?: boolean;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setState("in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";
  const style = { "--reveal-delay": `${delay}ms` } as React.CSSProperties;

  // Mit Maske: der Beobachter sitzt am äußeren Element, der Vorhang (clip-path)
  // am inneren – ein vollständig weggeschnittenes Element würde nie als sichtbar gemeldet.
  if (mask) {
    return (
      <Component ref={ref} className={className}>
        <div data-reveal-mask={state} style={style} className="absolute inset-0">
          {children}
        </div>
      </Component>
    );
  }

  return (
    <Component ref={ref} data-reveal={state} className={className} style={style}>
      {children}
    </Component>
  );
}
