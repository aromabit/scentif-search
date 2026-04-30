# Scentif

匂い測定記録の検索・閲覧アプリ。センサーで計測した匂いデータ（場所・時刻・気温・湿度・強度）を地図上に表示する。

## 技術スタック

- **Next.js** 16 - App Router / Static Export
- **React** 19
- **TypeScript** 5
- **Leaflet** - 地図表示
- **ESLint** 9 / **Prettier** 3

## 開発

```bash
pnpm install
pnpm dev
```

## ディレクトリ構成

```
.
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── search/
│       └── MapView.tsx     # Leaflet 地図
└── data/
    └── measurements.ts     # 測定記録データ・検索関数
```

## スクリプト

- `pnpm dev` — 開発サーバー起動
- `pnpm build` — 静的ビルド（`/out`）
- `pnpm lint` — ESLint 実行
- `pnpm typecheck` — 型チェック

## ライセンス

ISC
