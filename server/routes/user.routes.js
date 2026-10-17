import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getPublicProfile, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/upload.middleware.js";

const userRouter = express.Router();

userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/profile", protect, upload.single("profilePicture"), updateUserProfile);
userRouter.get("/public/:id", getPublicProfile);

export default userRouter;