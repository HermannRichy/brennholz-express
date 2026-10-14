import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

const GOLD = "#a98650";
const GOLD_LIGHT = "#d6bd8b";
const IVORY = "#f6f1e9";
const INK = "#14110f";

// Tabler "flame" (outline)
const FLAME_PATH =
  "M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z";

function Flame({ size, color = GOLD }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d={FLAME_PATH} />
    </svg>
  );
}

/** Teilkarte 1200×630: Titel, Untertitel und optionaler Preis. */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
  badge,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          color: IVORY,
          padding: 36,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: `1px solid ${GOLD}`,
            padding: "52px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Flame size={40} />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <div style={{ fontSize: 30, letterSpacing: 9 }}>BRENNHOLZ</div>
                <div style={{ fontSize: 13, letterSpacing: 16, color: GOLD, marginTop: 8 }}>EXPRESS</div>
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 16, letterSpacing: 6, color: GOLD_LIGHT }}>SEIT 1974</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", fontSize: 18, letterSpacing: 8, color: GOLD, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: title.length > 40 ? 62 : 80,
                lineHeight: 1.04,
                letterSpacing: -1.5,
                maxWidth: 960,
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", fontSize: 26, opacity: 0.65, maxWidth: 880, lineHeight: 1.35 }}>
              {subtitle}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", fontSize: 20, letterSpacing: 2, opacity: 0.6 }}>
              {SITE.url.replace(/^https?:\/\//, "")}
            </div>
            {badge && (
              <div
                style={{
                  display: "flex",
                  border: `1px solid ${GOLD}`,
                  color: GOLD_LIGHT,
                  fontSize: 34,
                  padding: "12px 28px",
                }}
              >
                {badge}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}

/** Quadratisches Icon (apple-touch-icon). */
export function renderSquareIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: INK,
        }}
      >
        <Flame size={Math.round(size * 0.62)} color={GOLD_LIGHT} />
      </div>
    ),
    { width: size, height: size }
  );
}
