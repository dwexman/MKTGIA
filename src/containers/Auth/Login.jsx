import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert
} from '@mui/material';
import './Login.css'; 
import logo from '../../assets/logoWhite.png'; 

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage('');
  const formData = new FormData(e.target);
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    // Usamos redirect:"manual" para que fetch no siga automáticamente el redirect.
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: new URLSearchParams({ username, password }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include',
      redirect: 'manual'
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers]);
    
    // Si el servidor devuelve un redirect, buscamos el header "Location".
    if (response.status >= 300 && response.status < 400) {
      const redirectUrl = response.headers.get('Location');
      console.log('Redirect URL:', redirectUrl);
      // Si redirectUrl no es nulo y no incluye "/login", asumimos que la autenticación fue exitosa.
      if (redirectUrl && !redirectUrl.includes('/login')) {
        if (onLogin) onLogin();
        navigate('/inicio', { replace: true });
        return;
      }
    }

    // En caso de que no se produzca un redirect, leemos el contenido para detectar patrones.
    const text = await response.text();
      if (text.includes('name="username"')) {
        setErrorMessage('Usuario o clave incorrectos.');
      } else {
        onLogin?.();
        navigate('/inicio', { replace: true });
      }

    } catch (err) {
      console.error(err);
      setErrorMessage('Error de conexión con el servidor.');
    }
  };


  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a1929 0%, #1a237e 100%)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Paper
        elevation={24}
        className="login-container"
        sx={{
          width: '100%',
          maxWidth: 450,
          p: 4,
          position: 'relative',
          borderRadius: '8px',
          zIndex: 2
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center' }}>
          <img 
            src={logo} 
            alt="MKTG AI Logo" 
            style={{ 
              width: '400px', 
              height: '280px',
              marginTop: '-50px',
              filter: 'drop-shadow(0 0 10px rgba(77, 171, 247, 0.5))'
            }}
          />
        </Box>

        
        <Typography variant="body1" className="subtitle">
        Accede a herramientas inteligentes para optimizar tu marketing digital.
        </Typography>

         {/* Alert de error si existe */}     
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              name="username"
              label="Usuario"
              variant="outlined"
              required
              className="login-input"
            />

            <TextField
              fullWidth
              name="password"
              label="Clave"
              type="password"
              variant="outlined"
              required
              className="login-input"
            />

            <Button
              type="submit"
              className="gradient-button"
              size="large"
              fullWidth
            >
              INICIAR SESIÓN
            </Button>
          </Stack>
        </Box>

        <Typography variant="caption" className="footer-text">
          © 2024 MKTG AI - Plataforma de Optimización Inteligente
        </Typography>
      </Paper>

      {/* Efectos de fondo */}
      <div className="background-effect"></div>
    </Box>
  );
};

export default Login;