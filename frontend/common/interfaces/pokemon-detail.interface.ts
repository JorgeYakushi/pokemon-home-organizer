export interface IPokemonDetail {
  speciesId: number;
  formId: number;
  gender: number;
  sprite: string;
  isCaught: boolean;
  isShiny: boolean;
  hasChanged: boolean;
}

export interface IPokemonData {
  userId?: string;
  pokemonGuid: string;
  pokemonDetail: IPokemonDetail;
}

export const emptyPokemon: IPokemonData = {
  pokemonGuid: "",
  pokemonDetail: {
    speciesId: 0,
    formId: 0,
    gender: 0,
    sprite: "",
    isCaught: false,
    isShiny: false,
    hasChanged: false,
  },
};
