import { Address, ChainId, isSameAddress } from "@mean-finance/sdk";
import { isAddress } from "viem";
import { generators } from "./list";
import { TokenData } from "./types";
import * as fs from "fs";
import { unifyTokenData } from "./utils";

async function run(): Promise<any> {
  const promises: Promise<any>[] = [];
  for (const [_, generator] of Object.entries(generators)) {
    promises.push(generator.fetchTokens());
  }

  await Promise.all(promises);

  const tokensOcurrencies: Record<Address, Record<ChainId, number>> = {};
  const allTokens: TokenData[] = [];
  const result: Required<TokenData>[] = [];

  for (const [name, generator] of Object.entries(generators)) {
    const tokenList = generator.getTokenList();
    tokenList.forEach((token) => {
      const address = token.address.toLowerCase();
      if (isAddress(address) && !!token.chainID) {
        if (!tokensOcurrencies[address]) tokensOcurrencies[address] = {};
        tokensOcurrencies[address][token.chainID] =
          name === "balmy"
            ? Infinity
            : (tokensOcurrencies[address][token.chainID] ?? 0) + 1;
        allTokens.push(token);
      }
    });
  }

  for (const [address, ocurrenciesByChain] of Object.entries(
    tokensOcurrencies,
  )) {
    for (const [chain, ocurrencies] of Object.entries(ocurrenciesByChain))
      if (ocurrencies > Object.keys(generators).length * 0.2) {
        const token = unifyTokenData(
          allTokens.filter((t) => isSameAddress(t.address, address)),
          Number(chain),
        );
        if (token) result.push(token);
      }
  }

  console.log(result);
  fs.writeFileSync(
    "tokenList.json",
    JSON.stringify(
      {
        name: "Balmy Token List",
        description:
          "A curated list of tokens from all the token lists on Balmy",
        timestamp: new Date().toISOString(),
        tokens: result,
      },
      null,
      "\t",
    ),
  );
}

run();
