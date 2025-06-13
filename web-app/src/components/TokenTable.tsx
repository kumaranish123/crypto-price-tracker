'use client';

import { useSolanaTokens } from '../hooks/useSolanaTokens';
import { useRouter } from 'next/navigation';

export default function TokenTable() {
  const router = useRouter();
  const { data, isLoading, refetch } = useSolanaTokens();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* Manual refresh */}
      <button
        onClick={() => refetch()}
        className="mb-4 rounded bg-blue-600 px-3 py-1 text-white"
      >
        Refresh
      </button>

      {/* Search box */}
      <input
        placeholder="Search symbol or name..."
        className="mb-4 w-full max-w-sm rounded border px-2 py-1"
        onChange={(e) => {
          const q = e.target.value.toLowerCase();
          const rows =
            document.querySelectorAll<HTMLTableRowElement>('tbody tr');
          rows.forEach((row) => {
            row.style.display = row.dataset.q?.includes(q) ? '' : 'none';
          });
        }}
      />

      {/* Price table */}
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-right">Price ($)</th>
            <th className="p-2 text-right">24 h %</th>
            <th className="p-2 text-right">Mkt Cap</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((t) => (
            <tr
              key={t.id}
              data-q={`${t.symbol}${t.name}`.toLowerCase()}
              onClick={() => router.push(`/token/${t.id}`)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border-t p-2">
                <img src={t.image} alt="" className="mr-2 inline h-5 w-5" />
                {t.name} ({t.symbol.toUpperCase()})
              </td>
              <td className="border-t p-2 text-right">
                {t.current_price.toLocaleString()}
              </td>
              <td
                className={`border-t p-2 text-right ${
                  t.price_change_percentage_24h >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {t.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="border-t p-2 text-right">
                {t.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}