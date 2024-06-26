import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMovies = async () => {
  try {
    const response = await instance.get("/api/movie");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export default instance;
