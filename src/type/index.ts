export interface ComponentTab {
  title: string;
  component: string;
}

export enum Significance {
  'PATHOGENIC',
  'LIKELY_PATHOGENIC',
  'BENIGN',
  'LIKELY_BENIGN',
  'UNDEFINED',
  'UNCERTAIN',
}

export type SignificanceParse = {
  [key: string]: any;
  type?: Significance;
  text?: string;
  color?: string;
};

export type HGVS = {
  g: string;
  c: string;
  p: string;
};

export type ExternalSource = {
  [key: string]: any;
  id: string;
  link?: string;
  name?: string;
  significance?: SignificanceParse;
  version?: string;
};

export type GeneticVariant = {
  [key: string]: any;
  id: string;
  name?: string;
  significance?: SignificanceParse;
  genotype?: string;
  hgvs?: HGVS;
  externalSourceEntries?: Array<ExternalSource>;
};

export type Header = {
  name: string;
  columWidth?: string;
  value: string;
};
