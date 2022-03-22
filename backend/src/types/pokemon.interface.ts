import { Document } from "mongoose";

interface IPokemonDetail {
  speciesId: number;
  formId: number;
  gender: number;
  sprite: string;
  isCaught: boolean;
  isShiny: boolean;
  hasChanged: boolean;
}

export interface IPokemonData extends Document {
  userId: string;
  pokemonGuid: string;
  pokemonDetail: IPokemonDetail;
}
