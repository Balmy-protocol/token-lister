import { TokenData } from "./types";

export function unifyTokenData(filteredTokens: any[]): Required<TokenData> {
  return {
    name: filteredTokens.find((t) => t.name != undefined)?.name,
    symbol: filteredTokens.find((t) => t.symbol != undefined)?.symbol,
    address: filteredTokens.find((t) => t.address != undefined)?.address,
    logoURI: filteredTokens.find((t) => t.logoURI != undefined)?.logoURI,
    decimals: filteredTokens.find((t) => t.decimals != undefined)?.decimals,
    chainID: filteredTokens.find((t) => t.chainID != undefined)?.chainID,
  };
}
