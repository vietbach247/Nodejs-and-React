import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../types/Movie";
import constant from "../axios";
import MovieCard from "../components/MovieCard/MovieItem";

const ListMovieByCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        const categoryResponse = await constant.get(
          `movie/category/${categoryId}`
        );
        setCategoryName(categoryResponse.data.name);
        const movieResponse = await constant.get(
          `/movie/category/${categoryId}`
        );
        setMovies(movieResponse.data.data);
      } catch (error) {
        console.error("Error fetching movies by category:", error);
      }
    };

    fetchMoviesByCategory();
  }, [categoryId]);

  return (
    <div>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default ListMovieByCategory;
