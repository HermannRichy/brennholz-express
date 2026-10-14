export const SORTS = [
  { id: "pop", label: "Beliebteste" },
  { id: "asc", label: "Preis aufsteigend" },
  { id: "desc", label: "Preis absteigend" },
] as const;

export type SortId = (typeof SORTS)[number]["id"];

export const DELIVERY_OPTIONS = [
  { id: "vrac", label: "Lose abgekippt", price: 0 },
  { id: "range", label: "Auf Palette gestapelt", price: 29 },
] as const;
