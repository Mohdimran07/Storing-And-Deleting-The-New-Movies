import React, { useEffect, useState, useCallback } from "react";

import AddMovie from "./components/AddMovie";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, SetError] = useState(null);



  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    SetError(null);
    try {
      const response = await fetch("https://react-http-d1c7e-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new Error("Something went wrong!...Retyring");
      }

      const data = await response.json();
      
      const loadedMovies = [];

      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

     
      setMovies(loadedMovies);
    } catch (error) {
      SetError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  function cancelHandler(error){
    SetError(null)
  }

  async function addMovieHandler(movie){
    const response = await fetch('https://react-http-d1c7e-default-rtdb.firebaseio.com/movies.json',{
      method : 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data)
  }



  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies}></MoviesList>;
  }
  if (error) {
    <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie  onAddMovie={addMovieHandler}/>
        
      </section>
      
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button><br></br><br></br>
        <button onClick={cancelHandler}>Cancel</button>
      </section>
      {/* <section>
        <MoviesList />
      </section> */}
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
