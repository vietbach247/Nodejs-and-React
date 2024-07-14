import React, { FC, useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import { Link, useNavigate } from "react-router-dom";
import constant from "../../axios";

type Props = {};

const Dashboard: FC<Props> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập");
        navigate("/login", { replace: true });
        return;
      }
      try {
        const movieResponse = await constant.get("/movie", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [navigate]);

  const handleRemove = async (id: string | undefined) => {
    try {
      if (window.confirm("Are you sure?")) {
        await constant.delete(`/movie/${id}`);
        setMovies(movies.filter((movie) => movie._id !== id));
      }
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Movie Dashboard</h2>
      <h5>
        <Link to="/admin/movie-add">Add movie</Link>
      </h5>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Origin Name</th>
            <th>Type</th>
            <th>Poster URL</th>
            <th>Sub Docquyen</th>
            <th>Time</th>
            <th>Episode Current</th>
            <th>Quality</th>
            <th>Language</th>
            <th>Year</th>
            <th>YoutubeId</th>
            <th>Category</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie._id}</td>
              <td>{movie.name}</td>
              <td>{movie.slug}</td>
              <td>{movie.origin_name}</td>
              <td>{movie.type}</td>
              <td>{movie.poster_url}</td>
              <td>{movie.sub_docquyen ? "Yes" : "No"}</td>
              <td>{movie.time}</td>
              <td>{movie.episode_current}</td>
              <td>{movie.quality}</td>
              <td>{movie.lang}</td>
              <td>{movie.year}</td>
              <td>{movie.youtubeId}</td>
              <td>
                {movie.category
                  ?.map((cat) => (typeof cat === "string" ? cat : cat.name))
                  .join(", ")}
              </td>
              <td>
                {movie.country
                  ?.map((ctry) => (typeof ctry === "string" ? ctry : ctry.name))
                  .join(", ")}
              </td>
              <td>
                <Link to={`/admin/movie-edit/${movie._id}`}>Edit</Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
