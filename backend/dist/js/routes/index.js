"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const box_1 = require("@/controllers/box");
const router = (0, express_1.Router)();
router.get("/boxes", box_1.getBoxData);
// router.post("/add-box", addBox);
router.put("/boxes/update", box_1.upsertPokemon);
exports.default = router;
