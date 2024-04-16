import { Router } from "express";
import { getAllUsers } from "../controllers/user_controller.js";
import { authRequiered } from "../middlewares/validateToken.js";
const router = Router();

router.get("/allUsers/:id", authRequiered ,getAllUsers);

export default router;