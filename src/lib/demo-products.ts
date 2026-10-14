import type { Product } from "./types";

/**
 * Vorschau-Katalog, NUR in der Entwicklung (`next dev`) verwendet, solange
 * Shopify nicht konfiguriert ist. In Produktion wird er nie geladen.
 * Löschen: diese Datei und den Import in catalog.ts entfernen.
 */
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=1400&h=1750`;

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "eiche33",
    slug: "eichen-scheitholz-33-cm",
    img: U("1422246719650-cb30d19825e3"),
    name: "Eichen-Scheitholz 33 cm",
    category: "Scheitholz",
    essence: "Eiche",
    length: "33 cm",
    spec: "Trocken < 20 % · 1 Ster · hohe Dichte",
    description:
      "Das Holz für alle, die den ganzen Winter heizen: hohe Dichte, lange Brenndauer, wenig Asche. 24 Monate unter offenem Dach getrocknet.",
    price: 89,
    unit: "ster",
    specs: [
      { k: "Holzart", v: "Eiche" },
      { k: "Restfeuchte", v: "< 20 %" },
      { k: "Scheitlänge", v: "33 cm" },
      { k: "Trocknung", v: "24 Monate unter Dach" },
      { k: "Volumen", v: "1 Ster = 1 m³ geschichtet" },
    ],
  },
  {
    id: "eiche50",
    slug: "eichen-scheitholz-50-cm",
    img: U("1633491774171-2bf91b7033b1"),
    name: "Eichen-Scheitholz 50 cm",
    category: "Scheitholz",
    essence: "Eiche",
    length: "50 cm",
    spec: "Trocken < 20 % · 1 Ster · große Feuerstellen",
    description:
      "Langes Format für tiefe Kamine und Einsätze. Dieselbe Eiche, dieselbe Trocknung – weniger Handarbeit für Sie.",
    price: 82,
    unit: "ster",
    specs: [
      { k: "Holzart", v: "Eiche" },
      { k: "Restfeuchte", v: "< 20 %" },
      { k: "Scheitlänge", v: "50 cm" },
      { k: "Trocknung", v: "24 Monate unter Dach" },
      { k: "Volumen", v: "1 Ster = 1 m³ geschichtet" },
    ],
  },
  {
    id: "buche33",
    slug: "buchen-scheitholz-33-cm",
    img: U("1759790475933-ec8f2d02fc65"),
    name: "Buchen-Scheitholz 33 cm",
    category: "Scheitholz",
    essence: "Buche",
    length: "33 cm",
    spec: "Trocken < 20 % · lebhafte Flamme, wenig Asche",
    description:
      "Lebhafte, gleichmäßige Flamme und wenig Asche. Der Favorit für offene Kamine und Kochholz.",
    price: 95,
    unit: "ster",
    specs: [
      { k: "Holzart", v: "Buche" },
      { k: "Restfeuchte", v: "< 20 %" },
      { k: "Scheitlänge", v: "33 cm" },
      { k: "Trocknung", v: "24 Monate unter Dach" },
      { k: "Volumen", v: "1 Ster = 1 m³ geschichtet" },
    ],
  },
  {
    id: "hainbuche50",
    slug: "hainbuchen-scheitholz-50-cm",
    img: U("1672984581785-60e0ff402fd4"),
    name: "Hainbuchen-Scheitholz 50 cm",
    category: "Scheitholz",
    essence: "Hainbuche",
    length: "50 cm",
    spec: "Trocken < 20 % · lang anhaltende Glut",
    description:
      "Die Hainbuche brennt heiß und hält die Glut besonders lange – ideal für die lange Winternacht.",
    price: 87,
    unit: "ster",
    specs: [
      { k: "Holzart", v: "Hainbuche" },
      { k: "Restfeuchte", v: "< 20 %" },
      { k: "Scheitlänge", v: "50 cm" },
      { k: "Trocknung", v: "24 Monate unter Dach" },
      { k: "Volumen", v: "1 Ster = 1 m³ geschichtet" },
    ],
  },
  {
    id: "presslinge",
    slug: "holzbriketts",
    img: U("1576791606138-89367074a68f"),
    name: "Holzbriketts",
    category: "Briketts",
    essence: "Mischholz",
    length: "25 cm",
    spec: "Palette 96 Briketts · Tag und Nacht",
    description:
      "Gepresste Briketts mit hohem Heizwert und minimaler Asche – die Glut hält bis zum Morgen.",
    price: 349,
    unit: "palette",
    specs: [
      { k: "Holzart", v: "Mischholz" },
      { k: "Länge", v: "25 cm" },
      { k: "Verpackung", v: "Palette mit 96 Briketts" },
    ],
  },
  {
    id: "pellets",
    slug: "premium-pellets-din-plus",
    img: U("1759790475933-ec8f2d02fc65"),
    name: "Premium-Pellets DIN+",
    category: "Pellets",
    essence: "Nadelholz",
    length: "—",
    spec: "Palette mit 65 Säcken à 15 kg",
    description:
      "Zertifizierte DIN+-Pellets aus Nadelholz: gleichmäßiger Abbrand, geringer Ascheanteil, trocken verpackt.",
    price: 379,
    unit: "palette",
    specs: [
      { k: "Holzart", v: "Nadelholz" },
      { k: "Norm", v: "DIN+" },
      { k: "Verpackung", v: "65 Säcke à 15 kg" },
    ],
  },
  {
    id: "anzuender",
    slug: "anzuendholz",
    img: U("1633491774171-2bf91b7033b1"),
    name: "Anzündholz",
    category: "Anzünder",
    essence: "Nadelholz",
    length: "—",
    spec: "Sack 20 l · trockenes Nadelholz",
    description: "Trockenes, fein gespaltenes Nadelholz für ein Feuer, das beim ersten Streichholz brennt.",
    price: 9.5,
    unit: "sack",
    specs: [
      { k: "Holzart", v: "Nadelholz" },
      { k: "Verpackung", v: "Sack 20 l" },
    ],
  },
  {
    id: "pizzaholz",
    slug: "kochholz-fuer-pizzeria",
    img: U("1672984581785-60e0ff402fd4"),
    name: "Kochholz für Pizzeria",
    category: "Gastronomie",
    essence: "Buche",
    length: "33 cm",
    spec: "Buche kalibriert · Palette 1 m³",
    description:
      "Kalibrierte Buche für den professionellen Holzofen: gleichmäßiger Abbrand, schnelles Aufheizen.",
    price: 189,
    unit: "palette",
    specs: [
      { k: "Holzart", v: "Buche" },
      { k: "Restfeuchte", v: "< 20 %" },
      { k: "Scheitlänge", v: "33 cm" },
      { k: "Verpackung", v: "Palette ≈ 1 m³" },
    ],
  },
];
