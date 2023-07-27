import { Router } from "express";
import * as authController from "./controller/auth.js";
import auth from "../../middlewear/auth.js";
const router = Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/logout", auth(), authController.logout);
export default router;
