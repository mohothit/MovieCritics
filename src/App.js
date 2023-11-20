import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/reviews';
import NotFound from './components/notFound/notFound';


function App() {
  //Calling endpoint to return array of movie data
  const [movies,setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);



  const getMovies = async() => {
  try{
  
      const response = await api.get("/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);
      
  }
  catch(err){
    console.log(err);
  }
}


const getMovieData = async (movieId) => {
     
  try 
  {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviews);
      

  } 
  catch (error) 
  {
    console.error(error);
  }

}

  //When the app component loads, get movies should be running in the bg while it app loads
  useEffect(()=>{
    getMovies();
  },[]);  //side effect, while app loads. [] argument is the optional dep array

  
return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path = "/" element = {<Layout/>}>
          <Route path = "/" element = {<Home movies={movies}/>}/>
          <Route path = "/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path = "/Reviews/:movieId" element= {<Reviews getMovieData={getMovieData} movie = {movie} reviews={reviews} setReviews={setReviews}/>}></Route>
          <Route path = "*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>
      
    </div>
  );
}

export default App;
