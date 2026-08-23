import type { ReactNode } from "react";

/**
 * ヒーロー。**背景画像 + 覆い**の上に、小見出し・大見出し・リード・行動を置く。
 *
 * 資料を扱うサイトでは、背景に**資料そのものの画像**を敷くのが最も雄弁になる。
 * ただし読みやすさは犠牲にできないので、覆い（グラデーション）で文字面を作る。
 *
 * 権利に注意: 背景に使う画像は、**公開してよいと確認できたもの**だけにする。
 * 未確認の所蔵資料を敷いてはいけない。
 */
export function Hero({
  eyebrow,
  title,
  lead,
  actions,
  aside,
  backgroundImage,
  backgroundCredit,
  height = "min(72vh, 620px)",
  align = "left",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  /** 右側に置く補足（統計など） */
  aside?: ReactNode;
  backgroundImage?: string;
  /** 背景画像の出所表記。敷いたなら必ず書く */
  backgroundCredit?: ReactNode;
  height?: string;
  align?: "left" | "center";
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-inverse-bg text-inverse-ink"
      style={{ minHeight: height }}
    >
      {backgroundImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          {/* 文字面を作るための覆い。左から濃く、上下にも少し落とす */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgb(12 13 15 / 0.92) 0%, rgb(12 13 15 / 0.78) 42%, rgb(12 13 15 / 0.35) 100%)",
            }}
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(180deg, rgb(12 13 15 / 0.45) 0%, rgb(12 13 15 / 0) 30%, rgb(12 13 15 / 0.55) 100%)",
            }}
          />
        </>
      )}

      <div
        className="mx-auto flex w-full flex-col justify-center gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:py-20"
        style={{ maxWidth: "var(--dh-container)", minHeight: height }}
      >
        <div className={`max-w-4xl ${align === "center" ? "mx-auto text-center" : ""}`}>
          {eyebrow && (
            <p className="mb-3 font-mono text-xs tracking-[0.18em] text-inverse-muted uppercase">
              {eyebrow}
            </p>
          )}
          <h1
            className="font-serif text-4xl leading-[1.25] sm:text-5xl lg:text-6xl"
            style={{
              // 日本語の見出しは、放っておくと「〜を。」のような 1〜2 文字が
              // 次の行に取り残される。auto-phrase は文節で折り返し、
              // balance は行の長さをそろえる。
              wordBreak: "auto-phrase",
              textWrap: "balance",
            }}
          >
            {title}
          </h1>
          {lead && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-inverse-ink/85 sm:text-lg">
              {lead}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {aside && <div className="lg:ml-auto lg:shrink-0">{aside}</div>}
      </div>

      {backgroundCredit && (
        <p className="absolute right-3 bottom-2 z-10 text-[11px] text-inverse-ink/60">
          {backgroundCredit}
        </p>
      )}
    </section>
  );
}
