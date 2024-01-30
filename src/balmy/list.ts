import {
  defillamaTokenListGenerator,
  liquestTokenListGenerator,
  yearnTokenListGenerator,
} from "./adapters";
import { jsonGenericTokenListGenerator } from "./adapters/generics/jsonGenericAdapter";
import { ITokenListGenerator } from "./types";
import { odosParser, oneInchParser } from "./parsers";
export const generators: Record<string, ITokenListGenerator> = {
  balmy: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/Mean-Finance/token-list/main/mean-finance.tokenlist.json",
  ),
  compound: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
  ),
  defillama: new defillamaTokenListGenerator(),
  sushiswap: new jsonGenericTokenListGenerator("https://token-list.sushi.com/"),
  optimism: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json",
  ),
  yearn: new yearnTokenListGenerator(),
  liquest: new liquestTokenListGenerator(),
  canto: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/Canto-Network/list/main/lists/token-lists/mainnet/tokens.json",
  ),
  odosBaseGoerli: new jsonGenericTokenListGenerator(
    "https://api.odos.xyz/info/tokens/84531",
    odosParser(84531),
  ),
  odosBase: new jsonGenericTokenListGenerator(
    "https://api.odos.xyz/info/tokens/8453",
    odosParser(8453),
  ),
  odosPolygonZkEvm: new jsonGenericTokenListGenerator(
    "https://api.odos.xyz/info/tokens/1101",
    odosParser(1101),
  ),
  zkevmPolygonZkEvm: new jsonGenericTokenListGenerator(
    "https://api-polygon-tokens.polygon.technology/tokenlists/zkevmPopular.tokenlist.json",
  ),
  bsc1inch: new jsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/56",
    oneInchParser(56),
  ),
  fantom1inch: new jsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/250",
    oneInchParser(250),
  ),
  avalance1inch: new jsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/43114",
    oneInchParser(43114),
  ),
  arbitrum1inch: new jsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/42161",
    oneInchParser(42161),
  ),
  polygon1inch: new jsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/137",
    oneInchParser(137),
  ),
  celo: new jsonGenericTokenListGenerator(
    "https://celo-org.github.io/celo-token-list/celo.tokenlist.json",
  ),
  crodex: new jsonGenericTokenListGenerator(
    "https://swap.crodex.app/tokens.json",
  ),
  cronaswap: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/cronaswap/default-token-list/main/assets/tokens/cronos.json",
  ),
  beamswap: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/BeamSwap/beamswap-tokenlist/main/tokenlist.json",
  ),
  evmoswap: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/evmoswap/default-token-list/main/assets/tokens/evmos.json",
  ),
  spacefinance: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/SpaceFinance/default-token-list/main/spaceswap.tokenlist.json",
  ),
  kyberswapAurora: new jsonGenericTokenListGenerator(
    "https://ks-setting.kyberswap.com/api/v1/tokens?chainIds=1313161554&isWhitelisted=true&pageSize=100&page=1",
  ),
  kyberswapOasis: new jsonGenericTokenListGenerator(
    "https://ks-setting.kyberswap.com/api/v1/tokens?chainIds=42262&isWhitelisted=true&pageSize=100&page=1",
  ),
  kyberswapLinea: new jsonGenericTokenListGenerator(
    "https://ks-setting.kyberswap.com/api/v1/tokens?chainIds=59144&isWhitelisted=true&pageSize=100&page=1",
  ),
  klatyn1inch: new jsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/8217",
    oneInchParser(8217),
  ),
  aurora1inch: new jsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/1313161554",
    oneInchParser(1313161554),
  ),
  oolongswap: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/OolongSwap/boba-community-token-list/main/build/boba.tokenlist.json",
  ),
  honeyswap: new jsonGenericTokenListGenerator(
    "https://unpkg.com/@1hive/default-token-list@latest/build/honeyswap-default.tokenlist.json",
  ),
  cowswap: new jsonGenericTokenListGenerator(
    "https://files.cow.fi/tokens/CowSwap.json",
  ),
  xDai1inch: new jsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/100",
    (list: Record<string, any>) =>
      Object.entries(list)
        .map(([_, token]) => ({ ...token, chainId: 100 }))
        .filter((t) => !t.name.includes("RealToken")),
  ),
  wagyuswapapp: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/wagyuswapapp/wagyu-frontend/wag/src/config/constants/tokenLists/pancake-default.tokenlist.json",
  ),
  astroswap: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/astroswapapp/astroswap-frontend/astro/src/config/constants/tokenLists/pancake-default.tokenlist.json",
  ),
  wavelength: new jsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/wavelength-velas/assets/main/generated/wavelength.tokenslist.json",
  ),
};
