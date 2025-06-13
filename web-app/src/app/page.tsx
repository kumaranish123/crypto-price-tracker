'use client'
import TokenTable from '../components/TokenTable'

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Solana Tokens – Live Prices</h1>
      <TokenTable />
    </main>
  )
}