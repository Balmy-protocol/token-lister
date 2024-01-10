import {
  balmyTokenListGenerator,
  compoundTokenListGenerator,
  defillamaTokenListGenerator,
  optimismTokenListGenerator,
  sushiswapTokenListGenerator,
  yearnTokenListGenerator,
} from "./adapters";
import { ITokenListGenerator } from "./types";

export const generators: Record<string, ITokenListGenerator> = {
  balmy: new balmyTokenListGenerator(),
  defillama: new defillamaTokenListGenerator(),
  sushiswap: new sushiswapTokenListGenerator(),
  yearn: new yearnTokenListGenerator(),
  optimism: new optimismTokenListGenerator(),
  compound: new compoundTokenListGenerator()
};
