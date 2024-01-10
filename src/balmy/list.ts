import {
  balmyTokenListGenerator,
  defillamaTokenListGenerator,
  sushiswapTokenListGenerator,
  yearnTokenListGenerator,
} from "./adapters";
import { ITokenListGenerator } from "./types";

export const generators: Record<string, ITokenListGenerator> = {
  balmy: new balmyTokenListGenerator(),
  defillama: new defillamaTokenListGenerator(),
  sushiswap: new sushiswapTokenListGenerator(),
  yearn: new yearnTokenListGenerator(),
};
