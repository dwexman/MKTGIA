import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

const BACKGROUND_COLOR = 'rgba(16, 20, 55, 0.85)'
const PRIMARY_COLOR = '#4dabf7'
const TEXT_COLOR = 'rgba(255, 255, 255, 1)'
const BORDER_COLOR = 'rgba(77, 171, 247, 0.3)'

export default function Step5Resultados({config, data}) {

  if (!config || !data) return null;
  

  return (
    <Box sx={{
      p: 3,
      background: BACKGROUND_COLOR,
      backdropFilter: 'blur(12px)',
      borderRadius: '10px'
    }}>
      <Paper sx={{
        p: 3,
        background: 'rgba(16, 20, 55, 0.7)',
        border: `2px solid ${BORDER_COLOR}`,
        boxShadow: '0 0 15px rgba(77, 171, 247, 0.3)'
      }}>
        <Typography variant="h4" sx={{
          color: PRIMARY_COLOR,
          fontWeight: 700,
          mb: 3,
          textShadow: '0 0 12px rgba(77, 171, 247, 0.6)'
        }}>
          Resultados de la optimización
        </Typography>

        <Box component="div" sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 2,
          '& .MuiTypography-root': {
            color: TEXT_COLOR,
            padding: '8px',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.05)'
          }
        }}>
          <Typography><strong>Rango de fecha:</strong> {config.startDate} – {config.endDate}</Typography>
          <Typography><strong>Tipo de campaña:</strong> {config.campaignType}</Typography>
          <Typography><strong>Variable optimizada:</strong> {data.optimize_variable}</Typography>
          <Typography><strong>Moneda:</strong> {data.currency_code}</Typography>
          <Typography>
            <strong>¿Eliminar el 10% de menor rendimiento?:</strong> {' '}
            {config.removeWorst ? 'Sí' : 'No'}
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}