import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, FormGroup, FormControlLabel,
  Checkbox, Button
} from '@mui/material';

const BACKGROUND_COLOR = 'rgba(16, 20, 55, 0.85)';
const PRIMARY_COLOR    = '#4dabf7';
const SECONDARY_COLOR  = '#1a237e';
const TEXT_COLOR       = 'rgba(255, 255, 255, 1)';
const BORDER_COLOR     = 'rgba(77, 171, 247, 0.3)';

/* Dummy solo para desarrollo */
const dummyCampaigns = [
  { id: '101', name: 'Campaña A - Lanzamiento' },
  { id: '102', name: 'Campaña B - Remarketing' },
  { id: '103', name: 'Campaña C - Promoción' }
];

export default function ExcludeCampaigns({ campaigns, onBack, onOptimize }) {
  const isDev = process.env.NODE_ENV === 'development';

  /* Si estás en dev y no llegaron campañas, usamos dummy */
  const source = isDev && !campaigns.length ? dummyCampaigns : campaigns;

  /* State de checkboxes */
  const [selected, setSelected] = useState(
    source.reduce((acc, c) => ({ ...acc, [c.id]: false }), {})
  );

  /* Si la prop campaigns cambia (por navegar atrás/adelante) sincroniza state */
  useEffect(() => {
    setSelected(source.reduce((acc, c) => ({ ...acc, [c.id]: false }), {}));
  }, [source]);

  const handleToggle = id =>
    setSelected(sel => ({ ...sel, [id]: !sel[id] }));

  const handleOptimize = () => {
    const excludedIds = Object.entries(selected)
      .filter(([_, v]) => v)
      .map(([id]) => id);
    onOptimize(excludedIds, source);
  };

  return (
    <Box sx={{ p: 3, background: BACKGROUND_COLOR, borderRadius: 2 }}>
      <Paper sx={{
        mb: 3, p: 3,
        background : 'rgba(16, 20, 55, 0.7)',
        border     : `2px solid ${BORDER_COLOR}`,
        boxShadow  : '0 0 15px rgba(77, 171, 247, 0.3)'
      }}>
        <Typography variant="h4" sx={{
          color: PRIMARY_COLOR, fontWeight: 700, mb: 2,
          textShadow: '0 0 12px rgba(77, 171, 247, 0.6)'
        }}>
          Optimizaciones
        </Typography>
        <Typography variant="body1" sx={{ color: TEXT_COLOR }}>
          Aquí puedes realizar ajustes en tus campañas publicitarias para maximizar su rendimiento.
        </Typography>
      </Paper>

      <Paper sx={{
        p: 3,
        background : 'rgba(16, 20, 55, 0.7)',
        border     : `2px solid ${BORDER_COLOR}`,
        boxShadow  : '0 0 15px rgba(77, 171, 247, 0.3)'
      }}>
        <Typography variant="h5" sx={{
          color: PRIMARY_COLOR, fontWeight: 700, mb: 3,
          textShadow: '0 0 12px rgba(77, 171, 247, 0.6)'
        }}>
          Selecciona Campañas a Excluir
        </Typography>

        <FormGroup sx={{ maxHeight: 400, overflowY: 'auto', pr: 2 }}>
          {source.map(c => (
            <FormControlLabel
              key={c.id}
              control={
                <Checkbox
                  checked={selected[c.id] || false}
                  onChange={() => handleToggle(c.id)}
                  sx={{ color: PRIMARY_COLOR, '&.Mui-checked': { color: PRIMARY_COLOR } }}
                />
              }
              label={<Typography sx={{ color: TEXT_COLOR }}>{c.name} (ID: {c.id})</Typography>}
              sx={{ '&:hover': { background: 'rgba(77, 171, 247, 0.1)' }, p: 1 }}
            />
          ))}
        </FormGroup>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleOptimize}
            sx={{
              background: `linear-gradient(145deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`,
              color: TEXT_COLOR, fontWeight: 700, px: 4,
              '&:hover': {
                background: `linear-gradient(145deg, ${SECONDARY_COLOR} 0%, ${PRIMARY_COLOR} 100%)`,
                boxShadow : '0 0 25px rgba(77, 171, 247, 0.5)'
              }
            }}
          >
            Optimizar Campañas
          </Button>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR,
              '&:hover': {
                borderColor: PRIMARY_COLOR,
                background : 'rgba(77, 171, 247, 0.1)'
              }
            }}
          >
            Volver
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
