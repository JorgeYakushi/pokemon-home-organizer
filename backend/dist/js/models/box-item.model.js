"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const boxItemSubSchema = new mongoose_1.Schema({
    pokemonGuid: { type: String, required: false },
    boxPosition: { type: Number, required: false },
});
const boxSchema = new mongoose_1.Schema({
    boxName: {
        type: String,
        required: true,
    },
    boxItems: {
        type: [boxItemSubSchema],
        required: true,
    },
}, { timestamps: true });
const userBoxesSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    boxes: {
        type: [boxSchema],
        required: true,
    },
});
exports.default = (0, mongoose_1.model)("UserBoxes", userBoxesSchema);
