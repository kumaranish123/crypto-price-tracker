## Challenges & solutions

- **CORS / rate-limits** – CoinGecko allows 50 req/min; React-Query’s 60-second `staleTime` keeps us under the cap.
- **TradingView embed** – the widget script must load only in the browser. We insert it with
  ```jsx
  <Script src="https://s3.tradingview.com/tv.js" strategy="afterInteractive" />
  ```
