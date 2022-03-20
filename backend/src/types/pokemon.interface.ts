import { Document } from "mongoose";

interface IPokemon {
  speciesId: number;
  isShiny: boolean;
  formId: number;
  gender: number;
}

export interface IPokemonData extends Document {
  userGuid: string;
  pokemonGuid: string;
  pokemonData: IPokemon;
}
