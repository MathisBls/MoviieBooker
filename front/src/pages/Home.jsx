import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { isAuthenticated } from '../services/auth';
import MoviesList from '../components/MoviesList';
import MoviesSearchPagination from '../components/MoviesSearchPagination';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get('/movies', {
                    params: { search, page, sort: 'popularity.desc' },
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error("Erreur lors de la récupération des films", error);
            }
        };

        fetchMovies();
    }, [page, search]);

    const handleReserve = async (movieId, movieTitle) => {
        if (!isAuthenticated()) {
            alert("Vous devez être connecté pour réserver !");
            return;
        }

        const token = localStorage.getItem('token');
        const startTime = new Date().toISOString(); // Date actuelle en ISO

        try {
            const response = await api.post(
                '/reservations',
                { movieId, movieTitle, startTime },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(response.data.message);
        } catch (error) {
            console.error("Erreur lors de la réservation", error);
            alert("Impossible de réserver ce film.");
        }
    };

    return (
        <div>
            <h1>Liste des Films</h1>
            <MoviesSearchPagination
                onSearch={setSearch}
                onPageChange={(value) => setPage(parseInt(value))}
            />
            <MoviesList movies={movies} onReserve={handleReserve} />
        </div>
    );
};

export default Home;
