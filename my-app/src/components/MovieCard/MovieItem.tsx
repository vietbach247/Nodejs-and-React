import React, { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Movie } from "../../types/Movie";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={movie.name}
        height="400"
        image={movie.poster_url}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ width: "100%", height: "80px" }}
        >
          {movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.slug}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Thể loại: {movie.category?.join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quốc gia: {movie.country?.join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Thời lượng: {movie.time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Năm sản xuất: {movie.year}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small">Chia sẻ</Button>
        <Button size="small">Tìm hiểu thêm</Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
