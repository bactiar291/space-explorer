export type CosmicKind =
  | "event"
  | "galaxy"
  | "star"
  | "planet"
  | "dwarf"
  | "moon"
  | "nebula"
  | "black-hole";

export type CosmicObject = {
  slug: string;
  name: string;
  group: string;
  kind: CosmicKind;
  region: string;
  distance: string;
  scale: string;
  color: string;
  color2: string;
  summary: string;
  easy: string;
  facts: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
};
