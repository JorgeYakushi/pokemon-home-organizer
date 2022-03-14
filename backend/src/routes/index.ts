import { Router } from "express";
import { getBoxes, addBox } from "@/controllers/box";

const router: Router = Router();

router.get("/boxes", getBoxes);

router.post("/add-box", addBox);

export default router;
