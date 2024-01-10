import { jsonGenericTokenListGenerator } from "./generics/jsonGenericAdapter";

const url = "https://token-list.sushi.com/";

export class sushiswapTokenListGenerator extends jsonGenericTokenListGenerator {
  constructor() {
    super(url);
  }
}
