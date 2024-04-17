import { Router } from "express";
import { getAllUsers } from "../controllers/user_controller.js";
import { authRequiered } from "../middlewares/validateToken.js";
import { setPicture } from "../controllers/user_controller.js";
const router = Router();

router.get("/allUsers/:id", authRequiered ,getAllUsers);
router.post("/setPicture/:id", authRequiered, setPicture);

export default router;