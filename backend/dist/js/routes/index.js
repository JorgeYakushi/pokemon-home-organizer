"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const box_1 = require("@/controllers/box");
const router = (0, express_1.Router)();
router.get("/boxes", box_1.getBoxes);
router.post("/add-box", box_1.addBox);
exports.default = router;
