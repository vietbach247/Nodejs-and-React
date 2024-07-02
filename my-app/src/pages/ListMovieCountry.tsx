import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../types/Movie";
import constant from "../axios";
import MovieCard from "../components/MovieCard/MovieItem";

const ListMovieByCountry: React.FC = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [countryName, setCountryName] = useState<string>("");

  useEffect(() => {
    const fetchMoviesByCountry = async () => {
      try {
        // Lấy thông tin quốc gia
        const countryResponse = await constant.get(
          `movie/country/${countryId}`
        );
        setCountryName(countryResponse.data.name);

        // Lấy danh sách phim dựa trên countryId
        const movieResponse = await constant.get(`/movie/country/${countryId}`);
        setMovies(movieResponse.data.data);
      } catch (error) {
        console.error("Error fetching movies by country:", error);
      }
    };

    fetchMoviesByCountry();
  }, [countryId]);

  return (
    <div>
      <h2>Danh sách phim theo quốc gia: {countryName}</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default ListMovieByCountry;
