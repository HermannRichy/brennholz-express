import { IconFlame } from "@tabler/icons-react";

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="inline-flex items-center gap-2.5">
        <IconFlame size={20} stroke={1.25} className="text-gold" />
        <span
          className={`font-serif text-[1.55rem] md:text-[1.85rem] font-medium tracking-[0.24em] ${
            light ? "text-bg" : "text-ink"
          }`}
        >
          BRENNHOLZ
        </span>
      </span>
      <span className="mt-1 text-[9px] font-semibold tracking-[0.62em] uppercase text-gold pl-[0.62em]">
        Express
      </span>
    </span>
  );
}
