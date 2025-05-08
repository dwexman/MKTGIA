import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const BG  = 'rgba(16, 20, 55, 0.85)';
const PRI = '#4dabf7';
const TXT = 'rgba(255,255,255,1)';
const BOR = 'rgba(77,171,247,0.3)';

export default function Step5Metrics({ data }) {
  if (!data) return null;

  const before  = data.metric_antes;
  const after   = data.metric_despues;
  const pct     = data.porcentaje_aumento_metric;
  const symbol  = data.currency_symbol || '';
  const fmt = n => n?.toLocaleString('es-CL');   


  return (
    <Box sx={{ p:3, background:BG, backdropFilter:'blur(12px)', borderRadius:'10px' }}>
      <Paper sx={{
        p:3, background:'rgba(16,20,55,0.7)',
        border:`2px solid ${BOR}`, boxShadow:'0 0 15px rgba(77,171,247,0.3)'
      }}>
        <Typography variant="h4" sx={{
          color:PRI, fontWeight:700, mb:3,
          textShadow:'0 0 12px rgba(77,171,247,0.6)'
        }}>
          Métricas generales
        </Typography>

        <Box sx={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',
          gap:2,
          '& .MuiTypography-root':{
            color:TXT, p:1,
            borderRadius:'4px',
            background:'rgba(255,255,255,0.05)'
          }
        }}>
          <Typography>
            <strong>Métrica total antes:</strong> {symbol}{fmt(before)}
          </Typography>
          <Typography>
            <strong>Métrica total después:</strong> {symbol}{after}
          </Typography>
          <Typography>
            <strong>Porcentaje de aumento:</strong> {pct}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
