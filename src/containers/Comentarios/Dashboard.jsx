import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Button, Typography, Divider, Tooltip } from '@mui/material';
import ConnectedAccountsModal from './ConnectedAccountsModal';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './dashboard.css';

const API_BASE = import.meta.env.VITE_API_URL;


const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_BASE}/comentarios/comentarios_prompts/API/`, {
          method: 'GET',
          credentials: 'include'
        });

        const data = await response.json();
        console.log('Respuesta de comentarios Dashboard API:', data);

        if (data.status === 'success') {
          setUsername(data.username);
          setAccounts(data.accounts);
          console.log('Cuentas recibidas:', data.accounts);
        } else {
          // En caso de que no esté autenticado o haya otro error, se redirige a login.
          console.error('Mensaje de error:', data.message);
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error al obtener la información del Dashboard:', error);
      }
    };

    fetchDashboardData();
  }, [navigate]);


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
          <Typography variant="h5" className="connect-accounts-title">
            Conecta tus cuentas
          </Typography>
          
          <Box className="buttons-row">
            {/* Botón Facebook con Tooltip */}
            <Tooltip 
              title={
                <>
                  <Typography variant="body2" color="inherit">Conecta tu cuenta de Facebook</Typography>
                  <Typography variant="body2" color="inherit">para que podamos responder por ti</Typography>
                </>
              }
              arrow
            >
              <Button
                variant="contained"
                startIcon={<FacebookIcon />}
                className="facebook-btn"
                onClick={() => window.location.href = `${API_BASE}/comentarios/connect_facebook`}
              >
              Facebook
              </Button>
            </Tooltip>

            {/* Botón Instagram con Tooltip */}
            <Tooltip 
              title={
                <>
                  <Typography variant="body2" color="inherit">Conecta tu cuenta de Instagram</Typography>
                  <Typography variant="body2" color="inherit">para recibir notificaciones de comentarios</Typography>
                </>
              }
              arrow
            >
              <Button
                variant="contained"
                startIcon={<InstagramIcon />}
                className="instagram-btn"
                onClick={() => window.location.href = `${API_BASE}/comentarios/connect_instagram`}
              >
              Instagram
              </Button>
            </Tooltip>
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
      <ConnectedAccountsModal open={open} onClose={handleModalClose} accounts={accounts} />
    </Box>
  );
};

export default Dashboard;