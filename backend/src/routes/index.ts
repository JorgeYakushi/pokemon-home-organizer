import { Router } from "express";
import { getBoxData, upsertBoxes } from "@/controllers/box";

const router: Router = Router();

router.get("/boxes", getBoxData);

// router.post("/add-box", addBox);
router.put("/boxes/update", upsertBoxes);
export default router;
