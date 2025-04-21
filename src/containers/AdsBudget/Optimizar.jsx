import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Button, Typography, Tooltip } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import SelectAccount from './SelectAccount'
import ExcludeCampaigns from './ExcludeCampaigns'
import './optimizar.css'

const API_BASE = 'https://www.mrkt21.com'

export default function Optimizar() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [accounts, setAccounts] = useState([])
  const [campaignTypes, setCampaignTypes] = useState([])
  const [configStep2, setConfigStep2] = useState(null)

  // validación de sesión
  useEffect(() => {
    fetch(`${API_BASE}/comentarios/dashboard/API/`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(js => {
        if (js.status !== 'success') navigate('/login', { replace: true })
      })
      .catch(() => navigate('/login', { replace: true }))
  }, [navigate])

  // paso 1 → conecta FB y sube al paso 2
  const handleConnectFacebook = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/presupuestos/select-account/API/`,
        { method: 'GET', credentials: 'include' }
      )
      const js = await res.json()
      if (js.status === 'success') {
        setAccounts(js.accounts)
        setCampaignTypes(js.campaign_types)
        setStep(2)
      } else {
        console.error('API error:', js)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }

  // paso 2 → guarda config y sube al paso 3
  const handleContinueStep2 = config => {
    setConfigStep2(config)
    setStep(3)
  }

  // paso 3 → recibe array de IDs excluidos
  const handleOptimizeCampaigns = excludedIds => {
    console.log('Config paso 2:', configStep2)
    console.log('IDs excluidos →', excludedIds)
    // aquí podrías llamar a tu API de optimización
  }

  // navegaciones “volver”
  const backTo1 = () => setStep(1)
  const backTo2 = () => setStep(2)

  // — Renderizado paso 1 —
  if (step === 1) {
    return (
      <Box className="optimizar-container">
        <Paper className="optimizar-paper" sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '12px',
            padding: '2px',
            background: 'linear-gradient(45deg, #00f3ff 0%, transparent 30%, transparent 70%, #0066ff 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            animation: 'rotateBorder 8s linear infinite',
          }
        }}
        >
          <Box className="optimizar-header">
            <Typography variant="h3" className="optimizar-title">
              Conecta tu cuenta de<br />
              Facebook Business
            </Typography>
          </Box>
          <Box className="optimizar-status">
            <Typography variant="h5" className="optimizar-status-text">
              Conecta tu cuenta de Facebook Business<br />
              para comenzar a optimizar tus<br />
              presupuestos publicitarios.
            </Typography>
          </Box>
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
                onClick={handleConnectFacebook}
                size="large"
              >
                Conectar Facebook Business
              </Button>
            </Tooltip>

            {/* Botón Demo solo en desarrollo */}
            {process.env.NODE_ENV === 'development' && (
              <Button
                variant="outlined"
                sx={{ ml: 2, height: '40px' }}
                onClick={() => {
                  setAccounts([
                    { id: '111', name: 'Demo Cuenta 1' },
                    { id: '222', name: 'Demo Cuenta 2' }
                  ])
                  setCampaignTypes(['OUTCOME_LEADS', 'OUTCOME_AWARENESS'])
                  setStep(2)
                }}
              >
                Simular conexión (Demo)
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    )
  }

  // paso 2
  if (step === 2) {
    return (
      <Box className="optimizar-container">
        <Paper className="paper-step2">
          <SelectAccount
            accounts={accounts}
            campaignTypes={campaignTypes}
            onBack={backTo1}
            onContinue={handleContinueStep2}
          />
        </Paper>
      </Box>
    )
  }

  // paso 3
  return (
    <Box className="optimizar-container">
      <Paper className="paper-step2">
        <ExcludeCampaigns
          onBack={backTo2}
          onOptimize={handleOptimizeCampaigns}
        />
      </Paper>
    </Box>
  )
}
