import { ChainId, Chains } from "@balmy/sdk";
import { ITokenListGenerator, TokenData } from "../types";

interface MorphoGraphQLResponse {
  data: {
    vaults: {
      items: Array<{
        address: string;
        symbol: string;
        name: string;
        asset: {
          name: string;
          address: string;
        };
        chain: {
          id: number;
        };
      }>;
    };
  };
}

interface TokenListComplete {
  tokens: Array<{
    address: string;
    chainId: number;
    logoURI?: string;
  }>;
}

const chains = [Chains.BASE.chainId, Chains.ETHEREUM.chainId];

export class MorphoTokenListGenerator implements ITokenListGenerator {
  private tokenList: TokenData[];
  private completeTokenList: TokenListComplete['tokens'];
  
  
  constructor() {
    this.tokenList = [];
    this.completeTokenList = [];
  }

  private async fetchCompleteTokenList(): Promise<void> {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Balmy-protocol/token-lister/refs/heads/main/token-list.json');
      const data = await response.json() as TokenListComplete;
      this.completeTokenList = data.tokens;
    } catch (error) {
      console.error("Error fetching complete token list:", error);
      // Initialize with empty array instead of failing
      this.completeTokenList = [];
    }
  }

  private getLogoURI(assetAddress: string, chainId: number): string | undefined {
    if (!this.completeTokenList.length) {
      return undefined;
    }
    const token = this.completeTokenList.find(
      t => t.address.toLowerCase() === assetAddress.toLowerCase() && t.chainId === chainId
    );
    return token?.logoURI;
  }

  async fetchTokens(): Promise<void> {
    await this.fetchCompleteTokenList();
    const query = `
      query {
        vaults(first: 1000, skip: 0, where: { whitelisted: true }) {
          items {
            address
            symbol
            name
            asset {
              name
              address
            }
            chain {
              id
            }
          }
        }
      }
    `;

    try {
      const response = await fetch("https://blue-api.morpho.org/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = (await response.json()) as MorphoGraphQLResponse;

      if (data.data?.vaults?.items) {
        for (const vault of data.data.vaults.items) {
          if (chains.includes(vault.chain.id)) {
            this.tokenList.push({
              name: vault.name,
              symbol: vault.symbol,
              address: vault.address,
              decimals: 18,
              chainId: vault.chain.id,
              logoURI: this.getLogoURI(vault.asset.address, vault.chain.id),
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching Morpho tokens:", error);
    }
  }

  getTokenList(): TokenData[] {
    return this.tokenList;
  }

  getChains(): ChainId[] {
    return chains;
  }
}
