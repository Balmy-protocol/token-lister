import { Address, ChainId } from "@balmy/sdk";
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
    cgChainList: CoinGeckoPlatform[],
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
          equivalentCgCoinIds,
        )) {
          if (
            (equivalentCgCoinIdsSet instanceof Set &&
              equivalentCgCoinIdsSet.has(cgCoin.id)) ||
            (equivalentCgCoinIdsSet instanceof RegExp &&
              equivalentCgCoinIdsSet.test(cgCoin.id))
          ) {
            cgCoinIdToUse = cgCoinId;
            break;
          }
        }

        this.tokenKeyToCgCoinId[`${chainId}-${tokenAddress.toLowerCase()}`] =
          cgCoinIdToUse;

        if (!this.cgMultichainMap[cgCoinIdToUse]) {
          this.cgMultichainMap[cgCoinIdToUse] = [];
        }
        const existingEntryInChain = this.cgMultichainMap[cgCoinIdToUse].some(
          (entry) => entry.chainId === chainId,
        );

        if (!existingEntryInChain) {
          this.cgMultichainMap[cgCoinIdToUse].push({
            chainId,
            address: tokenAddress,
          });
        }
      });
    });
  }
  populateChainAddresses(tokens: (TokenData | FullTokenData)[]) {
    const existingChainIds = new Set(
      tokens.map((token) => token.chainId)
    );

    return tokens.map((token) => {
      const cgCoinId =
        this.tokenKeyToCgCoinId[
          `${token.chainId}-${token.address.toLowerCase()}`
        ];

      const cgMultichain = this.cgMultichainMap[cgCoinId];
      if (!cgMultichain) return token;

      // Filter chain addresses to only include chains that exist in the main token list
      const chainAddresses = cgMultichain
        .filter((chainToken) => existingChainIds.has(chainToken.chainId))
        .map((chainToken) => {
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
    "https://api.coingecko.com/api/v3/coins/list?include_platform=true",
  ).then((res) => res.json());
  const cgPlatformsResponse: Promise<CoinGeckoPlatform[]> = fetch(
    "https://api.coingecko.com/api/v3/asset_platforms",
  ).then((res) => res.json());

  const [cgCoinList, cgChainList] = await Promise.all([
    cgCoinsPromise,
    cgPlatformsResponse,
  ]);

  const multichainIdentifier = new MultichainIdentifier(
    cgCoinList,
    cgChainList,
  );
  return multichainIdentifier;
};
