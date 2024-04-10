import React, { useState } from 'react';
import MovieDetails from './MovieDetails'; // MovieDetails 컴포넌트를 임포트합니다.
import { movies } from '../movies'; // movies 데이터를 임포트합니다. 경로는 실제 위치에 맞게 조정해주세요.

function MoviesList() {
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  return (
    <div className="movies-list">
      {movies.results.map((movie) => (
        <div
          key={movie.id}
          className="movie"
          onMouseEnter={() => setHoveredMovieId(movie.id)}
          onMouseLeave={() => setHoveredMovieId(null)}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.vote_average}</p>
            </div>
          {hoveredMovieId === movie.id && <MovieDetails movie={movie} />}
        </div>
      ))}
    </div>
  );
}

export default MoviesList;
