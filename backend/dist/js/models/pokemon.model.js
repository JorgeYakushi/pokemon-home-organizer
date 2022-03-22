"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pokemonDetailSchema = new mongoose_1.Schema({
    speciesId: { type: Number, required: true },
    formId: { type: Number, required: true },
    gender: { type: Number, required: true },
    sprite: { type: String, required: true },
    isCaught: { type: Boolean, required: true },
    isShiny: { type: Boolean, required: true },
    hasChanged: { type: Boolean, required: true },
});
const pokemonDataSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    pokemonGuid: {
        type: String,
        required: true,
    },
    pokemonDetail: {
        type: pokemonDetailSchema,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("PokemonData", pokemonDataSchema);
