import { jsonGenericTokenListGenerator } from "./generics/jsonGenericAdapter";

const url =
  "https://raw.githubusercontent.com/Mean-Finance/token-list/main/mean-finance.tokenlist.json";

export class balmyTokenListGenerator extends jsonGenericTokenListGenerator {
  constructor() {
    super(url);
  }
}
