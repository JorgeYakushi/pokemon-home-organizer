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
    speciesId: 1,
    formId: 1,
    gender: 0,
    sprite: "poke_capture_0001_000_mf_n_00000000_f_n.png",
    isCaught: false,
    isShiny: false,
    hasChanged: false,
  },
};
