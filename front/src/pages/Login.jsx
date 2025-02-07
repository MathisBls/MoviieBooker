import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      alert('Connexion réussie !');
      window.location.href = '/';
    } catch (error) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: 400,
        margin: '0 auto',
        marginTop: 5,
      }}
    >
      <Typography variant="h4" component="h2" sx={{ marginBottom: 3, color: '#333' }}>
        Connexion
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Mot de passe"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          marginTop: 2,
          background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
        }}
        onClick={handleLogin}
      >
        Se Connecter
      </Button>
      <Typography sx={{ marginTop: 2 }}>
        Vous n'avez pas de compte ?{' '}
        <p style={{ display: 'inline', color: '#ff416c', cursor: 'pointer' }} onClick={() => navigate('/register')}>
          Inscrivez-vous
        </p>
      </Typography>
      {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default Login;
