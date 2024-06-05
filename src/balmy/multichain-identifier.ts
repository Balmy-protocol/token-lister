import { Address, ChainId } from "@mean-finance/sdk";
import { FullTokenData, TokenData } from "./types";
import { sortTokens } from "./utils";

type CgChainId = string;
type CgCoinId = string;

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

const equivalentCgCoinIds: Record<CgCoinId, Set<CgCoinId>> = {
  tether: new Set([
    "bridged-usdt",
    "arbitrum-bridged-usdt-arbitrum",
    "bridged-tether-linea",
    "bridged-tether-manta-pacific",
    "bridged-tether-opbnb",
    "bridged-tether-scroll",
    "bridged-tether-stargate",
    "bridged-tether-starkgate",
    "bridged-usdt-core",
    "celer-bridged-usdt-conflux",
    "cronos-bridged-usdt-cronos",
    "gnosis-xdai-bridged-usdt-gnosis",
    "huobi-bridged-usdt-heco-chain",
    "kucoin-bridged-usdt-kucoin-community-chain",
    "lxly-bridged-usdt-astar-zkevm",
    "mantle-bridged-usdt-mantle",
    "mapped-usdt",
    "mode-bridged-usdt-mode",
    "multichain-bridged-usdt-moonbeam",
    "multichain-bridged-usdt-moonriver",
    "multichain-bridged-usdt-syscoin",
    "multichain-bridged-usdt-telos",
    "neonpass-bridged-usdt-neon",
    "nova-tether-usd",
    "polygon-bridged-usdt-polygon",
    "polygon-hermez-bridged-usdt-polygon-zkevm",
    "polygon-hermez-bridged-usdt-x-layer",
    "shimmerbridge-bridged-usdt-shimmerevm",
    "symbiosis-bridged-usdt-bahamut",
    "tether-pulsechain",
    "thundercore-bridged-usdt-thundercore",
    "viction-bridged-usdt-viction",
  ]),
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

  async prepareData(
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
