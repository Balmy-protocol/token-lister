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
