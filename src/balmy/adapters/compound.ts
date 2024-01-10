import { jsonGenericTokenListGenerator } from "./generics/jsonGenericAdapter";

const url =
  "https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json";

export class compoundTokenListGenerator extends jsonGenericTokenListGenerator {
  constructor() {
    super(url);
  }
}
