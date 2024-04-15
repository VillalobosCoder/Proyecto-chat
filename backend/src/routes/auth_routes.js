import { Router } from "express";
import { login, register, logout, profile, verifyToken } from "../controllers/auth_controller.js";
import { authRequiered } from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validatorMiddleware.js";
import {registerSchema, loginSchema} from "../schemas/auth_schemas.js";

const router = Router();

router.post("/register", validateSchema(registerSchema) ,register);
router.post("/login", validateSchema(loginSchema) ,login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequiered ,profile);

export default router;