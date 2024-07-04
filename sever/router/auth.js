import { Router } from "express";
import { getProfile, Login, logout, Register } from "../controllers/auth";
import { authentication } from "../middleware/authentication";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/profile", authentication, getProfile);
authRouter.post("/logout", authentication, logout);

export default authRouter;
