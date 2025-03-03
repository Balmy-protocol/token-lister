import { ChainId } from "@balmy/sdk";
import { TokenData } from "./types";

export function unifyTokenData(
  filteredTokens: any[],
  chainId: ChainId
): Required<TokenData> {
  return {
    name: filteredTokens.find((t) => t.name != undefined)?.name,
    symbol: filteredTokens.find((t) => t.symbol != undefined)?.symbol,
    address: filteredTokens.find((t) => t.address != undefined)?.address,
    logoURI: filteredTokens
      .sort(sortLogoURI)
      .find((t) => t.logoURI != undefined)?.logoURI,
    decimals: filteredTokens.find((t) => t.decimals != undefined)?.decimals,
    chainId: chainId,
    chainAddresses: [],
  };
}

function sortLogoURI(t1: any, t2: any): number {
  const ipfsRegex = /^ipfs:\/\/(.*)/;
  const svgRegex = /\.svg$/;
  const pngRegex = /\.png$/;

  if (ipfsRegex.test(t1.logoURI)) return -1;
  if (ipfsRegex.test(t2.logoURI)) return 1;
  if (svgRegex.test(t1.logoURI)) return -1;
  if (svgRegex.test(t2.logoURI)) return 1;
  if (pngRegex.test(t1.logoURI)) return -1;
  if (pngRegex.test(t2.logoURI)) return 1;
  return 0;
}

export function isCompleteToken(token: TokenData) {
  return (
    (token.decimals || token.decimals == 0) &&
    token.address &&
    token.chainId &&
    token.name &&
    token.symbol
  );
}

export function sortTokens<T extends { chainId: ChainId; address: string }>(
  tokens: T[]
): T[] {
  return tokens.sort(
    (a, b) =>
      a.chainId - b.chainId ||
      a.address.toLowerCase().localeCompare(b.address.toLowerCase())
  );
}
