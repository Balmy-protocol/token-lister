import { Address, ChainId, isSameAddress } from "@mean-finance/sdk";
import { isAddress } from "viem";
import { generators } from "./list";
import { FullTokenData, TokenData } from "./types";
import * as fs from "fs";
import { unifyTokenData } from "./utils";

const APPEARANCES_RATIO = 0.4;

async function run(): Promise<any> {
  const promises: Promise<any>[] = [];
  for (const [_, generator] of Object.entries(generators)) {
    promises.push(generator.generator.fetchTokens());
  }

  await Promise.all(promises);

  const tokensOcurrencies: Record<
    Address,
    Record<ChainId, { ocurrencies: number; providers: string[] }>
  > = {};
  const allTokens: TokenData[] = [];
  const filteredList: Required<TokenData>[] = [];
  const completeList: Required<FullTokenData>[] = [];

  for (const [name, generator] of Object.entries(generators).sort(
    ([, g1], [, g2]) => (g2.priority ?? 1) - (g1.priority ?? 1),
  )) {
    const tokenList = generator.generator.getTokenList();
    tokenList.forEach((token) => {
      if (isAddress(token.address) && !!token.chainID) {
        const address = token.address.toLowerCase();
        if (!tokensOcurrencies[address]) tokensOcurrencies[address] = {};
        if (!tokensOcurrencies[address][token.chainID])
          tokensOcurrencies[address][token.chainID] = {
            ocurrencies: 0,
            providers: [],
          };
        tokensOcurrencies[address][token.chainID].providers.push(name);
        tokensOcurrencies[address][token.chainID].ocurrencies +=
          generator.priority ?? 1;
        allTokens.push(token);
      }
    });
  }

  for (const [address, ocurrenciesByChain] of Object.entries(
    tokensOcurrencies,
  )) {
    for (const [chain, ocurrencies] of Object.entries(ocurrenciesByChain)) {
      const chainID = Number(chain);
      const numbersOfGeneratorsForSpecificChain = Object.values(
        generators,
      ).filter((generator) =>
        generator.generator.getChains().includes(chainID),
      ).length;
      const token = unifyTokenData(
        allTokens.filter(
          (t) => isSameAddress(t.address, address) && t.chainID == chainID,
        ),
        chainID,
      );
      if (token) {
        completeList.push({ ...token, providers: ocurrencies.providers });
        if (
          ocurrencies.ocurrencies >
          numbersOfGeneratorsForSpecificChain * APPEARANCES_RATIO
        ) {
          filteredList.push(token);
        }
      }
    }
  }

  console.log("Token list size: ", filteredList.length);
  saveTokenList(
    filteredList,
    "token-list.json",
    "Balmy Token List",
    "A curated list of tokens from all the token lists on Balmy",
  );
  console.log("Complete Token list size: ", allTokens.length);
  saveTokenList(
    completeList,
    "token-list-complete.json",
    "Balmy Token List - complete version",
    "A list of tokens from all the token lists on Balmy",
  );
}

function saveTokenList(
  tokens: TokenData[] | FullTokenData[],
  fileName: string,
  name: string,
  description: string,
) {
  fs.writeFileSync(
    fileName,
    JSON.stringify(
      {
        name,
        description,
        timestamp: new Date().toISOString(),
        tokens: tokens.sort((a, b) => {
          if (a.chainID !== b.chainID) {
            return a.chainID - b.chainID;
          } else {
            return a.address
              .toLowerCase()
              .localeCompare(b.address.toLowerCase());
          }
        }),
      },
      null,
      2,
    ),
  );
}

run();
