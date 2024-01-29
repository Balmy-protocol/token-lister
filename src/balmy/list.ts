import { ChainId } from "@mean-finance/sdk";
import { liquestTokenListGenerator } from "./adapters";
import { jsonGenericTokenListGenerator } from "./adapters/generics/jsonGenericAdapter";
import { ITokenListGenerator } from "./types";
import { odosParser, oneInchParser } from "./parsers";

export const generators: Record<
  string,
  { generator: ITokenListGenerator; chains?: ChainId[] }
> = {
  balmy: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/Mean-Finance/token-list/main/mean-finance.tokenlist.json",
    ),
  },
  compound: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
    ),
  },
  sushiswap: {
    generator: new jsonGenericTokenListGenerator(
      "https://token-list.sushi.com/",
    ),
  },
  optimism: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json",
    ),
  },
  liquest: {
    generator: new liquestTokenListGenerator(),
    chains: [1101, 8453, 59144],
  },
  canto: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/Canto-Network/list/main/lists/token-lists/mainnet/tokens.json",
    ),
    chains: [7700],
  },
  odosBaseGoerli: {
    generator: new jsonGenericTokenListGenerator(
      "https://api.odos.xyz/info/tokens/84531",
      odosParser(84531),
    ),
    chains: [84531],
  },
  odosBase: {
    generator: new jsonGenericTokenListGenerator(
      "https://api.odos.xyz/info/tokens/8453",
      odosParser(8453),
    ),
    chains: [8453],
  },
  odosPolygonZkEvm: {
    generator: new jsonGenericTokenListGenerator(
      "https://api.odos.xyz/info/tokens/1101",
      odosParser(1101),
    ),
    chains: [1101],
  },
  zkevmPolygonZkEvm: {
    generator: new jsonGenericTokenListGenerator(
      "https://api-polygon-tokens.polygon.technology/tokenlists/zkevmPopular.tokenlist.json",
    ),
    chains: [1101],
  },
  bsc1inch: {
    generator: new jsonGenericTokenListGenerator(
      "https://tokens.1inch.io/v1.2/56",
      oneInchParser(56),
    ),
    chains: [56],
  },
  fantom1inch: {
    generator: new jsonGenericTokenListGenerator(
      "https://tokens.1inch.io/v1.2/250",
      oneInchParser(250),
    ),
    chains: [250],
  },
  avalance1inch: {
    generator: new jsonGenericTokenListGenerator(
      "https://tokens.1inch.io/v1.2/43114",
      oneInchParser(43114),
    ),
    chains: [43114],
  },
  arbitrum1inch: {
    generator: new jsonGenericTokenListGenerator(
      "https://tokens.1inch.io/v1.2/42161",
      oneInchParser(42161),
    ),
    chains: [42161],
  },
  polygon1inch: {
    generator: new jsonGenericTokenListGenerator(
      "https://tokens.1inch.io/v1.2/137",
      oneInchParser(137),
    ),
    chains: [137],
  },
  celo: {
    generator: new jsonGenericTokenListGenerator(
      "https://celo-org.github.io/celo-token-list/celo.tokenlist.json",
    ),
    chains: [42220],
  },
  crodex: {
    generator: new jsonGenericTokenListGenerator(
      "https://swap.crodex.app/tokens.json",
    ),
    chains: [25],
  },
  cronaswap: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/cronaswap/default-token-list/main/assets/tokens/cronos.json",
    ),
    chains: [25],
  },
  beamswap: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/BeamSwap/beamswap-tokenlist/main/tokenlist.json",
    ),
    chains: [1287],
  },
  evmoswap: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/evmoswap/default-token-list/main/assets/tokens/evmos.json",
    ),
    chains: [9001],
  },
  spacefinance: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/SpaceFinance/default-token-list/main/spaceswap.tokenlist.json",
    ),
    chains: [9001],
  },
  kyberswapAurora: {
    generator: new jsonGenericTokenListGenerator(
      "https://ks-setting.kyberswap.com/api/v1/tokens?chainIds=1313161554&isWhitelisted=true&pageSize=100&page=1",
    ),
    chains: [1313161554],
  },
  kyberswapOasis: {
    generator: new jsonGenericTokenListGenerator(
      "https://ks-setting.kyberswap.com/api/v1/tokens?chainIds=42262&isWhitelisted=true&pageSize=100&page=1",
    ),
    chains: [42262],
  },
  kyberswapLinea: {
    generator: new jsonGenericTokenListGenerator(
      "https://ks-setting.kyberswap.com/api/v1/tokens?chainIds=59144&isWhitelisted=true&pageSize=100&page=1",
    ),
    chains: [59144],
  },
  klatyn1inch: {
    generator: new jsonGenericTokenListGenerator(
      "https://tokens.1inch.io/v1.2/8217",
      oneInchParser(8217),
    ),
    chains: [8217],
  },
  aurora1inch: {
    generator: new jsonGenericTokenListGenerator(
      "https://tokens.1inch.io/v1.2/1313161554",
      oneInchParser(1313161554),
    ),
    chains: [1313161554],
  },
  oolongswap: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/OolongSwap/boba-community-token-list/main/build/boba.tokenlist.json",
    ),
    chains: [288],
  },
  honeyswap: {
    generator: new jsonGenericTokenListGenerator(
      "https://unpkg.com/@1hive/default-token-list@latest/build/honeyswap-default.tokenlist.json",
    ),
    chains: [100],
  },
  cowswap: {
    generator: new jsonGenericTokenListGenerator(
      "https://files.cow.fi/tokens/CowSwap.json",
    ),
    chains: [100],
  },
  xDai1inch: {
    generator: new jsonGenericTokenListGenerator(
      "https://tokens.1inch.io/v1.2/100",
      (list: Record<string, any>) =>
        Object.entries(list)
          .map(([_, token]) => ({
            ...token,
            chainId: 100,
          }))
          .filter((t) => !t.name.includes("RealToken")),
    ),
    chains: [100],
  },
  wagyuswapapp: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/wagyuswapapp/wagyu-frontend/wag/src/config/constants/tokenLists/pancake-default.tokenlist.json",
    ),
    chains: [106],
  },
  astroswap: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/astroswapapp/astroswap-frontend/astro/src/config/constants/tokenLists/pancake-default.tokenlist.json",
    ),
    chains: [106],
  },
  wavelength: {
    generator: new jsonGenericTokenListGenerator(
      "https://raw.githubusercontent.com/wavelength-velas/assets/main/generated/wavelength.tokenslist.json",
    ),
    chains: [106],
  },
};
