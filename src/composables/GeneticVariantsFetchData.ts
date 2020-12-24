import { Significance, SignificanceParse, ExternalSource, HGVS, GeneticVariant } from '@/type/index';
import { useGeneticVariantsStore } from '@/composables/GeneticVariantsStore';

import json from '../json/variants.json';

const { push } = useGeneticVariantsStore();

async function getGenomVariants() {
  try {
    return json;
  } catch (e) {
    return e;
  }
}

function revisedRandId() {
  return Math.random().toString(36);
}

function significanceParse(value: string) {
  if (typeof value !== 'string') {
    return {
      color: '',
      text: '',
    };
  }
  const sign: SignificanceParse = {};

  if (value.includes('LIKELY_PATHOGENIC')) {
    sign.type = Significance.LIKELY_PATHOGENIC;
    sign.text = 'Вероятно патогенный';
    sign.color = '#FFC107';
    return sign;
  }
  if (value.includes('LIKELY_BENIGN')) {
    sign.type = Significance.LIKELY_BENIGN;
    sign.text = 'Вероятно доброкачественный';
    sign.color = '#82B1FF';
    return sign;
  }
  if (value.includes('PATHOGENIC')) {
    sign.type = Significance.PATHOGENIC;
    sign.text = 'Патогенный';
    sign.color = '#FF5252';
    return sign;
  }
  if (value.includes('BENIGN')) {
    sign.type = Significance.BENIGN;
    sign.text = 'Доброкачественный';
    sign.color = '#4CAF50';
    return sign;
  }
  sign.type = Significance.UNDEFINED;
  sign.text = 'Неопределенный';
  sign.color = '#78909C';
  return sign;
}

function genotypeParse(value: string) {
  return value.includes('HO') ? 'АА | аа' : 'Аа | аА';
}

async function parserResponseToVariants(response: Array<{ [x: string]: any }>) {
  if (!response) return [];

  for (const item of response) {
    const objHGVS: HGVS = {
      c: item.hgvs.c,
      g: item.hgvs.g,
      p: item.hgvs.p,
    };

    const arraySource: Array<ExternalSource> = [];

    for (const itemSource of item.externalSourceEntries) {
      arraySource.push({
        id: itemSource.id,
        link: itemSource.link,
        name: itemSource.database.name,
        version: itemSource.database.version,
        significance: significanceParse(itemSource.significance || ''),
      });
    }

    const objVariant: GeneticVariant = {
      id: revisedRandId(),
      name: item.alleleName,
      significance: significanceParse(item.significance || ''),
      genotype: genotypeParse(item.genotype),
      hgvs: objHGVS,
      externalSourceEntries: arraySource,
    };
    push(objVariant);
  }
}

export function useFetchData() {
  const getVariants = async () => {
    const res = await getGenomVariants();

    if (res.name === 'Error') return console.log(res);

    try {
      parserResponseToVariants(res.variants);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    getGenomVariants: getVariants,
  };
}
