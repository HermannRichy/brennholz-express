import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

const INPUT_CLS =
  "w-full bg-transparent border-0 border-b border-ink/30 px-0 py-3 text-[15px] text-ink placeholder:text-ink/35 transition-colors hover:border-ink/60 focus-visible:border-gold focus-visible:outline-none";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold tracking-[0.26em] uppercase text-ink/55">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${INPUT_CLS} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${INPUT_CLS} min-h-28 resize-y ${props.className ?? ""}`}
    />
  );
}

export function Radio({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer text-sm group">
      <input
        type="radio"
        name={name}
        value={label}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="w-[18px] h-[18px] shrink-0 rounded-full border border-ink/40 grid place-items-center transition-colors peer-checked:border-gold peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-gold peer-focus-visible:outline-offset-4 group-hover:border-gold after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-gold after:scale-0 after:transition-transform peer-checked:after:scale-100" />
      {label}
    </label>
  );
}
