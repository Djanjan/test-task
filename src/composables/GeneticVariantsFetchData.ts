import {
  GeneticVariant,
  ExternalSource,
  HGVS,
  useGeneticVariantsStore,
} from "./GeneticVariantsStore";

const URL: string = "../json/variants.json";

import json from "../json/variants.json"

const { variants, create } = useGeneticVariantsStore();

interface IObject {
  [key: string]: any;
}

async function getGenomVariants() {
  try {
    return json
  } catch (e) {
    return e;
  }
}

async function parserResponseToVariants(response: Array<IObject>) {
  if (!response) return [];

  for (const item of response) {
    let objHGVS: HGVS = {
      c: item["hgvs"]["c"],
      g: item["hgvs"]["g"],
      p: item["hgvs"]["p"],
    };

    let arraySource: Array<ExternalSource> = [];

    for (const itemSource of item["externalSourceEntries"]) {
      arraySource.push({
        id: itemSource["id"],
        link: itemSource["link"],
        name: itemSource["database"]["name"],
        version: itemSource["database"]["version"],
        significance: itemSource["significance"],
      });
    }

    let objVariant: GeneticVariant = {
      id: item["oy"],
      name: item["alleleName"],
      significance: item["significance"],
      genotype: item["genotype"],
      hgvs: objHGVS,
      externalSourceEntries: arraySource,
    };
    create(objVariant)
  }
}

export function useFetchData() {
  const getVariants = async () => {
    let res = await getGenomVariants();

    if (res.name === "Error") return console.log(res);

    try {
      await parserResponseToVariants(res.variants);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    response: variants,
    getGenomVariants: getVariants,
  };
}
