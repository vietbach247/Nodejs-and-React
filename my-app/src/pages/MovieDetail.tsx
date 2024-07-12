import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import constant from "../axios";
import { Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard/MovieItem";
import { Container, Grid, Typography, Box } from "@mui/material";

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
    return <Typography align="center">Loading...</Typography>;
  }

  if (error || !movie) {
    return (
      <Typography align="center" color="error">
        {error || "Movie not found"}
      </Typography>
    );
  }

  const videoId = movie.youtubeId;
  const trailerId = movie.trailerId;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4">{movie.name}</Typography>
          <Typography variant="subtitle1">{movie.slug}</Typography>

          <Box my={2}>
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Box>
          </Box>
          <Box my={2}>
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                src={`https://www.youtube.com/embed/${trailerId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <MovieCard movie={movie} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetail;
