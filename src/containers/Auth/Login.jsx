import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onLogin) onLogin();
    navigate('/inicio', { replace: true });
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
              label="Usuario"
              variant="outlined"
              required
              className="login-input"
            />

            <TextField
              fullWidth
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