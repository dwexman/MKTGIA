// src/containers/Contenido/EditEvent.jsx
import React, { useState, useEffect } from 'react'
import { keyframes } from '@emotion/react'
import {
  Box,
  Container,
  Paper,
  Toolbar,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL || 'https://www.mrkt21.com'

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

// Panel auxiliar para Tabs
function TabPanel({ children, value, index }) {
  return value === index
    ? <Box sx={{ pt: 2 }}>{children}</Box>
    : null
}

export default function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Estados
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)
  const [refreshType, setRefreshType] = useState('completo')
  const [refreshComment, setRefreshComment] = useState('')

  // Formulario de edición
  const [form, setForm] = useState({
    Brand: '',
    Fecha: '',
    TipoContenido: '',
    Titulo: '',
    Descripcion: ''
  })

  // 1) Carga inicial del evento
  useEffect(() => {
    ; (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/calendario/events/${id}`, {
          credentials: 'include'
        })
        if (res.status === 404) throw new Error('Evento no encontrado')
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

  // 2) Handlers
  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  // PUT para actualizar
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/calendario/events/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      // volver atrás en el historial
      navigate(-1)
    } catch (err) {
      setError(err.message)
    }
  }

  // POST para "refresh" creando un nuevo evento
  const handleRefresh = async () => {
    try {
      const payload = {
        brand: form.Brand,
        fecha: form.Fecha,
        tipoContenido: form.TipoContenido,
        titulo: form.Titulo,
        descripción: refreshComment
      }
      const res = await fetch(`${API_BASE}/api/calendario/events`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.status === 400) {
        const err = await res.json()
        throw new Error(err.message)
      }
      if (res.status !== 201) throw new Error(`HTTP ${res.status}`)
      const { idEvento } = await res.json()
      // aquí podrías redirigir o notificar:
      alert(`Refresh solicitado, nuevo evento con ID ${idEvento}`)
      navigate(-1)
    } catch (err) {
      setError(err.message)
    }
  }

  // 3) Render loading / error
  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
            px: 3,
            py: 1,
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(77, 171, 247, 0.3)',
            ':hover': {
              backgroundColor: '#3a8bc8',
            }
          }}
        >
          Volver
        </Button>
      </Box>
    )
  }

  // 4) Render principal con Tabs
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #f8f9ff 0%, #e6f0ff 100%)',
      p: 3,
      pt: 6,
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
          overflow: 'hidden',
          ':before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '2px solid transparent',
            background: 'linear-gradient(120deg, rgba(77, 171, 247, 0.1) 0%, transparent 50%) border-box',
            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            borderRadius: '16px',
          }
        }}>
          <Tabs
            value={tabIndex}
            onChange={(_, v) => setTabIndex(v)}
            textColor="primary"
            indicatorColor="primary"
            centered
            sx={{
              mb: 2,
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab label="Editar Evento" sx={{ fontWeight: 600, fontSize: '0.95rem' }} />
            <Tab label="Solicitar Refresh" sx={{ fontWeight: 600, fontSize: '0.95rem' }} />
          </Tabs>

          {/* ─── EDITAR ─── */}
          <TabPanel value={tabIndex} index={0}>
            <Box component="form" sx={{ display: 'grid', gap: 3, mt: 2 }}>
              {/** Campos de edición **/}
              <TextField
                label="Marca"
                name="Brand"
                value={form.Brand}
                onChange={handleChange}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#1a237e',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#1a237e',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(77, 171, 247, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(77, 171, 247, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4dabf7',
                      boxShadow: '0 0 0 2px rgba(77, 171, 247, 0.2)'
                    }
                  }
                }}
              />
              <TextField
                label="Fecha"
                name="Fecha"
                type="date"
                value={form.Fecha}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#1a237e',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#1a237e',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(77, 171, 247, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(77, 171, 247, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4dabf7',
                      boxShadow: '0 0 0 2px rgba(77, 171, 247, 0.2)'
                    }
                  }
                }}
              />
              <TextField
                label="Tipo de Contenido"
                name="TipoContenido"
                value={form.TipoContenido}
                onChange={handleChange}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#1a237e',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#1a237e',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(77, 171, 247, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(77, 171, 247, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4dabf7',
                      boxShadow: '0 0 0 2px rgba(77, 171, 247, 0.2)'
                    }
                  }
                }}
              />
              <TextField
                label="Título"
                name="Titulo"
                value={form.Titulo}
                onChange={handleChange}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#1a237e',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#1a237e',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(77, 171, 247, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(77, 171, 247, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4dabf7',
                      boxShadow: '0 0 0 2px rgba(77, 171, 247, 0.2)'
                    }
                  }
                }}
              />
              <TextField
                label="Descripción"
                name="Descripcion"
                value={form.Descripcion}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#1a237e',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#1a237e',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(77, 171, 247, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(77, 171, 247, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4dabf7',
                      boxShadow: '0 0 0 2px rgba(77, 171, 247, 0.2)'
                    }
                  }
                }}
              />

              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  onClick={() => navigate(-1)}
                  sx={{
                    color: '#4dabf7',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
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
                    px: 3,
                    py: 1,
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
              </Stack>
            </Box>
          </TabPanel>

          {/* ─── REFRESH ─── */}
          <TabPanel value={tabIndex} index={1}>
            <Typography variant="subtitle1" gutterBottom sx={{
              mt: 2,
              color: '#1a237e',
              fontWeight: 600
            }}>
              Elige qué parte refrescar
            </Typography>
            <RadioGroup
              value={refreshType}
              onChange={e => setRefreshType(e.target.value)}
              sx={{
                '& .MuiRadio-root': {
                  color: '#4dabf7',
                  '&.Mui-checked': {
                    color: '#4dabf7',
                  }
                },
                '& .MuiFormControlLabel-label': {
                  color: '#1a237e'
                }
              }}
            >
              <FormControlLabel
                value="completo"
                control={<Radio />}
                label="Refresh Completo"
              />
              <FormControlLabel
                value="tipo"
                control={<Radio />}
                label="Refresh de Tipo de Contenido"
              />
              <FormControlLabel
                value="titulo"
                control={<Radio />}
                label="Refresh de Título"
              />
              <FormControlLabel
                value="descripcion"
                control={<Radio />}
                label="Refresh de Descripción"
              />
              <FormControlLabel
                value="acciones"
                control={<Radio />}
                label="Refresh de Acciones"
              />
            </RadioGroup>

            <TextField
              label="Comentario Adicional"
              placeholder="Escribe aquí información extra (ej: detalles de la marca, pilares de contenido, etc.)"
              multiline
              rows={3}
              fullWidth
              sx={{
                mt: 2,
                '& .MuiInputLabel-root': {
                  color: '#1a237e',
                },
                '& .MuiOutlinedInput-input': {
                  color: '#1a237e',
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'rgba(77, 171, 247, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(77, 171, 247, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4dabf7',
                    boxShadow: '0 0 0 2px rgba(77, 171, 247, 0.2)'
                  }
                }
              }}
              value={refreshComment}
              onChange={e => setRefreshComment(e.target.value)}
            />

            <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
              <Button
                onClick={() => setTabIndex(0)}
                sx={{
                  color: '#4dabf7',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 3,
                  py: 1,
                  borderRadius: '12px',
                  ':hover': {
                    background: 'rgba(77, 171, 247, 0.08)',
                    color: '#3a8bc8'
                  }
                }}
              >
                Volver a Editar
              </Button>
              <Button
                variant="contained"
                onClick={handleRefresh}
                sx={{
                  backgroundColor: '#4dabf7',
                  color: 'white',
                  borderRadius: '12px',
                  px: 3,
                  py: 1,
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
                Solicitar Refresh
              </Button>
            </Stack>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  )
}