import React, { useState, useEffect } from 'react'
import { keyframes } from '@emotion/react'
import {
  Box,
  Container,
  Paper,
  Toolbar,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Stack
} from '@mui/material'
import SyncIcon from '@mui/icons-material/Sync'
import { useParams, useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL

const mapLabelToRefreshType = {
  'Tipo de Contenido': 'tipo',
  'Título': 'titulo',
  'Descripción': 'descripcion',
  acciones: 'acciones',
  completo: 'completo',
};

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`
const containerFloat = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
`

export default function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    Brand: '',
    Fecha: '',
    TipoContenido: '',
    Titulo: '',
    Descripcion: ''
  })

  // Para modal de refresh por campo
  const [openRefreshModal, setOpenRefreshModal] = useState(false)
  const [refreshField, setRefreshField] = useState('')
  const [refreshComment, setRefreshComment] = useState('')
  const [scopeRefresh, setScopeRefresh] = useState('')

  useEffect(() => {
    ; (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/calendario/events/${id}`, {
          credentials: 'include'
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const { status, event } = await res.json()
        if (status !== 'ok') throw new Error('Error al obtener evento')
        setForm({
          Brand: event.Brand,
          Fecha: event.Fecha,
          TipoContenido: event.TipoContenido,
          Titulo: event.Titulo,
          Descripcion: event.Descripcion || ''
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleUpdate = async () => {
    try {
      // construyo el body con las claves en minúscula
      const payload = {
        brand: form.Brand,
        fecha: form.Fecha,             // asegúrate que venga "YYYY-MM-DD"
        tipoContenido: form.TipoContenido,
        titulo: form.Titulo,
        descripcion: form.Descripcion
      }

      const res = await fetch(`${API_BASE}/api/calendario/events/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.status === 400) {
        // si la API devuelve JSON con detalle de error, lo leo y muestro
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Bad Request')
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      // todo ok: vuelvo atrás
      navigate(-1)
    } catch (err) {
      setError(err.message)
      console.error('Error actualizando:', err)
    }
  }

  // — Modal de refresh por campo —
  const openRefresh = fieldLabel => {
    setRefreshField(fieldLabel)
    setRefreshComment('')
    setOpenRefreshModal(true)
  }
  const closeRefresh = () => setOpenRefreshModal(false)

  const handleRefreshModal = async () => {
    try {
      const payload = {
        refresh_type: mapLabelToRefreshType[refreshField],
        comentario: refreshComment || undefined,
      }
      const res = await fetch(
        `${API_BASE}/creacionContenido/API/calendario/refresh/${id}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      alert(`Refresh de "${refreshField}" solicitado`)
      closeRefresh()
    } catch (err) {
      alert(`Error al solicitar refresh:\n${err.message}`)
    }
  }

  // — Refresh scope desde el form principal —
  const handleScopeRefresh = async () => {
    try {
      const payload = {
            refresh_type: mapLabelToRefreshType[scopeRefresh],
            comentario: refreshComment || undefined,
          }
          const res = await fetch(`${API_BASE}/creacionContenido/API/calendario/refresh/${id}`,{
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      alert(`Refresh "${scopeRefresh}" solicitado`)
      navigate(-1)
    } catch (err) {
      alert(`Error al solicitar refresh:\n${err.message}`)
    }
  }

  if (loading) {
    return (
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #f8f9ff 0%, #e6f0ff 100%)'
      }}>
        <CircularProgress sx={{ color: '#4dabf7' }} />
      </Box>
    )
  }
  if (error) {
    return (
      <Box sx={{
        p: 4,
        background: 'radial-gradient(circle at center, #f8f9ff 0%, #e6f0ff 100%)',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <Typography variant="h5" color="error" sx={{ mb: 3 }}>
          Error: {error}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: '#4dabf7',
            color: 'white',
            borderRadius: '12px',
            px: 3, py: 1,
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(77, 171, 247, 0.3)',
            ':hover': { backgroundColor: '#3a8bc8' }
          }}
        >
          Volver
        </Button>
      </Box>
    )
  }

  const textFieldSX = {
    '& .MuiInputLabel-root': { color: '#1a237e' },
    '& .MuiOutlinedInput-input': { color: '#1a237e' },
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      '& fieldset': { borderColor: 'rgba(77, 171, 247, 0.3)' },
      '&:hover fieldset': { borderColor: 'rgba(77, 171, 247, 0.5)' },
      '&.Mui-focused fieldset': {
        borderColor: '#4dabf7',
        boxShadow: '0 0 0 2px rgba(77, 171, 247, 0.2)'
      }
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #f8f9ff 0%, #e6f0ff 100%)',
      p: 3, pt: 6,
      animation: `${fadeIn} 0.5s ease-out`
    }}>
      <Toolbar />
      <Container maxWidth="sm">
        <Paper sx={{
          p: 3,
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          border: '1px solid rgba(77, 171, 247, 0.2)',
          animation: `${containerFloat} 8s ease-in-out infinite`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "#1a237e" }}>
            Editar Evento
          </Typography>

          <Box component="form" sx={{ display: 'grid', gap: 3, mt: 2 }}>
            <TextField
              label="Marca"
              name="Brand"
              value={form.Brand}
              onChange={handleChange}
              fullWidth
              sx={textFieldSX}
            />
            <TextField
              label="Fecha"
              name="Fecha"
              type="date"
              value={form.Fecha}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={textFieldSX}
            />

            <TextField
              label="Tipo de Contenido"
              name="TipoContenido"
              value={form.TipoContenido}
              onChange={handleChange}
              fullWidth
              sx={textFieldSX}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Solicita tu refresh" arrow>
                      <IconButton onClick={() => openRefresh('Tipo de Contenido')}>
                        <SyncIcon sx={{ color: '#4dabf7' }} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Título"
              name="Titulo"
              value={form.Titulo}
              onChange={handleChange}
              fullWidth
              sx={textFieldSX}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Solicita tu refresh" arrow>
                      <IconButton onClick={() => openRefresh('Título')}>
                        <SyncIcon sx={{ color: '#4dabf7' }} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Descripción"
              name="Descripcion"
              value={form.Descripcion}
              onChange={handleChange}
              multiline rows={4}
              fullWidth
              sx={textFieldSX}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Solicita tu refresh" arrow>
                      <IconButton onClick={() => openRefresh('Descripción')}>
                        <SyncIcon sx={{ color: '#4dabf7' }} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />

            {/* — Checkbox scope refresh — */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ color: '#1a237e', fontWeight: 600 }}>
                Refresh:
              </Typography>
              <FormControlLabel
                sx={{ color: '#1a237e' }}
                control={
                  <Checkbox
                    checked={scopeRefresh === 'acciones'}
                    onChange={() =>
                      setScopeRefresh(prev => (prev === 'acciones' ? '' : 'acciones'))
                    }
                    sx={{
                      color: '#4dabf7',
                      '&.Mui-checked': { color: '#4dabf7' }
                    }}
                  />
                }
                label="Acciones"
              />
              <FormControlLabel
                sx={{ color: '#1a237e' }}
                control={
                  <Checkbox
                    checked={scopeRefresh === 'completo'}
                    onChange={() =>
                      setScopeRefresh(prev => (prev === 'completo' ? '' : 'completo'))
                    }
                    sx={{
                      color: '#4dabf7',
                      '&.Mui-checked': { color: '#4dabf7' }
                    }}
                  />
                }
                label="Completo"
              />
            </Box>

            {/* — Botones principales — */}
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                onClick={() => navigate(-1)}
                sx={{
                  color: '#4dabf7',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 3, py: 1,
                  borderRadius: '12px',
                  ':hover': {
                    background: 'rgba(77, 171, 247, 0.08)',
                    color: '#3a8bc8'
                  }
                }}
              >
                Cancelar
              </Button>

              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  backgroundColor: '#4dabf7',
                  color: 'white',
                  borderRadius: '12px',
                  px: 3, py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                  boxShadow: '0 2px 8px rgba(77, 171, 247, 0.3)',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    backgroundColor: '#3a8bc8',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(77, 171, 247, 0.4)'
                  },
                  ':active': {
                    transform: 'translateY(0)'
                  }
                }}
              >
                Actualizar Evento
              </Button>

              <Button
                variant="contained"
                disabled={!scopeRefresh}
                onClick={handleScopeRefresh}
                sx={{
                  backgroundColor: scopeRefresh ? '#4CAF50' : 'rgba(76, 175, 80, 0.5)',
                  color: 'white',
                  borderRadius: '12px',
                  px: 3, py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                  boxShadow: scopeRefresh ? '0 2px 8px rgba(76, 175, 80, 0.3)' : 'none',
                  transition: 'all 0.3s ease',
                  ':hover': scopeRefresh ? {
                    backgroundColor: '#43A047',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)'
                  } : {}
                }}
              >
                Solicitar Refresh
              </Button>
            </Stack>
          </Box>

          {/* — Modal de refresh por campo — */}
          <Dialog
            open={openRefreshModal}
            onClose={closeRefresh}
            PaperProps={{
              sx: {
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
                border: '1px solid rgba(77, 171, 247, 0.3)',
                minWidth: '400px'
              }
            }}
          >
            <DialogTitle sx={{
              color: '#1a237e',
              fontWeight: 'bold',
              bgcolor: '#f8f9ff',
            }}
            >Refresh de {refreshField}
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Comentario Adicional"
                placeholder="Escribe aquí información extra…"
                multiline rows={3}
                fullWidth
                value={refreshComment}
                onChange={e => setRefreshComment(e.target.value)}
                sx={{
                  mt: 1,
                  '& .MuiInputLabel-root': { color: '#4dabf7' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': { borderColor: 'rgba(77, 171, 247, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(77, 171, 247, 0.5)' }
                  }
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button sx={{
                color: '#4dabf7',
                borderRadius: '8px',
                px: 2,
                ':hover': { bgcolor: 'rgba(77, 171, 247, 0.08)' }
              }} onClick={closeRefresh}>Cancelar</Button>
              <Button variant="contained" onClick={handleRefreshModal} sx={{
                bgcolor: '#4dabf7',
                borderRadius: '8px',
                px: 3,
                boxShadow: '0 2px 8px rgba(77, 171, 247, 0.3)',
                ':hover': { bgcolor: '#3a8bc8' }
              }}>
                Solicitar Refresh
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    </Box>
  )
}
