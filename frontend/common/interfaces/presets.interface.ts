export interface IPreset {
  name: string;
  data: IPokemonPreset[];
}

export interface IPokemonPreset {
  speciesId: number;
  formId: number;
  gender: number;
  sprite: string;
  isCaught: boolean;
  isShiny: boolean;
}
