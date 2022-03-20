import { Router } from "express";
import { upsertBoxes } from "@/controllers/box";

const router: Router = Router();

// router.get("/boxes", getBoxes);

// router.post("/add-box", addBox);
router.put("/boxes/upd", upsertBoxes);
export default router;
