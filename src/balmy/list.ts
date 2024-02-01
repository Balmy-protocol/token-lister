import {
  defillamaTokenListGenerator,
  liquestTokenListGenerator,
  yearnTokenListGenerator,
} from "./adapters";
import { JsonGenericTokenListGenerator } from "./adapters/generics/json-generic-adapter";
import { ITokenListGenerator } from "./types";
import { odosParser, oneInchParser } from "./parsers";
export const generators: Record<string, ITokenListGenerator> = {
  balmy: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/Mean-Finance/token-list/main/mean-finance.tokenlist.json",
  ),
  compound: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
  ),
  defillama: new defillamaTokenListGenerator(),
  sushiswap: new JsonGenericTokenListGenerator("https://token-list.sushi.com/"),
  optimism: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json",
  ),
  yearn: new yearnTokenListGenerator(),
  liquest: new liquestTokenListGenerator(),
  canto: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/Canto-Network/list/main/lists/token-lists/mainnet/tokens.json",
  ),
  odosBaseGoerli: new JsonGenericTokenListGenerator(
    "https://api.odos.xyz/info/tokens/84531",
    odosParser(84531),
  ),
  odosBase: new JsonGenericTokenListGenerator(
    "https://api.odos.xyz/info/tokens/8453",
    odosParser(8453),
  ),
  odosPolygonZkEvm: new JsonGenericTokenListGenerator(
    "https://api.odos.xyz/info/tokens/1101",
    odosParser(1101),
  ),
  zkevmPolygonZkEvm: new JsonGenericTokenListGenerator(
    "https://api-polygon-tokens.polygon.technology/tokenlists/zkevmPopular.tokenlist.json",
  ),
  bsc1inch: new JsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/56",
    oneInchParser(56),
  ),
  fantom1inch: new JsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/250",
    oneInchParser(250),
  ),
  avalance1inch: new JsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/43114",
    oneInchParser(43114),
  ),
  arbitrum1inch: new JsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/42161",
    oneInchParser(42161),
  ),
  polygon1inch: new JsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/137",
    oneInchParser(137),
  ),
  celo: new JsonGenericTokenListGenerator(
    "https://celo-org.github.io/celo-token-list/celo.tokenlist.json",
  ),
  crodex: new JsonGenericTokenListGenerator(
    "https://swap.crodex.app/tokens.json",
  ),
  cronaswap: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/cronaswap/default-token-list/main/assets/tokens/cronos.json",
  ),
  beamswap: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/BeamSwap/beamswap-tokenlist/main/tokenlist.json",
  ),
  evmoswap: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/evmoswap/default-token-list/main/assets/tokens/evmos.json",
  ),
  spacefinance: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/SpaceFinance/default-token-list/main/spaceswap.tokenlist.json",
  ),
  kyberswapAurora: new JsonGenericTokenListGenerator(
    "https://ks-setting.kyberswap.com/api/v1/tokens?chainIds=1313161554&isWhitelisted=true&pageSize=100&page=1",
  ),
  kyberswapOasis: new JsonGenericTokenListGenerator(
    "https://ks-setting.kyberswap.com/api/v1/tokens?chainIds=42262&isWhitelisted=true&pageSize=100&page=1",
  ),
  kyberswapLinea: new JsonGenericTokenListGenerator(
    "https://ks-setting.kyberswap.com/api/v1/tokens?chainIds=59144&isWhitelisted=true&pageSize=100&page=1",
  ),
  klatyn1inch: new JsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/8217",
    oneInchParser(8217),
  ),
  aurora1inch: new JsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/1313161554",
    oneInchParser(1313161554),
  ),
  oolongswap: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/OolongSwap/boba-community-token-list/main/build/boba.tokenlist.json",
  ),
  honeyswap: new JsonGenericTokenListGenerator(
    "https://unpkg.com/@1hive/default-token-list@latest/build/honeyswap-default.tokenlist.json",
  ),
  cowswap: new JsonGenericTokenListGenerator(
    "https://files.cow.fi/tokens/CowSwap.json",
  ),
  xDai1inch: new JsonGenericTokenListGenerator(
    "https://tokens.1inch.io/v1.2/100",
    (list: Record<string, any>) =>
      Object.entries(list)
        .map(([_, token]) => ({ ...token, chainId: 100 }))
        .filter((t) => !t.name.includes("RealToken")),
  ),
  wagyuswapapp: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/wagyuswapapp/wagyu-frontend/wag/src/config/constants/tokenLists/pancake-default.tokenlist.json",
  ),
  astroswap: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/astroswapapp/astroswap-frontend/astro/src/config/constants/tokenLists/pancake-default.tokenlist.json",
  ),
  wavelength: new JsonGenericTokenListGenerator(
    "https://raw.githubusercontent.com/wavelength-velas/assets/main/generated/wavelength.tokenslist.json",
  ),
};
