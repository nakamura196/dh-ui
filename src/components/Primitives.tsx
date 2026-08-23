"use client";

import type { ReactNode } from "react";

/** 主要な行動。1画面に1つが目安。 */
export function Button({
  children, href, onClick, variant = "primary", size = "md", className = "", type = "button",
  LinkComponent,
}: {
  children: ReactNode; href?: string; onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  size?: "sm" | "md"; className?: string; type?: "button" | "submit";
  LinkComponent?: React.ComponentType<{ href: string; className?: string; children: ReactNode }>;
}) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-dh font-medium transition whitespace-nowrap";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm" }[size];
  const variants = {
    primary: "bg-accent text-accent-ink hover:bg-accent-hover",
    secondary: "border border-line bg-surface text-ink hover:bg-surface-2",
    ghost: "text-accent hover:bg-accent-soft",
    onDark: "border border-white/40 text-white hover:bg-white/10",
  }[variant];
  const cls = `${base} ${sizes} ${variants} ${className}`;
  if (href) {
    const A = LinkComponent ?? (({ href: h, className, children: c }) => <a href={h} className={className}>{c}</a>);
    return <A href={href} className={cls}>{children}</A>;
  }
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}

/** 絞り込みなどに使う丸いラベル。件数を添えられる。 */
export function Chip({
  children, count, active = false, onClick, as = "button",
}: {
  children: ReactNode; count?: number; active?: boolean; onClick?: () => void;
  as?: "button" | "span";
}) {
  const cls = `inline-flex items-center gap-1 rounded-pill border px-2.5 py-1 text-xs transition ${
    active
      ? "border-accent bg-accent text-accent-ink"
      : "border-line text-ink-muted hover:border-accent hover:text-ink"
  }`;
  if (as === "span") return <span className={cls}>{children}{count != null && <span className="opacity-60">{count}</span>}</span>;
  return (
    <button type="button" onClick={onClick} className={cls} aria-pressed={active}>
      {children}
      {count != null && <span className="opacity-60">{count}</span>}
    </button>
  );
}

/** 数値を大きく見せる。トップや概要で使う。 */
export function Stat({ label, value, tone = "default" }: {
  label: ReactNode; value: ReactNode; tone?: "default" | "onDark";
}) {
  return (
    <div>
      <dt className={`font-mono text-[11px] tracking-[0.14em] uppercase ${
        tone === "onDark" ? "text-inverse-muted" : "text-ink-muted"}`}>{label}</dt>
      <dd className={`font-serif text-3xl tabular-nums ${tone === "onDark" ? "text-inverse-ink" : "text-ink"}`}>
        {value}
      </dd>
    </div>
  );
}

/** 資料カード。画像を主役にする（無声映画は絵でしか判別できない）。 */
export function MediaCard({
  href, image, title, meta, children, badges, LinkComponent, imageAlt = "",
}: {
  href: string; image?: string; title: ReactNode; meta?: ReactNode;
  children?: ReactNode; badges?: ReactNode; imageAlt?: string;
  LinkComponent?: React.ComponentType<{ href: string; className?: string; children: ReactNode }>;
}) {
  const A = LinkComponent ?? (({ href: h, className, children: c }) => <a href={h} className={className}>{c}</a>);
  return (
    <A href={href} className="group flex flex-col overflow-hidden rounded-dh border border-line bg-surface shadow-sm transition hover:border-accent hover:shadow">
      {image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={image} alt={imageAlt} className="aspect-video w-full object-cover transition group-hover:opacity-90" />
      ) : (
        <div className="aspect-video w-full bg-surface-2" />
      )}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="leading-snug font-semibold">{title}</h3>
        {meta && <p className="mt-0.5 text-xs text-ink-muted">{meta}</p>}
        {badges && <div className="mt-2 flex flex-wrap gap-1">{badges}</div>}
        {children && <div className="mt-2 text-xs leading-relaxed text-ink-muted">{children}</div>}
      </div>
    </A>
  );
}

/** 小さな状態ラベル。 */
export function Badge({ children, tone = "neutral" }: {
  children: ReactNode; tone?: "neutral" | "accent" | "warn" | "ok";
}) {
  const tones = {
    neutral: "bg-surface-2 text-ink-muted",
    accent: "bg-accent-soft text-accent",
    warn: "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300",
    ok: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300",
  }[tone];
  return <span className={`rounded px-1.5 py-0.5 text-[11px] ${tones}`}>{children}</span>;
}

/** 検索窓。トップと検索画面で同じ形にする。 */
export function SearchBox({
  value, onChange, onSubmit, placeholder, size = "md", autoFocus = false, name = "q",
}: {
  value?: string; onChange?: (v: string) => void; onSubmit?: (v: string) => void;
  placeholder?: string; size?: "md" | "lg"; autoFocus?: boolean; name?: string;
}) {
  const pad = size === "lg" ? "py-3.5 text-base" : "py-2 text-sm";
  return (
    <form
      role="search"
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(value ?? ""); }}
      className="flex w-full items-stretch gap-2"
    >
      <input
        name={name}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-dh border border-line bg-surface px-4 ${pad} text-ink outline-none placeholder:text-ink-muted focus:border-accent`}
      />
      <Button type="submit" size={size === "lg" ? "md" : "sm"} className={size === "lg" ? "px-6" : ""}>
        検索
      </Button>
    </form>
  );
}
