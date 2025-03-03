import { Address, ChainId } from "@balmy/sdk";

export type ITokenListGenerator = {
  fetchTokens(): Promise<void>;
  getTokenList(): TokenData[];
  getChains(): ChainId[];
};

export type ITokenList = { generator: ITokenListGenerator; priority?: number };

export type TokenData = {
  name: string;
  symbol: string;
  address: Address;
  logoURI?: string;
  decimals?: number;
  chainId: ChainId;
  chainAddresses?: { chainId: ChainId; address: Address }[];
};

export type FullTokenData = TokenData & {
  providers?: string[];
};
