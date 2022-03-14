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
exports.addBox = exports.getBoxes = void 0;
const box_model_1 = __importDefault(require("@/models/box.model"));
const getBoxes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boxes = yield box_model_1.default.find();
        res.status(200).json({ boxes });
    }
    catch (error) {
        throw error;
    }
});
exports.getBoxes = getBoxes;
const addBox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const box = new box_model_1.default({
            name: body.name,
            number: body.number,
        });
        const newBox = yield box.save();
        const allBoxes = yield box_model_1.default.find();
        res
            .status(201)
            .json({ message: "Box added", box: newBox, boxes: allBoxes });
    }
    catch (error) {
        throw error;
    }
});
exports.addBox = addBox;
