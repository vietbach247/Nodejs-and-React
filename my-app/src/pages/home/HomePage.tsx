import React, { FC } from "react";
import { Movie } from "../../types/Movie";
import MovieCard from "../../components/MovieCard/MovieItem";

type Props = {
  data: Movie[];
};

const HomePage: FC<Props> = ({ data }) => {
  return (
    <div className="container">
      <div className="row">
        {data.length > 0 &&
          data.map((movie) => (
            <div key={movie._id} className="col-md-4 mb-4">
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
