import { Router } from "express";
import { getBoxData, upsertPokemon } from "@/controllers/box";

const router: Router = Router();

router.get("/boxes", getBoxData);

// router.post("/add-box", addBox);
router.put("/boxes/update", upsertPokemon);
export default router;
