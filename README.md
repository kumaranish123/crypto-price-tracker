# Crypto Price Tracker – Solana Edition 🪙🚀

Live prices, charts and quick analytics for the most-traded Solana ecosystem tokens.

## 1 ⸺ Features

| Feature             | Details                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------- |
| 🔴 Live Price Table | React-Query polls CoinGecko every 60 s; manual “Refresh” button invalidates cache instantly. |
| 🔍 Search           | Instant fuzzy filter on token name / symbol.                                                 |
| 📈 Chart            | TradingView widget shows interactive candlesticks, volume, indicators, etc.                  |
| 📱 Responsive       | Table turns into horizontal scroll on small screens; chart flexes width.                     |
| ⚠️ Error & Loading  | Skeleton rows on first load, toast on API failure, 404 pages for bad routes.                 |
| 📑 Docs             | Full Docusaurus site (`/docs`) – setup, API notes, state rationale, challenges.              |

---

## 2 ⸺ Tech Stack

- **Next.js 15** – App Router, TypeScript, Tailwind CSS
- **@tanstack/react-query** – server-state cache & polling
- **CoinGecko API** – `/coins/markets?vs_currency=usd&sparkline=false`
- **TradingView JS Widget** – client-only chart
- **Docusaurus v2** – documentation
- **ESLint + Prettier** – code quality (strict Next.js ruleset)

---

## 3 ⸺ Project Structure

```
crypto-price-tracker/
├─ web-app/          # Next.js 15 source
│  ├─ src/
│  │  ├─ app/        # App-Router routes (/, /token/[id])
│  │  ├─ components/ # TokenTable, Providers, Skeletons …
│  │  └─ lib/        # solanaApi.ts, queryClient.ts
│  └─ tailwind.config.ts
├─ docs/             # Docusaurus site
│  └─ docs/          # intro.md, setup.md, api.md, state.md, challenges.md
└─ README.md         # ← you are here
```

---

## 4 ⸺ Prerequisites

- Node 18 + (tested on 20.17)
- Git
- No API keys needed – CoinGecko & TradingView widgets are public.

---

## 5 ⸺ Getting Started

```bash
# 1. clone
git clone https://github.com/kumaranish123/crypto-price-tracker
cd crypto-price-tracker

# 2. run web-app
cd web-app
npm i
npm run dev          # http://localhost:3000

# --- in a second terminal tab ---
# 3. run docs
cd ../docs
npm i
npm start            # http://localhost:3000   (same port but different dev-server)
```

---

## 6 ⸺ Important NPM Scripts

| Location  | Command                      | Purpose                  |
| --------- | ---------------------------- | ------------------------ |
| `web-app` | `npm run dev`                | Dev server (Turbopack)   |
|           | `npm run build && npm start` | Production build / start |
|           | `npm run lint`               | ESLint (strict)          |
| `docs`    | `npm start`                  | Docusaurus dev           |
|           | `npm run build`              | Static docs build        |

---

## 7 ⸺ API Integration Logic

File `web-app/src/lib/solanaApi.ts`

```ts
const API = "https://api.coingecko.com/api/v3/coins/markets";

export const getTopSolanaTokens = async () =>
  axios
    .get<Token[]>(API, {
      params: {
        vs_currency: "usd",
        category: "solana-ecosystem",
        order: "market_cap_desc",
      },
    })
    .then((r) => r.data);
```

- **Rate-limit guard:** React-Query `staleTime: 60 000` → max 1 call/min unless user clicks _Refresh_.
- Errors bubble to the UI; toast + retry button offered.

---

## 8 ⸺ State Management Rationale

- **React-Query** handles server state (prices).
  - instant cache sharing across pages
  - polling, background refetch, stale-while-revalidate
- **Local search term = React Context** (3 lines) – no global store needed; keeps bundle lean.

---

## 9 ⸺ Challenges & Solutions

| Challenge                   | Solution                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| CORS & 50 req/min limit     | 60 s `staleTime`; manual refresh invalidates only one query key.                                                   |
| TradingView only in browser | `<Script src="https://s3.tradingview.com/tv.js" strategy="afterInteractive" />` + widget build inside `useEffect`. |
| Long tables on mobile       | `overflow-x-auto` wrapper + min-width cells.                                                                       |
| Fallback routes             | Next.js `not-found.tsx` shows graceful 404 with link back.                                                         |

Detailed write-ups live in the [docusaurus docs](../blob/main/docs/README.md).

---

## 10 ⸺ Testing / Lint / CI

- **ESLint** runs with `next lint` – fails build on any error.
- Basic smoke test: load dashboard, click first token, chart renders, manual refresh works with no console errors.
- (Time-boxed trial → deeper Jest/vitest unit tests omitted.)

---

## 11 ⸺ Screenshots

## 12 ⸺ Future Work

- Infinite scrolling through all Solana tokens
- Add dark-mode toggle (Tailwind class strategy ready)
- Unit tests with Vitest + React Testing Library
- GitHub Action to auto-deploy docs to GitHub Pages

---

## 13 ⸺ License

MIT – free for commercial and personal use.

---

**Happy trading & happy reviewing!** 🙌

```


```
