import { Document } from "mongoose";

export interface IBoxItem {
  boxNumber: number;
  boxLocation: number;
  pokemonId: number | null;
  pokeballId: number | null;
  isShiny: boolean | null;
  regionCaughtId: number | null;
  gender: number | null;
  form: number | null;
  needsToEvolve: boolean | null;
  correctPokeball: boolean | null;
  stored: boolean | null;
  sprite?: string;
}
export interface IBox extends Document {
  //boxItems: IBoxItem[];
  number: number;
  name: string;
}
