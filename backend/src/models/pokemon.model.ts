import { model, Schema } from "mongoose";
import { IPokemonData } from "@/types/pokemon.interface";

const pokemonDetailSchema: Schema = new Schema({
  speciesId: { type: Number, required: true },
  formId: { type: Number, required: true },
  gender: { type: Number, required: true },
  sprite: { type: String, required: true },
  isCaught: { type: Boolean, required: true },
  isShiny: { type: Boolean, required: true },
  hasChanged: { type: Boolean, required: true },
});

const pokemonDataSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    pokemonGuid: {
      type: String,
      required: true,
    },
    pokemonDetail: {
      type: pokemonDetailSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IPokemonData>("PokemonData", pokemonDataSchema);
