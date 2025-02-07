import React, { useState } from 'react';

const MoviesSearchPagination = ({ onSearch, onPageChange }) => {
    const [search, setSearch] = useState('');

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher un film..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => onSearch(search)}>Rechercher</button>

            <select onChange={(e) => onPageChange(e.target.value)}>
                <option value="5">5 films</option>
                <option value="10">10 films</option>
                <option value="15">15 films</option>
                <option value="20">20 films</option>
            </select>
        </div>
    );
};

export default MoviesSearchPagination;
