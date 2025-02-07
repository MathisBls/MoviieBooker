import React from 'react';

const MoviesList = ({ movies, onReserve }) => {
    return (
        <div>
            <h2>Films Disponibles</h2>
            <div className="movies-container">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h3>{movie.title}</h3>
                        <p>{movie.release_date}</p>
                        <button onClick={() => onReserve(movie.id, movie.title)}>Réserver</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesList;
