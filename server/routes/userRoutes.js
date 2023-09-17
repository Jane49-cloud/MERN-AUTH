import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  updateUserProfile,
  loginUser,
  registerUser,
  LogoutUser,
} from "../controllers/user.js";

const router = express.Router();
router.post("/", authUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", LogoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
