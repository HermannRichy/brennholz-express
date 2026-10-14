import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Brennholz Express – Premium-Brennholz, trocken geliefert";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Familiensägewerk im Elsass",
    title: "Wärme, die Charakter hat.",
    subtitle: "Eiche, Buche und Hainbuche – 24 Monate getrocknet, in 48 bis 72 Stunden geliefert.",
  });
}
