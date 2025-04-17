import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Button, Typography, Tooltip } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import './optimizar.css';

const Optimizar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          'https://www.mrkt21.com/comentarios/dashboard/API/',
          { method: 'GET', credentials: 'include' }
        );
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
    <Box className="optimizar-container">
      <Paper className="optimizar-paper">
        {/* Título con salto de línea */}
        <Box className="optimizar-header">
          <Typography variant="h3" className="optimizar-title">
            Conecta tu cuenta de<br/>Facebook Business
          </Typography>
        </Box>

        {/* Mensaje descriptivo en tres líneas */}
        <Box className="optimizar-status">
          <Typography variant="h5" className="optimizar-status-text">
            Conecta tu cuenta de Facebook Business <br/>
            para comenzar a optimizar tus <br/> 
            presupuestos publicitarios.
          </Typography>
        </Box>

        {/* Botón de conexión */}
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
      </Paper>
    </Box>
  );
};

export default Optimizar;
