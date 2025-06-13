
import axios from 'axios'

export type SolanaToken = {
id: string
symbol: string
name: string
image: string
current_price: number
price_change_percentage_24h: number
market_cap: number
}

// Fetch top 50 Solana-chain tokens priced in USD
export const fetchSolanaTokens = async (): Promise<SolanaToken[]> => {
const url =
'https://api.coingecko.com/api/v3/coins/markets' +
'?vs_currency=usd&platform=solana&order=market_cap_desc' +
'&per_page=50&page=1&sparkline=false&price_change_percentage=24h'
const { data } = await axios.get<SolanaToken[]>(url)
return data
}