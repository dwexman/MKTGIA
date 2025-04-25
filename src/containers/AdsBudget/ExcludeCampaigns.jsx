import React, { useEffect, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material'

const API_BASE = 'https://www.mrkt21.com'

const BACKGROUND_COLOR = 'rgba(16, 20, 55, 0.85)'
const PRIMARY_COLOR    = '#4dabf7'
const SECONDARY_COLOR  = '#1a237e'
const TEXT_COLOR       = 'rgba(255, 255, 255, 1)'
const BORDER_COLOR     = 'rgba(77, 171, 247, 0.3)'

// Datos dummy
const dummyCampaigns = [
  { id: '101', name: 'Campaña A - Lanzamiento' },
  { id: '102', name: 'Campaña B - Remarketing' },
  { id: '103', name: 'Campaña C - Promoción' },
]

export default function ExcludeCampaigns({ onBack, onOptimize }) {
  // <<< aquí define isDev
  const isDev = process.env.NODE_ENV === 'development'

  const [campaigns, setCampaigns] = useState(dummyCampaigns)
  const [selected, setSelected]   = useState(
    dummyCampaigns.reduce((acc, c) => {
      acc[c.id] = false
      return acc
    }, {})
  )

  useEffect(() => {
    if (isDev) return  // salta el fetch en dev
    fetch(`${API_BASE}/presupuestos/list-campaigns-to-exclude/API/`, {
      credentials: 'include'
    })
      .then(r => r.json())
      .then(js => {
        if (js.status === 'success') {
          setCampaigns(js.campaigns)
          setSelected(js.campaigns.reduce((acc, c) => {
            acc[c.id] = false
            return acc
          }, {}))
        }
      })
      .catch(err => console.error('Fetch error:', err))
  }, [isDev])

  const handleToggle = id => {
    setSelected(sel => ({ ...sel, [id]: !sel[id] }))
  }

  const handleOptimize = () => {
    const excludedIds = Object.entries(selected)
      .filter(([_, v]) => v)
      .map(([id]) => id)
    onOptimize(excludedIds, campaigns)
  }

  return (
    <Box sx={{
      p: 3,
      background: BACKGROUND_COLOR,
      backdropFilter: 'blur(12px)',
      borderRadius: '10px'
    }}>
      <Paper sx={{
        mb: 3,
        p: 3,
        background: 'rgba(16, 20, 55, 0.7)',
        border: `2px solid ${BORDER_COLOR}`,
        boxShadow: '0 0 15px rgba(77, 171, 247, 0.3)'
      }}>
        <Typography variant="h4" sx={{
          color: PRIMARY_COLOR,
          fontWeight: 700,
          mb: 2,
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
        background: 'rgba(16, 20, 55, 0.7)',
        border: `2px solid ${BORDER_COLOR}`,
        boxShadow: '0 0 15px rgba(77, 171, 247, 0.3)'
      }}>
        <Typography variant="h5" sx={{
          color: PRIMARY_COLOR,
          fontWeight: 700,
          mb: 3,
          textShadow: '0 0 12px rgba(77, 171, 247, 0.6)'
        }}>
          Selecciona Campañas a Excluir
        </Typography>

        <FormGroup sx={{ maxHeight: '400px', overflowY: 'auto', pr: 2 }}>
          {campaigns.map(c => (
            <FormControlLabel
              key={c.id}
              control={
                <Checkbox
                  checked={selected[c.id] || false}
                  onChange={() => handleToggle(c.id)}
                  sx={{
                    color: PRIMARY_COLOR,
                    '&.Mui-checked': { color: PRIMARY_COLOR }
                  }}
                />
              }
              label={<Typography sx={{ color: TEXT_COLOR }}>{c.name} (ID: {c.id})</Typography>}
              sx={{ '&:hover': { background: 'rgba(77, 171, 247, 0.1)' }, p: 1 }}
            />
          ))}
        </FormGroup>

        <Box sx={{
          mt: 4,
          display: 'flex',
          gap: 2,
          justifyContent: 'flex-end'
        }}>
          <Button
            variant="contained"
            onClick={handleOptimize}
            sx={{
              background: `linear-gradient(145deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`,
              color: TEXT_COLOR,
              fontWeight: 700,
              px: 4,
              '&:hover': {
                background: `linear-gradient(145deg, ${SECONDARY_COLOR} 0%, ${PRIMARY_COLOR} 100%)`,
                boxShadow: '0 0 25px rgba(77, 171, 247, 0.5)'
              }
            }}
          >
            Optimizar Campañas
          </Button>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              borderColor: PRIMARY_COLOR,
              color: PRIMARY_COLOR,
              '&:hover': {
                borderColor: PRIMARY_COLOR,
                background: 'rgba(77, 171, 247, 0.1)'
              }
            }}
          >
            Volver
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
