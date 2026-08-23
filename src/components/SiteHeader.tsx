"use client";

import type { ReactNode } from "react";

export type NavItem = { href: string; label: string; active?: boolean };

/**
 * サイト共通のヘッダ。**高さは固定**（--dh-header-h、既定 56px）。
 * ページごとに高さが変わると、遷移のたびに本文が縦に飛ぶ。
 *
 * 左: サイト名 / 中: 主要ナビ / 右: 任意（言語・テーマ・ログイン等）
 */
export function SiteHeader({
  siteName,
  href = "/",
  nav = [],
  right,
  LinkComponent,
}: {
  siteName: ReactNode;
  href?: string;
  nav?: NavItem[];
  right?: ReactNode;
  /** next/link などを渡す。未指定なら素の <a> */
  LinkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: ReactNode;
  }>;
}) {
  const A = LinkComponent ?? (({ href: h, className, children }) => (
    <a href={h} className={className}>{children}</a>
  ));
  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur"
      style={{ height: "var(--dh-header-h)" }}
    >
      <div
        className="mx-auto flex h-full w-full items-center gap-4 px-4 sm:px-6"
        style={{ maxWidth: "var(--dh-container)" }}
      >
        <A href={href} className="shrink-0 text-[15px] font-semibold tracking-tight">
          {siteName}
        </A>
        {nav.length > 0 && (
          <nav className="hidden min-w-0 items-center gap-1 md:flex" aria-label="主要ナビゲーション">
            {nav.map((n) => (
              <A
                key={n.href}
                href={n.href}
                className={`rounded-dh-sm px-2.5 py-1.5 text-sm whitespace-nowrap transition ${
                  n.active
                    ? "bg-accent-soft font-medium text-accent"
                    : "text-ink-muted hover:bg-surface-2 hover:text-ink"
                }`}
              >
                {n.label}
              </A>
            ))}
          </nav>
        )}
        <div className="ml-auto flex shrink-0 items-center gap-2">{right}</div>
      </div>
    </header>
  );
}
