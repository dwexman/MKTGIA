import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Button, Typography, Tooltip } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import '../Comentarios/dashboard.css';

const Optimizar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://www.mrkt21.com/comentarios/dashboard/API/', {
          method: 'GET',
          credentials: 'include'
        });

        const data = await response.json();
        if (data.status !== 'success') {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
        navigate('/login', { replace: true });
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <Box className="dashboard-container">
      <Paper className="dashboard-paper">
        {/* Encabezado */}
        <Box className="header-section">
          <Typography variant="h3" className="username-text">
            Conecta tu cuenta de Facebook Business
          </Typography>
        </Box>

        {/* Mensaje explicativo */}
        <Box className="status-message">
          <Typography variant="h5" className="status-text">
            Conecta tu cuenta de Facebook Business para comenzar a optimizar tus presupuestos publicitarios.
          </Typography>
        </Box>

        {/* Sección de conexión */}
        <Box className="connection-section">
          <Box className="buttons-row">
            <Tooltip 
              title={
                <>
                  <Typography variant="body2" color="inherit">
                    Conecta tu cuenta de Facebook Business
                  </Typography>
                  <Typography variant="body2" color="inherit">
                    para acceder a herramientas avanzadas de optimización
                  </Typography>
                </>
              }
              arrow
            >
              <Button
                variant="contained"
                startIcon={<FacebookIcon />}
                className="facebook-btn"
                onClick={() => window.location.href = 'https://www.mrkt21.com/comentarios/connect_facebook_business'}
                size="large"
              >
                Conectar Facebook Business
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Optimizar;