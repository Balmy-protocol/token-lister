import { ITokenListGenerator, TokenData } from "../../types";

export class jsonGenericTokenListGenerator implements ITokenListGenerator {
  private tokenList: TokenData[];
  private url: string;
  constructor(url: string) {
    this.tokenList = [];
    this.url = url;
  }
  async fetchTokens(): Promise<void> {
    const response = await fetch(this.url).then((res) => res.json());
    for (const token of response.tokens) {
      this.tokenList.push({
        name: token.name,
        symbol: token.symbol,
        logoURI: token.logoURI,
        chainID: token.chainId,
        decimals: token.decimals,
        address: token.address,
      });
    }
  }

  getTokenList(): TokenData[] {
    return this.tokenList;
  }
}
