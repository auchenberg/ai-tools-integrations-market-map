export interface MarketMapData {
  title: {
    heading: string;
    subtitle: string;
  };
  layers: Layer[];
}

export interface Layer {
  number: number;
  name: string;
  description: string;
  sections: Section[];
}

export interface Section {
  name: string;
  description: string;
  companies: Company[];
}

export interface Company {
  name: string;
  description?: string;
  logo?: string;
  link?: string;
  github?: string;
  x?: string;
  zoom?: string;
  hidden?: boolean;
}
