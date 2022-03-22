import { Router } from "express";
import { getBoxData } from "@/controllers/box";

const router: Router = Router();

router.get("/boxes", getBoxData);

// router.post("/add-box", addBox);
//router.put("/boxes/update", upsertBoxes);
export default router;
