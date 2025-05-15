import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';
import logo from '../../assets/logoWhite.png';


const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Al montar el componente, cargamos el username desde localStorage.
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    console.log('Username recuperado del localStorage:', storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Handler para actualizar el username y guardarlo en localStorage
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    localStorage.setItem('username', e.target.value);
    console.log('Nuevo username guardado:', e.target.value);
  };

  // Handler para actualizar el password (sin guardar en localStorage)
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  //Handler para controlar la visibilidad de la contraseña
  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage('');

    try {
      // Se utiliza el endpoint /login/API/ y se envían las credenciales
      const response = await fetch(`${BASE_URL}/login/API/`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      // Intentamos parsear la respuesta como JSON
      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (data.status === 'success') {
        onLogin && onLogin();
        localStorage.setItem('isAuthenticated', 'true'); 
        navigate('/home', { replace: true });
      } else {
        setErrorMessage(data.message);
      }
    } catch (err) {
      setErrorMessage('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
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
              value={username}
              className="login-input"
              onChange={handleUsernameChange}
            />

            <TextField
              fullWidth
              name="password"
              label="Clave"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              required
              className="login-input"
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              className="gradient-button"
              size="large"
              fullWidth
              disabled={loading}
            >
              {loading
                ? <CircularProgress size={24} sx={{ color: '#fff' }} />
                : 'Iniciar Sesión'
              }
            </Button>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                textAlign: 'center',
                mt: 1
              }}
            >
              Al iniciar sesión, aceptas nuestros {' '}
              <Link 
                to="/terminos-condiciones" 
                state={{ from: '/login' }} 
                style={{ 
                  color: '#4dabf7', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Términos y Condiciones
              </Link>
            </Typography>
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