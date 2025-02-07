import React from 'react';

const MoviesList = ({ movies, onReserve, reservedMovies }) => {
    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>🎬 Films Disponibles</h2>
            <div className="movies-container">
                {movies.map((movie) => {
                    const isReserved = reservedMovies.includes(movie.id);

                    return (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                            <p>📅 {movie.release_date}</p>
                            <button
                                className={isReserved ? 'disabled' : ''}
                                onClick={() => !isReserved && onReserve(movie.id, movie.title)}
                                disabled={isReserved}
                            >
                                {isReserved ? 'Déjà réservé' : 'Réserver'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MoviesList;
