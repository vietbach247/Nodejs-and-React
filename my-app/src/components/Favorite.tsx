import React, { useEffect, useState } from "react";
import { Favorite } from "../types/Favorite";
import constant from "../axios";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Vui lòng đăng nhập");
          return;
        }

        const response = await constant.get<Favorite[]>("/favorite", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        // Handle fetch error
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Các phim yêu thích của bạn</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite._id}>
              Favorite ID: {favorite._id}, User:{" "}
              {typeof favorite.user === "object"
                ? favorite.user.name
                : favorite.user}{" "}
              , Movies:{" "}
              {favorite.movies?.map((movie) => (
                <span key={typeof movie === "object" ? movie._id : movie}>
                  {typeof movie === "object" ? movie.name : movie}{" "}
                </span>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>Không tìm thấy phim yêu thích.</p>
      )}
    </div>
  );
};

export default FavoritesList;
