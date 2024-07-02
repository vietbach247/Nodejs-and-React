import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovieByCategory,
  getMovieByCountry,
  getMovies,
  updateMovie,
} from "../controllers/movie";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovie);
movieRouter.get("/category/:categoryId", getMovieByCategory);
movieRouter.get("/country/:countryId", getMovieByCountry);
movieRouter.post("/", createMovie);
movieRouter.delete("/:id", deleteMovie);
movieRouter.put("/:id", updateMovie);

export default movieRouter;
