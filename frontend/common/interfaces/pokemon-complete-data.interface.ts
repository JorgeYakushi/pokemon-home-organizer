export interface IPokemonCompleteData {
  boxes: { boxItems: IBoxItem[] };
  pokemonData: IPokemonData[];
}

export interface IBoxItem {
  pokemonGuid: string;
  box_id: number;
  spriteUrl: string;
  boxPosition: number;
  isCaught: boolean;
}

interface IPokemonData {
  pokemonGuid: string;
  pokemonDetail: IPokemonDetail;
}
export interface IPokemonDetail {
  speciesId: number;
  isShiny: boolean;
  formId: number;
  gender: number;
}
