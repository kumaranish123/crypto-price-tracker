/* src/app/token/[id]/page.tsx */
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import Script from 'next/script';
import { useSolanaTokens } from '@/hooks/useSolanaTokens';

export default function TokenPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useSolanaTokens();

  // find the token in our cached list
  const token = data?.find((t) => t.id === id);

  // inject TradingView widget once script is ready
  useEffect(() => {
    if (!token) return;

    // @ts-ignore  – tv.js attaches TradingView to window
    if (typeof window !== 'undefined' && window.TradingView) {
      // remove any previous widget
      document.getElementById('tv-chart')!.innerHTML = '';

      // build a simple “exchange:symbol” string (defaults to Binance)
      const tvSymbol = `BINANCE:${token.symbol.toUpperCase()}USDT`;

      // @ts-ignore
      new window.TradingView.widget({
        symbol: tvSymbol,
        container_id: 'tv-chart',
        width: '100%',
        height: 400,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        hide_top_toolbar: false,
        hide_legend: false,
        allow_symbol_change: false,
      });
    }
  }, [token]);

  if (isLoading) return <p className="p-6">Loading…</p>;
  if (isError || !token) return <p className="p-6">Token not found.</p>;

  return (
    <main className="p-6 space-y-4">
      {/* load TradingView script once */}
      <Script src="https://s3.tradingview.com/tv.js" strategy="afterInteractive" />

      <Link href="/" className="text-blue-600 hover:underline">
        &larr; Back
      </Link>

      <h1 className="text-2xl font-semibold">
        {token.name} ({token.symbol.toUpperCase()})
      </h1>

      <div className="grid gap-2 md:grid-cols-3">
        <p>Price: ${token.current_price.toLocaleString()}</p>
        <p>
          24 h&nbsp;%:{' '}
          <span
            className={
              token.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'
            }
          >
            {token.price_change_percentage_24h.toFixed(2)} %
          </span>
        </p>
        <p>Market-cap: ${token.market_cap.toLocaleString()}</p>
      </div>

      {/* Chart container */}
      <div id="tv-chart" className="w-full border" />
    </main>
  );
}