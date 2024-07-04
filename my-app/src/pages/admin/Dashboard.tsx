import React, { FC } from "react";
import { Movie } from "../../types/Movie";
import { Link } from "react-router-dom";

type Props = {
  data: Movie[];
  remove: (id: string | undefined) => void;
};

const Dashboard: FC<Props> = ({ data, remove }) => {
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
          {data.map((movie) => (
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
                  onClick={() => remove(movie._id)}
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
