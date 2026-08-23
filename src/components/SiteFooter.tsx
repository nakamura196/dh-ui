import type { ReactNode } from "react";

export type FooterGroup = { title: string; links: { href: string; label: string }[] };

/**
 * サイト共通のフッター。反転色の面で、見出しつきのリンク群を並べる。
 * ジャパンサーチのフッター（濃色・高さ 333px・見出し 4 群・リンク 18 本）を範にした。
 * 「小さな文字を 1 行だけ置く」フッターは、公開サイトとしては情報が足りない。
 */
export function SiteFooter({
  siteName,
  description,
  groups = [],
  bottom,
  LinkComponent,
}: {
  siteName: ReactNode;
  description?: ReactNode;
  groups?: FooterGroup[];
  bottom?: ReactNode;
  LinkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: ReactNode;
  }>;
}) {
  const A = LinkComponent ?? (({ href, className, children }) => (
    <a href={href} className={className}>{children}</a>
  ));
  return (
    <footer className="mt-16 bg-inverse-bg text-inverse-ink">
      <div
        className="mx-auto w-full px-4 py-12 sm:px-6"
        style={{ maxWidth: "var(--dh-container)" }}
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(auto-fit,minmax(160px,1fr))]">
          <div>
            <p className="text-base font-semibold">{siteName}</p>
            {description && (
              <p className="mt-2 max-w-md text-sm leading-relaxed text-inverse-muted">
                {description}
              </p>
            )}
          </div>
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="mb-2 text-xs font-semibold tracking-wider text-inverse-muted uppercase">
                {g.title}
              </h2>
              <ul className="space-y-1.5">
                {g.links.map((l) => (
                  <li key={l.href + l.label}>
                    <A
                      href={l.href}
                      className="text-sm text-inverse-ink/90 underline-offset-4 hover:underline"
                    >
                      {l.label}
                    </A>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        {bottom && (
          <div className="mt-10 border-t border-inverse-line pt-6 text-xs text-inverse-muted">
            {bottom}
          </div>
        )}
      </div>
    </footer>
  );
}
