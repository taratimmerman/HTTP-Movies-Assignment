import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, deleteMovie }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovieClick = () => {
    deleteMovie(params.id);
   };

  const updateMovie = () => {
    push(`/update-movie/${params.id}`);
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <button onClick={updateMovie} className="edit-button">
        Edit
      </button>
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={deleteMovieClick}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
