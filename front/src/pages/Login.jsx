import React, { useState } from 'react';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.access_token);
            alert('Connexion réussie !');
            window.location.href = '/';
        } catch (error) {
            setError("Email ou mot de passe incorrect");
        }
    };

    return (
        <div className="container">
            <h2>Connexion</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Se Connecter</button>
            {error && <p className="alert">{error}</p>}
        </div>
    );
};

export default Login;
