import { useQuery } from '@tanstack/react-query'
import { fetchSolanaTokens, SolanaToken } from '../lib/solanaApi'

export const useSolanaTokens = () =>
useQuery<SolanaToken[]>({
queryKey: ['solanaTokens'],
queryFn: fetchSolanaTokens,
refetchInterval: 30_000, // auto-refresh every 30 s
})