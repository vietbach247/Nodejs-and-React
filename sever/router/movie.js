import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../controllers/movie";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovie);
movieRouter.post("/", createMovie);
movieRouter.delete("/:id", deleteMovie);
movieRouter.patch("/:id", updateMovie);

export default movieRouter;
