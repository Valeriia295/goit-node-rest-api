import express from "express";
import {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import upload from "../middlewares/avatarUpload.js";
import { registerSchema } from "../schemas/registerSchema.js";
import { emailSchema } from "../schemas/emailSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

authRouter.post("/login", validateBody(registerSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default authRouter;
