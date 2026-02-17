import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../middleware/auth.validation.js";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);

export default router;