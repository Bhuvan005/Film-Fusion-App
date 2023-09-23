import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './components/Layout';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';



function MovieDetails() {
  const [movies, setMovies] = useState(null);
  const[movie,setMovie]=useState();
  const[reviews,setReviews]=useState();

  useEffect(() => {
    axios.get('/api/movies') 
      .then((response) => {
        setMovies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, []);

  const getMovieData= async(movieId)=>{
    
    const response=await axios.get(`/api/movies/${movieId}`);

    const singleMovie =response.data;

    setMovies(singleMovie);

    setReviews(singleMovie.reviews);
  }

  if (!movies) {
    return  <div class="loader">
    <div class="loader-inner">
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
    </div>
  </div>
  }

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home movies={movies}/>}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default MovieDetails;
