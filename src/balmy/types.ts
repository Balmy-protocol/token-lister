import { Address, ChainId } from "@mean-finance/sdk";

export type ITokenListGenerator = {
  fetchTokens(): Promise<void>;
  getTokenList(): TokenData[];
  getChains(): ChainId[];
};

export type TokenData = {
  name: string;
  symbol: string;
  address: Address;
  logoURI?: string;
  decimals?: number;
  chainID: ChainId;
};
