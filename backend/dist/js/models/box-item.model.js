"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const boxItemSchema = new mongoose_1.Schema({
    boxNumber: {
        type: Number,
        required: true,
    },
    boxLocation: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("BoxItem", boxItemSchema);
