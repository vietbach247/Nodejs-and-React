import { FC, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Movie } from "../../types/Movie";
import constant from "../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem("token");

  const toggleLike = async () => {
    try {
      if (!token) {
        console.error("Vui lòng đăng nhập");
        return;
      }

      const response = await constant.post(
        "/favorite",
        { movieId: movie._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.isLiked !== undefined) {
        setLiked(response.data.isLiked);
      } else {
        setLiked(!liked);
      }
    } catch (error) {
      console.error("Lỗi khi thích/phủ nhận phim:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link
        to={`/movie-detail/${movie._id}`}
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          alt={movie.name}
          height="400"
          image={movie.poster_url}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div">
            {movie.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.slug}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Thể loại:{" "}
            {movie.category
              ?.map((cat) => (typeof cat === "string" ? cat : cat.name))
              .join(", ")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quốc gia:{" "}
            {movie.country
              ?.map((ctry) => (typeof ctry === "string" ? ctry : ctry.name))
              .join(", ")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Thời lượng: {movie.time}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Năm sản xuất: {movie.year}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button size="small">Tìm hiểu thêm</Button>
        </CardActions>
      </Link>

      <Button size="small" onClick={toggleLike}>
        {liked ? (
          <FontAwesomeIcon icon={solidHeart} />
        ) : (
          <FontAwesomeIcon icon={regularHeart} />
        )}
      </Button>
    </Card>
  );
};

export default MovieCard;
