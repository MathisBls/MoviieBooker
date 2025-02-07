import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { isAuthenticated } from '../services/auth';
import MoviesList from '../components/MoviesList';
import MoviesSearchPagination from '../components/MoviesSearchPagination';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [reservedMovies, setReservedMovies] = useState([]);

    const navigate = useNavigate();

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

        const fetchReservedMovies = async () => {
            if (isAuthenticated()) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await api.get('/reservations', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const reservedIds = response.data.map((res) => res.movie_id);
                    setReservedMovies(reservedIds);
                } catch (error) {
                    console.error("Erreur lors de la récupération des réservations", error);
                }
            }
        };

        fetchMovies();
        fetchReservedMovies();
    }, [page, search]);

    const handleReserve = async (movieId, movieTitle) => {
        if (!isAuthenticated()) {
            alert("Vous devez être connecté pour réserver !");
            navigate('/login');
            return;
        }

        const token = localStorage.getItem('token');
        const startTime = new Date().toISOString();

        try {
            const response = await api.post(
                '/reservations',
                { movieId, movieTitle, startTime },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(response.data.message);
            setReservedMovies([...reservedMovies, movieId]);
        } catch (error) {
            console.error("Erreur lors de la réservation", error);
            alert("Impossible de réserver ce film. (2 heures d'intervalles minimum)");
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Liste des Films</h1>
            <MoviesSearchPagination
                onSearch={setSearch}
                onPageChange={(value) => setPage(parseInt(value))}
            />
            <MoviesList movies={movies} reservedMovies={reservedMovies} onReserve={handleReserve} />
        </div>
    );
};

export default Home;
