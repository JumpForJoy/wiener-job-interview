export type ResourcesType =
  | "people"
  | "planets"
  | "films"
  | "species"
  | "vehicles"
  | "starships";

export type TFavorites = {
  id: number | string;
  name: string;
  resource: ResourcesType;
};

export type TCurrencySymbols = "GC" | "WP" | "PG" | "YC" | "NL";
