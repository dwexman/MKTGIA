import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Button, Typography, Tooltip } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import HomeIcon from '@mui/icons-material/Home'
import SelectAccount from './SelectAccount'
import ExcludeCampaigns from './ExcludeCampaigns'
import RoiInput from './RoiInput'
import Step5Resultados from './components/Step5Resultados'
import Step5Eliminados from './components/Step5Eliminados'
import Step5Redistribuir from './components/Step5Redistribuir'
import Step5Metrics from './components/Step5Metrics'
import './optimizar.css'

const API_BASE = 'https://www.mrkt21.com'

export default function Optimizar() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [accounts, setAccounts] = useState([])
  const [campaignTypes, setCampaignTypes] = useState([])
  const [configStep2, setConfigStep2] = useState(null)
  const [filteredCampaigns, setFilteredCampaigns] = useState([])
  const [excludedIds, setExcludedIds] = useState([])
  const [selectedResultTab, setSelectedResultTab] = useState('resultados_opt')

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

  // paso 1 → conecta FB y avanza al 2
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

  // paso 2 → guarda config y avanza al 3
  const handleContinueStep2 = config => {
    setConfigStep2(config)
    setStep(3)
  }

  // paso 3 → excluye campañas y avanza según ROI
  const handleOptimizeCampaigns = (excluded, campaigns) => {
    setExcludedIds(excluded)
    const remaining = campaigns.filter(c => !excluded.includes(c.id))
    setFilteredCampaigns(remaining)

    if (configStep2.variable === 'ROI Ingreso Manual (Retorno de Inversión)') {
      setStep(4)
    } else {
      setStep(5) // aquí avanzamos al paso 5 cuando no es ROI manual
    }
  }

  // paso 4 → ROI manual y avanza al 5
  const handleSubmitRoi = roiValues => {
    console.log('ROI a enviar:', roiValues)
    // llamada a tu API de guardado de ROI…
    setStep(5)
  }

  // “volver”
  const backTo1 = () => setStep(1)
  const backTo2 = () => setStep(2)
  const backTo3 = () => setStep(3)

  // — Renderizado según step —
  if (step === 1) {
    return (
      <Box className="optimizar-container">
        <Paper
          className="optimizar-paper"
          sx={{
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

  if (step === 3) {
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

  if (step === 4) {
    return (
      <Box className="optimizar-container">
        <Paper className="paper-step2">
          <RoiInput
            campaigns={filteredCampaigns}
            onBack={backTo3}
            onSubmit={handleSubmitRoi}
          />
        </Paper>
      </Box>
    )
  }

  if (step === 5) {
    return (
      <Box className="optimizar-container">
        <Paper className="paper-step2">
          <Box className="resultados-container">

            <Box className="opt-buttons-container">
              <button
                className={`opt-button ${selectedResultTab === 'resultados_opt' ? 'selected' : ''}`}
                onClick={() => setSelectedResultTab('resultados_opt')}
              >
                Resultados de la Optimización
              </button>
              <button
                className={`opt-button ${selectedResultTab === 'anuncios_eliminados' ? 'selected' : ''}`}
                onClick={() => setSelectedResultTab('anuncios_eliminados')}
              >
                Anuncios Eliminados
              </button>
              <button
                className={`opt-button ${selectedResultTab === 'redistribucion_presupuestos' ? 'selected' : ''}`}
                onClick={() => setSelectedResultTab('redistribucion_presupuestos')}
              >
                Redistribución de Presupuestos
              </button>
              <button
                className={`opt-button ${selectedResultTab === 'metricas_generales' ? 'selected' : ''}`}
                onClick={() => setSelectedResultTab('metricas_generales')}
              >
                Métricas Generales
              </button>
            </Box>

            <Box className="opt-content">
              {selectedResultTab === 'resultados_opt' &&
                <Step5Resultados />}

              {selectedResultTab === 'anuncios_eliminados' && (
                <Step5Eliminados />
              )}
              {selectedResultTab === 'redistribucion_presupuestos' && (
                <Step5Redistribuir />
              )}
              {selectedResultTab === 'metricas_generales' &&
                <Step5Metrics />}

            </Box>

            <Box mt={3} textAlign="right">
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    textTransform: 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      transform: 'translateY(-1px)'
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}
                  startIcon={<HomeIcon />}
                >
                  Volver al Inicio
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    )
  }

  return null
}
