import { model, Schema } from "mongoose";
import { IPokemonData } from "@/types/pokemon.interface";

const pokemonSchema: Schema = new Schema({
  speciesId: { type: Number, required: true },
  isShiny: { type: Boolean, required: true },
  formId: { type: Number, required: false },
  gender: { type: Number, required: false },
});

const pokemonDataSchema: Schema = new Schema(
  {
    userGuid: { type: String, required: true },
    pokemonGuid: {
      type: String,
      required: true,
    },
    pokemonData: {
      type: pokemonSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IPokemonData>("PokemonData", pokemonDataSchema);
