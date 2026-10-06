import express from "express";
import { register, login, getMyProfile, verifyEmail, forgotPassword, resetPassword } from "../controllers/auth.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);


authRouter.get("/me", protect, getMyProfile);
authRouter.post("/verify-email", verifyEmail);

authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/reset-password", resetPassword);

export default authRouter;