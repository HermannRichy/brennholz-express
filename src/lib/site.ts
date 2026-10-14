/**
 * Zentrale Firmendaten: Kontakt, Adresse, URL.
 * Verwendet von Footer, Kontaktseite, SEO-Metadaten und Rechtstexten.
 */
export const SITE = {
  name: "Brennholz Express",
  shortName: "Brennholz Express",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://brennholz-express.de",
  tagline: "Premium-Brennholz, trocken geliefert",
  description:
    "Scheitholz, Pellets und Kaminholz – 24 Monate getrocknet, in 48 bis 72 Stunden geliefert. Familiensägewerk im Elsass seit 1974.",
  phone: "+33 6 38 88 40 61",
  phoneHref: "tel:+33638884061",
  phoneIntl: "+33638884061",
  email: "contact@luxboischauffage.com",
  hours: "Mo–Sa · 8–18 Uhr",
  address: {
    street: "12 route de la Forêt",
    postalCode: "67790",
    city: "Steinbourg",
    country: "Frankreich",
  },
  legal: {
    companyName: "Brennholz Express",
    legalForm: "Einzelunternehmen",
    owner: "Younes Kallel",
  },
  host: {
    name: "Hostinger International Ltd.",
    address: "61 Lordou Vironos Street, 6023 Larnaka, Zypern",
  },
  lastUpdate: "14. Oktober 2026",
} as const;

export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`;
