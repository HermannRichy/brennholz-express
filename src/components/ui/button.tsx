import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-3 font-sans font-semibold text-[11px] tracking-[0.22em] uppercase leading-none cursor-pointer select-none overflow-hidden transition-[color,background-color,border-color,transform] duration-500 active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed";

const VARIANTS = {
  gold: "bg-gold text-ink px-8 py-[1.15rem] hover:bg-ink hover:text-gold-light",
  dark: "bg-ink text-bg px-8 py-[1.15rem] hover:bg-gold hover:text-ink",
  outline: "border border-ink text-ink px-8 py-[1.1rem] hover:bg-ink hover:text-bg",
  "outline-light":
    "border border-bg/60 text-bg px-8 py-[1.1rem] hover:bg-bg hover:text-ink hover:border-bg",
  link: "text-ink px-0 py-1 border-b border-ink/40 hover:border-gold hover:text-gold",
} as const;

type Variant = keyof typeof VARIANTS;

interface CommonProps {
  variant?: Variant;
  block?: boolean;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "gold", block, arrow, className = "", children, ...rest } = props;
  const cls = `${BASE} ${VARIANTS[variant]} ${block ? "w-full" : ""} ${className}`;
  const content = (
    <>
      <span className="relative inline-flex items-center gap-3">{children}</span>
      {arrow && (
        <IconArrowRight
          size={16}
          stroke={1.5}
          className="relative transition-transform duration-500 group-hover/btn:translate-x-1.5"
        />
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href!} className={cls} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

export function IconButton({
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; className?: string }) {
  return (
    <button
      className={`w-11 h-11 shrink-0 grid place-items-center cursor-pointer transition-[color,transform] duration-300 hover:text-gold active:scale-90 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
