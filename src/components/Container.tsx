import type { ReactNode } from "react";

/** 本文の最大幅。**アプリ全体でこれ 1 つだけ**を使う。
 *  画面ごとに max-w を変えると、遷移のたびに本文の左端が動いて落ち着かない。 */
export function Container({
  children,
  className = "",
  prose = false,
}: {
  children: ReactNode;
  className?: string;
  /** 読み物の段（お知らせ本文など）。カードや一覧では使わない */
  prose?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 ${className}`}
      style={{ maxWidth: prose ? "var(--dh-container-prose)" : "var(--dh-container)" }}
    >
      {children}
    </div>
  );
}
