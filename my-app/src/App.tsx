import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Movie } from "./types/Movie";
import "./App.scss";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import constant from "./axios";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./pages/admin/Dashboard";
import MovieDetail from "./pages/MovieDetail";
import MovieForm from "./pages/admin/MovieForm";
import { Category } from "./types/Category";
import { Country } from "./types/Country";
import Header from "./components/Header";
import ListMovieByCategory from "./pages/ListMovieByCategory";
import ListMovieByCountry from "./pages/ListMovieCountry";
import { User } from "./types/User";
import ProFilePage from "./pages/ProFilePage";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await constant.get("/movie");
        const categoryResponse = await constant.get("/category");
        const countryResponse = await constant.get("/country");

        const movieData = movieResponse.data.data;
        const categoryData = categoryResponse.data.movie;
        const countryData = countryResponse.data.country;

        if (Array.isArray(movieData)) {
          setMovies(movieData);
        } else {
          console.error(
            "API returned unexpected movie data format:",
            movieData
          );
        }

        if (Array.isArray(categoryData)) {
          setCategories(categoryData);
        } else {
          console.error(
            "API returned unexpected category data format:",
            categoryData
          );
        }

        if (Array.isArray(countryData)) {
          setCountries(countryData);
        } else {
          console.error(
            "API returned unexpected country data format:",
            countryData
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleMovieSubmit = async (movieData: Movie) => {
    try {
      if (movieData._id) {
        await constant.put(`/movie/${movieData._id}`, movieData);
      } else {
        await constant.post("/movie", movieData);
        setMovies([...movies, movieData]);
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  const handleRegister = async (userData: User) => {
    try {
      console.log(userData);
      const response = await constant.post("/auth/register", userData);
      navigate("/login");
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleLogin = async (userData: User) => {
    try {
      const response = await constant.post("/auth/login", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header categories={categories} countries={countries} />

      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<HomePage data={movies} />} />
          <Route path="/movie-detail/:id" element={<MovieDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProFilePage />} />
          <Route path="/a" element={<PrivateRouter />} />
          <Route path="/login" element={<LoginPage onUser={handleLogin} />} />
          <Route
            path="/register"
            element={<RegisterPage onUser={handleRegister} />}
          />
          <Route
            path="/category/:categoryId"
            element={<ListMovieByCategory />}
          />
          <Route path="/country/:countryId" element={<ListMovieByCountry />} />

          <Route path="*" element={<NotFound />} />

          <Route
            path="/admin"
            element={<Dashboard data={movies} remove={handleRemove} />}
          />
          <Route
            path="/admin/movie-add"
            element={<MovieForm onMovie={handleMovieSubmit} />}
          />
          <Route
            path="/admin/movie-edit/:id"
            element={<MovieForm onMovie={handleMovieSubmit} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
