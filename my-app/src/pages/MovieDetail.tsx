import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import constant from "../axios";
import { Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard/MovieItem";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const response = await constant.get(`/movie/${id}`);
        const movieData = response.data.data;
        if (movieData && typeof movieData === "object") {
          setMovie(movieData as Movie);
        } else {
          setError("API returned unexpected data format");
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieById();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error || !movie) {
    return (
      <div className="text-center text-danger">
        {error || "Movie not found"}
      </div>
    );
  }

  const videoId = movie.youtubeId;

  return (
    <div className="row">
      <div key={movie._id} className="col-md-8 mb-4">
        <h2>{movie.name}</h2>
        <p>{movie.slug}</p>

        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <MovieCard movie={movie} />
      </div>
    </div>
  );
};

export default MovieDetail;
