import React, { useState, useEffect } from 'react';
import { Box, Paper, Button, Typography, Divider } from '@mui/material';
import ConnectedAccountsModal from './ConnectedAccountsModal';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './dashboard.css';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Al montar el componente, leemos el username guardado en localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <Box className="dashboard-container">
      <Paper className="dashboard-paper">
        {/* Encabezado */}
        <Box className="header-section">
          <Typography variant="h4" className="welcome-text">
            Bienvenido,
          </Typography>
          <Typography variant="h3" className="username-text">
            {username}
          </Typography>
        </Box>

        {/* Mensaje de estado */}
        <Box className="status-message">
          <Typography variant="h5" className="status-text">
            Has iniciado sesión correctamente
          </Typography>
        </Box>

        {/* Sección de conexión */}
        <Box className="connection-section">
          {/* Facebook */}
          <Box className="connection-item">
            <Box className="connection-text">
              <Typography variant="h6">
                Conecta tu cuenta de Facebook
              </Typography>
              <Typography variant="h6">
                para que podamos responder por ti
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<FacebookIcon className="facebook-icon" />}
              className="facebook-btn"
              onClick={() => window.location.href = 'https://www.mrkt21.com/comentarios/connect_facebook'}
            >
              Conectar Facebook
            </Button>
          </Box>

          {/* Instagram */}
          <Box className="connection-item">
            <Box className="connection-text">
              <Typography variant="h6">
                Conecta tu cuenta de Instagram
              </Typography>
              <Typography variant="h6">
                para recibir notificaciones de comentarios
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<InstagramIcon className="instagram-icon" />}
              className="instagram-btn"
              onClick={() => window.location.href = 'https://www.mrkt21.com/comentarios/connect_instagram'}

            >
              Conectar Instagram
            </Button>
          </Box>
        </Box>

        {/* Separador */}
        <Divider className="custom-divider" />

        {/* Botones inferiores */}
        <Box className="bottom-buttons">
          <Button
            variant="outlined"
            startIcon={<AccountCircleIcon />}
            onClick={handleModalOpen}
            className="connected-accounts-btn"
          >
            Cuentas Conectadas
          </Button>
        </Box>
      </Paper>
      <ConnectedAccountsModal open={open} onClose={handleModalClose} />
    </Box>
  );
};

export default Dashboard;