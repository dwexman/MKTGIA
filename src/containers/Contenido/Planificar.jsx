import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';

export default function Planificar() {
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [estrategiaSeleccionada, setEstrategiaSeleccionada] = useState('');
  const [estrategias, setEstrategias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulamos la carga de estrategias
  useEffect(() => {
    const fetchEstrategias = async () => {
      try {
        setLoading(true);
        // Aquí iría tu llamada API real
        const estrategiasMock = [
          { id: 'estrategia1', nombre: 'Estrategia de Verano' },
          { id: 'estrategia2', nombre: 'Estrategia de Invierno' },
          { id: 'estrategia3', nombre: 'Estrategia de Lanzamiento' }
        ];
        setEstrategias(estrategiasMock);
      } catch (err) {
        setError('Error al cargar las estrategias');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEstrategias();
  }, []);

  const handlePlanificar = () => {
    try {
      // Validación básica
      if (!desde || !hasta) {
        throw new Error('Debes seleccionar ambas fechas');
      }
      
      if (!estrategiaSeleccionada) {
        throw new Error('Debes seleccionar una estrategia');
      }

      // Lógica de planificación
      console.log('Planificando desde', desde, 'hasta', hasta, 'con estrategia', estrategiaSeleccionada);
      setError(null);
      
      // Aquí iría tu llamada API real
      
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // Estilos (igual que antes)
  const styles = {
    container: {
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'transparent',
      '@media (max-width: 768px)': {
        p: 2
      }
    },
    paper: {
      p: 1,
      width: '100%',
      maxWidth: 600,
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    },
    content: {
      p: 3,
      background: 'rgba(16, 20, 55, 0.98)',
      borderRadius: 2,
      border: '5px solid rgba(77, 171, 247, 0.3)'
    },
    title: {
      mb: 2,
      fontWeight: 700,
      fontSize: '2rem',
      color: '#4dabf7',
      textShadow: '0 0 12px rgba(77, 171, 247, 0.6)',
      textAlign: 'center',
      '@media (max-width: 768px)': {
        fontSize: '1.5rem'
      }
    },
    subtitle: {
      color: '#ffffff',
      mb: 2,
      fontWeight: 500,
      fontSize: '1rem'
    },
    inputField: {
      width: '100%',
      '& .MuiOutlinedInput-root': {
        color: '#ffffff',
        '& fieldset': {
          borderColor: '#4dabf7'
        },
        '&:hover fieldset': {
          borderColor: '#4dabf7'
        },
        '&.Mui-focused fieldset': {
          borderColor: '#4dabf7',
          boxShadow: '0 0 10px rgba(77, 171, 247, 0.3)'
        }
      },
      '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.7)',
        '&.Mui-focused': {
          color: '#4dabf7'
        }
      },
      '& .MuiInputBase-input': {
        '&::placeholder': {
          color: 'rgba(255, 255, 255, 0.5)',
          opacity: 1
        }
      }
    },
    datePicker: {
      '& .MuiInputBase-input': {
        padding: '14px 14px'
      }
    },
    button: {
      background: 'linear-gradient(145deg, #4dabf7 0%, #1a237e 100%)',
      color: '#ffffff',
      fontWeight: 600,
      textTransform: 'none',
      py: 1.5,
      '&:hover': {
        background: 'linear-gradient(145deg, #1a237e 0%, #4dabf7 100%)',
        boxShadow: '0 0 15px rgba(77, 171, 247, 0.5)'
      }
    },
    estrategiaCard: {
      p: 2,
      backgroundColor: 'rgba(26, 35, 126, 0.2)',
      border: '1px solid #4dabf7',
      borderRadius: 1,
      mb: 2
    },
    estrategiaTitle: {
      color: '#4dabf7',
      fontWeight: 600,
      fontSize: '1rem',
      mb: 1
    },
    estrategiaText: {
      color: '#ffffff',
      fontSize: '0.875rem'
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Paper sx={styles.paper}>
        <Box sx={styles.content}>
          <Typography variant="h4" sx={styles.title}>
            PLANIFICAR CONTENIDO
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={styles.estrategiaCard}>
            <Typography sx={styles.estrategiaTitle}>Estrategia Actual</Typography>
            <Typography sx={styles.estrategiaText}>
              {estrategiaSeleccionada 
                ? estrategias.find(e => e.id === estrategiaSeleccionada)?.nombre 
                : 'No se ha seleccionado ninguna estrategia'}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(77, 171, 247, 0.3)', my: 2 }} />

          <Stack spacing={3}>
            <TextField
              select
              label="Seleccionar Estrategia"
              value={estrategiaSeleccionada}
              onChange={(e) => setEstrategiaSeleccionada(e.target.value)}
              sx={styles.inputField}
              error={!estrategiaSeleccionada && error?.includes('estrategia')}
            >
              <MenuItem value="">Seleccione una estrategia</MenuItem>
              {estrategias.map((estrategia) => (
                <MenuItem key={estrategia.id} value={estrategia.id}>
                  {estrategia.nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Fecha Desde"
              type="date"
              value={desde}
              onChange={e => setDesde(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ ...styles.inputField, ...styles.datePicker }}
              error={!desde && error?.includes('fechas')}
            />

            <TextField
              label="Fecha Hasta"
              type="date"
              value={hasta}
              onChange={e => setHasta(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ ...styles.inputField, ...styles.datePicker }}
              error={!hasta && error?.includes('fechas')}
            />

            <Button
              variant="contained"
              onClick={handlePlanificar}
              sx={styles.button}
              size="large"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Generar Planificación'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}