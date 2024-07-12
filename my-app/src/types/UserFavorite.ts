import { Movie } from "./Movie";
import { User } from "./User";

export type UserFavorite = {
  id?: string | undefined;
  userId: User | string;
  movieId: Movie | string;
};
