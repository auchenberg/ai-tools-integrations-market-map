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
  link: string;
  description?: string;
  logo?: string;
  github?: string;
  x?: string;
  zoom?: string;
  hidden?: boolean;
}
