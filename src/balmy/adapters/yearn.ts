import { ITokenListGenerator, TokenData } from "../types";

const url = "https://ydevmon.ycorpo.com/tokens/all";

export class yearnTokenListGenerator implements ITokenListGenerator {
  private tokenList: TokenData[];
  constructor() {
    this.tokenList = [];
  }
  async fetchTokens(): Promise<void> {
    const response: Record<string, any[]> = await fetch(url).then((res) =>
      res.json(),
    );
    for (const [chain, tokens] of Object.entries(response)) {
      for (const [_, data] of Object.entries(tokens)) {
        this.tokenList.push({
          name: data.name,
          decimals: data.decimals,
          symbol: data.symbol,
          chainID: Number(chain),
          address: data.address,
        });
      }
    }
  }

  getTokenList(): TokenData[] {
    return this.tokenList;
  }
}
