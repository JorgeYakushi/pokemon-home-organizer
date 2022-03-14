import { Document } from "mongoose";

export interface IBoxPokemon {
  boxNumber: number;
  boxLocation: number;
  pokemonId: number;
  pokeballId: number;
  isShiny: boolean;
  regionCaughtId: number;
  gender: number;
  form: number;
  needsToEvolve: boolean;
  correctPokeball: boolean;
  stored: boolean;
}
