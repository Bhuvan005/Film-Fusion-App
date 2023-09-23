import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieDetails/>}/>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/Reviews/:movieId" element={<Reviews />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
);


reportWebVitals();
