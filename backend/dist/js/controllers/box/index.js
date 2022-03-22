"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertPokemon = exports.createBoxes = exports.getBoxData = void 0;
const box_item_model_1 = __importDefault(require("@/models/box-item.model"));
const pokemon_model_1 = __importDefault(require("@/models/pokemon.model"));
const uuid_1 = require("uuid");
const getBoxData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query;
        const boxData = yield box_item_model_1.default.findOne(userId);
        const pokemonData = yield pokemon_model_1.default.find(userId);
        res.status(200).json(Object.assign(Object.assign({}, userId), { boxData, pokemonData }));
    }
    catch (error) {
        throw error;
    }
});
exports.getBoxData = getBoxData;
const createBoxes = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let boxes = [];
        for (let i = 0; i < 200; i++) {
            let boxName = `Box ${i + 1}`;
            let boxItems = [];
            for (let j = 0; j < 30; j++) {
                let boxItem = {
                    pokemonGuid: (0, uuid_1.v1)(),
                    boxPosition: j + 1,
                };
                boxItems.push(boxItem);
            }
            let box = {
                boxName,
                boxItems,
            };
            boxes.push(box);
        }
        const body = {
            userId,
            boxes,
        };
        yield box_item_model_1.default.create(body);
    }
    catch (error) {
        throw error;
    }
});
exports.createBoxes = createBoxes;
const upsertPokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pokemonData = req.body.pokemonData;
        let bulkData = pokemonData.map(function (data) {
            return {
                updateOne: {
                    filter: { pokemonGuid: data.pokemonGuid },
                    update: { $set: data },
                    upsert: true,
                },
            };
        });
        yield pokemon_model_1.default.bulkWrite(bulkData);
        res.status(200).json({
            message: "updated boxes",
        });
    }
    catch (error) {
        throw error;
    }
});
exports.upsertPokemon = upsertPokemon;
