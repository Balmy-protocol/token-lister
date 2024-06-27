import { Address, ChainId } from "@mean-finance/sdk";
import { equivalentCgCoinIds } from "./equivalentCgCoinIds";
import { FullTokenData, TokenData } from "../types";
import { sortTokens } from "../utils";

type CgChainId = string;
export type CgCoinId = string;

type CoinGeckoCoin = {
  id: string;
  symbol: string;
  name: string;
  platforms: Record<string, string>;
};

type CoinGeckoPlatform = {
  id: CgChainId;
  chain_identifier: number | null;
  name: string;
  shortname: string;
  native_coin_id: string;
};

class MultichainIdentifier {
  private cgChainMap: Record<CgChainId, ChainId>;
  private cgMultichainMap: Record<
    CgCoinId,
    { chainId: ChainId; address: Address }[]
  >;
  private tokenKeyToCgCoinId: Record<string, CgCoinId>;

  constructor(cgCoinList: CoinGeckoCoin[], cgChainList: CoinGeckoPlatform[]) {
    this.cgChainMap = {};
    this.cgMultichainMap = {};
    this.tokenKeyToCgCoinId = {};

    this.prepareData(cgCoinList, cgChainList);
  }

  private prepareData(
    cgCoinList: CoinGeckoCoin[],
    cgChainList: CoinGeckoPlatform[]
  ) {
    cgChainList.forEach((chain) => {
      if (chain.chain_identifier !== null) {
        this.cgChainMap[chain.id] = chain.chain_identifier;
      }
    });

    cgCoinList.forEach((cgCoin) => {
      Object.entries(cgCoin.platforms).forEach(([cgChainId, tokenAddress]) => {
        const chainId = this.cgChainMap[cgChainId];
        if (!chainId) return;

        let cgCoinIdToUse = cgCoin.id;
        for (const [cgCoinId, equivalentCgCoinIdsSet] of Object.entries(
          equivalentCgCoinIds
        )) {
          if (equivalentCgCoinIdsSet.has(cgCoin.id)) {
            cgCoinIdToUse = cgCoinId;
            break;
          }
        }

        this.tokenKeyToCgCoinId[`${chainId}-${tokenAddress.toLowerCase()}`] =
          cgCoinIdToUse;

        if (!this.cgMultichainMap[cgCoinIdToUse]) {
          this.cgMultichainMap[cgCoinIdToUse] = [];
        }
        this.cgMultichainMap[cgCoinIdToUse].push({
          chainId,
          address: tokenAddress,
        });
      });
    });
  }
  populateChainAddresses(tokens: (TokenData | FullTokenData)[]) {
    return tokens.map((token) => {
      const cgCoinId =
        this.tokenKeyToCgCoinId[
          `${token.chainId}-${token.address.toLowerCase()}`
        ];

      const cgMultichain = this.cgMultichainMap[cgCoinId];
      if (!cgMultichain) return token;

      const chainAddresses = cgMultichain.map((chainToken) => {
        return {
          chainId: chainToken.chainId,
          address: chainToken.address,
        };
      });

      token.chainAddresses = sortTokens(chainAddresses);
      return token;
    });
  }
}

export const buildMultichainIdentifier = async () => {
  const cgCoinsPromise: Promise<CoinGeckoCoin[]> = fetch(
    "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
  ).then((res) => res.json());
  const cgPlatformsResponse: Promise<CoinGeckoPlatform[]> = fetch(
    "https://api.coingecko.com/api/v3/asset_platforms"
  ).then((res) => res.json());

  const [cgCoinList, cgChainList] = await Promise.all([
    cgCoinsPromise,
    cgPlatformsResponse,
  ]);

  const multichainIdentifier = new MultichainIdentifier(
    cgCoinList,
    cgChainList
  );
  return multichainIdentifier;
};
