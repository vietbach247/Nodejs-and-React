import React, { FC, useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import MovieCard from "../../components/MovieCard/MovieItem";
import { Link } from "react-router-dom";
import constant from "../../axios";

type Props = {};

const HomePage: FC<Props> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await constant.get("/movie");
        const movieData = movieResponse.data.data;
        if (Array.isArray(movieData)) {
          setMovies(movieData);
        } else {
          console.error(
            "API returned unexpected movie data format:",
            movieData
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Thêm [] vào đây để useEffect chỉ chạy một lần

  return (
    <div className="container">
      <div className="row">
        {movies.length > 0 &&
          movies.map((movie) => (
            <div key={movie._id} className="col-md-4 mb-4">
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
