import express from "express";

import AuthController from "../controllers/auth.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.registerUser);
router.post("/login", jsonParser, AuthController.loginUser);
router.get("/logout", authMiddleware, AuthController.logoutUser);

export default router;
