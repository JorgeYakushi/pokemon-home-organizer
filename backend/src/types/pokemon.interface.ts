import { Document } from "mongoose";

interface IPokemon {
  speciesId: number;
  isShiny: boolean;
  formId: number;
  gender: number;
}

export interface IPokemonData extends Document {
  pokemonGuid: string;
  pokemonData: IPokemon;
}
