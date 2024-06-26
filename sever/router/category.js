import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/category";

const categoryRouter = Router();

categoryRouter.get("/", getCategory);
categoryRouter.post("/", createCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.patch("/:id", updateCategory);

export default categoryRouter;
