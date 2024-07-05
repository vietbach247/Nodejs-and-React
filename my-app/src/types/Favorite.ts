import { Movie } from "./Movie";
import { User } from "./User";

export type Favorite = {
  _id?: string;
  user?: User | string;
  movies?: Movie[] | string[];
};
