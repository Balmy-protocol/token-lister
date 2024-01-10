import { Address, ChainId } from "@mean-finance/sdk";

export type ITokenListGenerator = {
  fetchTokens(): Promise<void>;
  getTokenList(): TokenData[];
};

export type TokenData = {
  name: string;
  symbol: string;
  address: Address;
  logoURI?: string;
  decimals?: number;
  chainID: ChainId;
};
