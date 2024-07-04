import { Router } from "express";
import movieRouter from "./movie";
import routerCountry from "./country";
import categoryRouter from "./category";
import authRouter from "./auth";

const router = Router();

router.use("/movie", movieRouter);
router.use("/country", routerCountry);
router.use("/category", categoryRouter);
router.use("/auth", authRouter);

export default router;
