import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import instance, { getMovies } from "./axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Notfound from "./pages/Notfound";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";





function App() {

	
  
	return (
	  <>
		<Header />
		<main>
		  <Routes>
			<Route path="/" element={<HomePage  />} />
			<Route path="/home" element={<Navigate to="/" />} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="*" element={<Notfound />} />
		  </Routes>
		</main>
		<Footer />
	  </>
	);
}

export default App;
