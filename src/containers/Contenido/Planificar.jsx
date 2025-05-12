import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Stack, Divider,
  Table, TableHead, TableRow, TableCell, TableBody,
  CircularProgress, Alert
} from '@mui/material';

const API = import.meta.env.VITE_API_URL 
const PATH = '/creacionContenido/api';

export default function Planificar() {
  /* ───────── estado ───────── */
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [plan, setPlan] = useState([]);     // resultados[]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* helper fetch → devuelve JSON o lanza error */
  const api = async (url, opts = {}) => {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      ...opts
    });
    const txt = await res.text();
    try { return JSON.parse(txt); }
    catch { throw new Error('El backend devolvió algo que no es JSON'); }
  };

  /* normaliza mayúsculas/minúsculas */
  const norm = arr => arr.map(r => ({
    fecha: r.fecha || r.Fecha,
    topic: r.topic || r.Topic,
    copy: r.copy || r.Copy,
    imagen: r.imagen || r.Imagen
  }));

  /* ───────── planificar ───────── */
  const handlePlanificar = async () => {
    try {
      if (!desde || !hasta) throw new Error('Debes seleccionar ambas fechas');
      setLoading(true); setError(null);

      const { resultados } = await api(
        `${API}${PATH}/planificar`,
        { method: 'POST', body: JSON.stringify({ fechaDesde: desde, fechaHasta: hasta }) }
      );
      setPlan(norm(resultados));
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  /* ───────── registrar ───────── */
  const handleRegistrar = async () => {
    try {
      setLoading(true); setError(null);
      await api(`${API}${PATH}/registrar-calendario`, { method: 'POST' });
      alert('✅ Contenido registrado en el calendario');
      setPlan([]);                       // vuelve al formulario
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  /* ───────── reset sin registrar ───────── */
  const resetFechas = () => setPlan([]);

  /* ─── estilos originales, sin cambios ─── */
  const styles = {
    container: {
      p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: '100vh', background: 'transparent',
      '@media (max-width: 768px)': { p: 2 }
    },
    paper: {
      p: 1, width: '100%', maxWidth: 600,
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    content: {
      p: 3, background: 'rgba(16,20,55,0.98)',
      borderRadius: 2, border: '5px solid rgba(77,171,247,0.3)'
    },
    title: {
      mb: 2, fontWeight: 700, fontSize: '2rem', color: '#4dabf7',
      textShadow: '0 0 12px rgba(77,171,247,0.6)', textAlign: 'center',
      '@media (max-width: 768px)': { fontSize: '1.5rem' }
    },
    subtitle: {
      color: '#ffffff', mb: 2, fontWeight: 500, fontSize: '1rem'
    },
    inputField: {
      width: '100%',
      '& .MuiOutlinedInput-root': {
        color: '#ffffff',
        '& fieldset': { borderColor: '#4dabf7' },
        '&:hover fieldset': { borderColor: '#4dabf7' },
        '&.Mui-focused fieldset': {
          borderColor: '#4dabf7',
          boxShadow: '0 0 10px rgba(77,171,247,0.3)'
        }
      },
      '& .MuiInputLabel-root': {
        color: 'rgba(255,255,255,0.7)',
        '&.Mui-focused': { color: '#4dabf7' }
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'rgba(255,255,255,0.5)', opacity: 1
      }
    },
    datePicker: { '& .MuiInputBase-input': { padding: '14px 14px' } },
    button: {
      background: 'linear-gradient(145deg,#4dabf7 0%,#1a237e 100%)',
      color: '#ffffff', fontWeight: 600, textTransform: 'none', py: 1.5,
      '&:hover': {
        background: 'linear-gradient(145deg,#1a237e 0%,#4dabf7 100%)',
        boxShadow: '0 0 15px rgba(77,171,247,0.5)'
      }
    },
    estrategiaCard: {
      p: 2, backgroundColor: 'rgba(26,35,126,0.2)',
      border: '1px solid #4dabf7', borderRadius: 1, mb: 2
    },
    estrategiaTitle: {
      color: '#4dabf7', fontWeight: 600, fontSize: '1rem', mb: 1
    },
    estrategiaText: { color: '#ffffff', fontSize: '0.875rem' },
    tableContainer: {
      mt: 2,
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid rgba(77,171,247,0.3)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    tableHeaderCell: {
      background: 'linear-gradient(145deg,#1a237e 0%,#4dabf7 100%)',
      color: '#fff',
      fontWeight: 600,
      fontSize: '0.875rem',
      py: 1.5
    },
    tableCell: {
      color: '#ffffff',
      borderBottom: '1px solid rgba(77,171,247,0.2)',
      py: 1.5
    },
    tableRow: {
      '&:nth-of-type(even)': {
        backgroundColor: 'rgba(26,35,126,0.1)'
      },
      '&:hover': {
        backgroundColor: 'rgba(77,171,247,0.1)'
      }
    },
    buttonGroup: {
      mt: 3,
      gap: 2,
      '@media (max-width: 600px)': {
        flexDirection: 'column'
      }
    },
    registerButton: {
      background: 'linear-gradient(145deg,#4dabf7 0%,#1a237e 100%)',
      color: '#ffffff', 
      fontWeight: 600, 
      textTransform: 'none', 
      py: 1.5,
      flex: 1,
      '&:hover': {
        background: 'linear-gradient(145deg,#1a237e 0%,#4dabf7 100%)',
        boxShadow: '0 0 15px rgba(77,171,247,0.5)'
      }
    },
    cancelButton: {
      flex: 1,
      color: '#4dabf7',
      fontWeight: 600,
      border: '2px solid #4dabf7',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'rgba(77,171,247,0.1)',
        boxShadow: '0 0 10px rgba(77,171,247,0.3)'
      }
    }
  };

  /* ───────── UI ───────── */
  if (loading && plan.length === 0) {
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
            {plan.length ? 'Revisar Planificación de Contenido'
              : 'Planificar Contenido'}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* Estrategia (el backend la usa internamente; aquí solo texto genérico) */}
          <Box sx={styles.estrategiaCard}>
            <Typography sx={styles.estrategiaTitle}>Estrategia actual</Typography>
            <Typography sx={styles.estrategiaText}>Se empleará la última estrategia registrada</Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(77,171,247,0.3)', my: 2 }} />

          {/* Formulario fechas */}
          {plan.length === 0 && (
            <Stack spacing={3}>
              <TextField
                label="Fecha Desde" type="date" value={desde}
                onChange={e => setDesde(e.target.value)} InputLabelProps={{ shrink: true }}
                sx={{ ...styles.inputField, ...styles.datePicker }}
              />
              <TextField
                label="Fecha Hasta" type="date" value={hasta}
                onChange={e => setHasta(e.target.value)} InputLabelProps={{ shrink: true }}
                sx={{ ...styles.inputField, ...styles.datePicker }}
              />
              <Button onClick={handlePlanificar} sx={styles.button} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Planificar'}
              </Button>
            </Stack>
          )}

          {/* Tabla resultados */}
          {plan.length > 0 && (
            <>
              <Box sx={styles.tableContainer}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={styles.tableHeaderCell}>Fecha</TableCell>
                      <TableCell sx={styles.tableHeaderCell}>Topic</TableCell>
                      <TableCell sx={styles.tableHeaderCell}>Copy</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plan.map(r => (
                      <TableRow key={r.fecha} sx={styles.tableRow}>
                        <TableCell sx={styles.tableCell}>{r.fecha}</TableCell>
                        <TableCell sx={{ ...styles.tableCell, whiteSpace: 'pre-line' }}>{r.topic}</TableCell>
                        <TableCell sx={{ ...styles.tableCell, whiteSpace: 'pre-line' }}>{r.copy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>

              <Stack direction="row" sx={styles.buttonGroup}>
                <Button sx={styles.registerButton}
                  onClick={handleRegistrar} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Registrar en Calendario'}
                </Button>
                <Button sx={styles.cancelButton}
                  onClick={resetFechas} disabled={loading}>
                  Volver a escoger fechas
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
