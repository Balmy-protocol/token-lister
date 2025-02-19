import { ChainId } from "@mean-finance/sdk";

export function odosParser(chainId: ChainId) {
  return (list: { tokenMap: Record<string, any> }) =>
    Object.entries(list.tokenMap ?? []).map(([key, token]) => ({
      ...token,
      address: key,
      chainId: chainId,
      logoURI: `https://assets.odos.xyz/tokens/${token.symbol}.webp`,
    }));
}

export function oneInchParser(chainId: ChainId) {
  return (list: Record<string, any>) =>
    Object.entries(list ?? []).map(([_, token]) => ({
      ...token,
      chainId: chainId,
    }));
}

export function smolDappFilter(excludedChainIds: ChainId[]) {
  return (list: { tokens: any[] }) =>
    list.tokens
      .filter((token) => !excludedChainIds.includes(token.chainId))
      .map((token) => ({
        ...token,
      }));
}
