import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import constant from "../axios";
import { Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard/MovieItem";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const response = await constant.get(`/movie/${id}`);
        const movieData = response.data.data;
        if (movieData && typeof movieData === "object") {
          setMovie(movieData as Movie);
        } else {
          console.error("API returned unexpected data format:", movieData);
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieById();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div key={movie._id} className="col-md-4 mb-4">
      <MovieCard movie={movie} />
    </div>
  );
};

export default MovieDetail;
