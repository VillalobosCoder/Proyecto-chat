import { Router } from "express";
import {addMessage, getAllMessages} from "../controllers/message_controller.js";
import { authRequiered } from "../middlewares/validateToken.js";

const router = Router();

router.post("/addmsg", authRequiered ,addMessage);
router.post("/getmsg", authRequiered ,getAllMessages);

export default router;