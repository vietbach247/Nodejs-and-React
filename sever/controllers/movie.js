import { movieValidate, updateMovieValidate } from "../validations/movie";

import Movie from "../models/Movie";

export const createMovie = async (req, res, next) => {
  const { error } = movieValidate.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const data = await Movie.create(req.body);
    return res
      .status(201)
      .json({ message: "Movie created successfully", data });
  } catch (error) {
    next(error);
  }
};

export const getMovies = async (req, res, next) => {
  try {
    const data = await Movie.find();
    return res.status(200).json({ message: "Get movie successfully", data });
  } catch (error) {
    next(error);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const data = await Movie.findById(req.params.id);
    return res.status(200).json({ message: "Get movie successfully", data });
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (req, res, next) => {
  const { error } = updateMovieValidate.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const data = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({ message: "Update movie successfully", data });
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const data = await Movie.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Delete movie successfully", data });
  } catch (error) {
    next(error);
  }
};
