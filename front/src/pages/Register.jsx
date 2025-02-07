import React, { useState } from 'react';
import api from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            await api.post('/auth/register', { username, email, password });
            alert('Inscription réussie !');
            window.location.href = '/login';
        } catch (error) {
            setError("Erreur lors de l'inscription.");
        }
    };

    return (
        <div className="container">
            <h2>Inscription</h2>
            <input type="text" placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>S'inscrire</button>
            {error && <p className="alert">{error}</p>}
        </div>
    );
};

export default Register;
