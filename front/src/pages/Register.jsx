import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { username, email, password });
      alert('Inscription réussie !');
      window.location.href = '/login';
    } catch (error) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: 400,
        margin: '0 auto',
        marginTop: 5,
      }}
    >
      <Typography variant="h4" component="h2" sx={{ marginBottom: 3, color: '#333' }}>
        Inscription
      </Typography>
      <TextField
        label="Nom d'utilisateur"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setUsername(e.target.value)}
      />
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
        onClick={handleRegister}
      >
        S'inscrire
      </Button>
      <Typography sx={{ marginTop: 2 }}>
        Vous avez déjà un compte ?{' '}
        <p style={{ display: 'inline', color: '#ff416c', cursor: 'pointer' }} onClick={() => navigate('/login')}>
          Connectez-vous
        </p>
      </Typography>
      {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default Register;
