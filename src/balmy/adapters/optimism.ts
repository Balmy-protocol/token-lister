import { jsonGenericTokenListGenerator } from "./generics/jsonGenericAdapter";

const url =
  "https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json";

export class optimismTokenListGenerator extends jsonGenericTokenListGenerator {
  constructor() {
    super(url);
  }
}
