"use client";

import { useEffect } from "react";

// Dernier filet de sécurité : remplace tout le layout, donc styles en ligne.
export default function GlobalError({
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
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f6f1e9",
          color: "#14110f",
          fontFamily: "Georgia, serif",
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 440 }}>
          <h1 style={{ fontSize: 32, margin: "0 0 12px" }}>Etwas ist schiefgelaufen.</h1>
          <p style={{ margin: "0 0 20px" }}>
            Die Website ist vorübergehend nicht erreichbar. Bitte versuchen Sie es erneut oder rufen Sie uns an: +33 6 38 88 40 61.
          </p>
          <button
            onClick={() => retry()}
            style={{
              background: "#a98650",
              color: "#14110f",
              border: 0,
              padding: "14px 20px",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
