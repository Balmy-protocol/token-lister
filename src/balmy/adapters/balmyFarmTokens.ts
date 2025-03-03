import { buildSDK, ChainId } from "@balmy/sdk";
import { ITokenListGenerator, TokenData } from "../types";

export class BalmyFarmTokenListGenerator implements ITokenListGenerator {
  private tokenList: TokenData[];
  private chains: ChainId[];
  constructor() {
    this.tokenList = [];
    this.chains = [];
  }
  async fetchTokens(): Promise<void> {
    const sdk = buildSDK();
    const allStrategies = await sdk.earnService.getSupportedStrategies();

    Object.entries(allStrategies).forEach(([chainId, strategies]) => {
      strategies.forEach((strategy) => {
        strategy.depositTokens
          .filter((token) => token.type === "farm")
          .forEach((token) => {
            this.tokenList.push({
              name: token.name,
              decimals: token.decimals,
              symbol: token.symbol,
              chainId: Number(chainId),
              address: token.address,
            });
          });
      });
    });

    this.chains = Object.keys(allStrategies).map(Number);
  }

  getTokenList(): TokenData[] {
    return this.tokenList;
  }

  getChains(): ChainId[] {
    return this.chains;
  }
}
