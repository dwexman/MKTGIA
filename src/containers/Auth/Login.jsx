import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  useTheme
} from '@mui/material';
import './Login.css'; 
import logo from '../../assets/logoWhite.png'; 

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    // Usamos redirect:"manual" para que fetch no siga automáticamente el redirect.
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: new URLSearchParams({ username, password }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include', // Incluye cookies de sesión
      redirect: 'manual'
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers]);
    
    // Si el servidor devuelve un redirect (por ejemplo, 302), buscamos el header "Location".
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

    // En caso de que no se produzca un redirect (o no se pueda capturar), leemos el contenido para detectar patrones.
    const responseText = await response.text();
    // Si el HTML contiene el formulario de login (por ejemplo, el input con name="username"), asumimos que hubo un error.
    if (responseText.includes('name="username"')) {
      console.error("Error en el login: Usuario o clave incorrectos.");
      // Aquí podrías actualizar el estado para mostrar un mensaje en la UI.
    } else {
      // Si el HTML no parece ser la página de login, asumimos que se redireccionó a la cuenta.
      if (onLogin) onLogin();
      navigate('/inicio', { replace: true });
    }

  } catch (error) {
    console.error('Error en la conexión con el backend:', error);
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