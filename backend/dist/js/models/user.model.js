"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    displayName: { type: String, required: true },
    googleId: { type: String, required: false },
});
userSchema.plugin(passport_local_mongoose_1.default);
exports.User = (0, mongoose_1.model)("User", userSchema);
