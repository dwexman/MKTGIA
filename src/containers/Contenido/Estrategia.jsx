import React, { useState } from 'react';
import { 
  Box, Typography, Button, TextField, Modal, Paper, Stack, Divider, Chip, Grid, Card, CardContent 
} from '@mui/material';

export default function Estrategia() {
  // Estado de la estrategia guardada
  const [estrategia, setEstrategia] = useState({
    nombre: 'Mi Negocio',
    descripcion: 'Descripción de ejemplo de mi negocio',
    publicoObjetivo: 'Adultos jóvenes entre 25-35 años',
    tonoMarca: 'Amigable, Profesional, Innovador',
    objetivosMarketing: 'Aumentar engagement\nIncrementar ventas\nMejorar reconocimiento de marca',
    pilaresContenido: 'Educación: Contenido que educa a nuestros clientes\nEntretenimiento: Contenido divertido y atractivo\nPromoción: Mostrar nuestros productos y servicios\nTestimonios: Experiencias reales de clientes',
    ubicacionFisica: 'Av. Principal 123, Ciudad',
    ofertas: 'Descuentos, Promociones, Lanzamientos'
  });

  // Estado para el formulario
  const initialEstrategia = {
    nombre: '',
    descripcion: '',
    publicoObjetivo: '',
    tonoMarca: '',
    objetivosMarketing: '',
    pilaresContenido: '',
    ubicacionFisica: '',
    ofertas: ''
  };
  const [nuevaEstrategia, setNuevaEstrategia] = useState(initialEstrategia);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Handlers
  const handleCreate = () => {
    setNuevaEstrategia(initialEstrategia);
    setOpenCreateModal(true);
  };
  const handleCloseCreate = () => setOpenCreateModal(false);
  const handleOpenEdit = () => {
    setNuevaEstrategia(estrategia);
    setOpenEditModal(true);
  };
  const handleCloseEdit = () => setOpenEditModal(false);

  const handleChangeField = (field) => (e) => {
    setNuevaEstrategia({ ...nuevaEstrategia, [field]: e.target.value });
  };

  const handleSubmitCreate = () => {
    setEstrategia(nuevaEstrategia);
    handleCloseCreate();
  };
  const handleSubmitEdit = () => {
    setEstrategia(nuevaEstrategia);
    handleCloseEdit();
  };

  // Estilos
  const styles = {
    colors: {
      primary: '#4dabf7',
      secondary: '#1a237e',
      textLight: '#ffffff',
      border: 'rgba(77, 171, 247, 0.3)',
      darkBg: 'rgba(16, 20, 55, 0.98)',
      cardBg: 'rgba(26, 35, 126, 0.2)',
      chipTonoBg: 'rgba(77, 171, 247, 0.2)',
      chipOfertaBg: 'rgba(26, 35, 126, 0.4)',
      pilarBg: 'rgba(77, 171, 247, 0.1)'
    },
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
      maxWidth: 800,
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
    card: {
      backgroundColor: 'rgba(26, 35, 126, 0.2)',
      border: '1px solid #4dabf7',
      borderRadius: 2,
      height: '100%'
    },
    cardTitle: {
      color: '#4dabf7',
      mb: 2,
      fontSize: '1.25rem',
      fontWeight: 600,
      borderBottom: '1px solid rgba(77, 171, 247, 0.3)',
      pb: 1
    },
    cardText: {
      color: '#ffffff',
      mb: 1,
      fontSize: '0.875rem'
    },
    chipsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 1
    },
    chipTono: {
      color: '#ffffff',
      backgroundColor: 'rgba(77, 171, 247, 0.2)',
      border: '1px solid #4dabf7'
    },
    chipOferta: {
      color: '#ffffff',
      backgroundColor: 'rgba(26, 35, 126, 0.4)',
      border: '1px solid #1a237e'
    },
    objectivesList: {
      pl: 2,
      color: '#ffffff',
      m: 0,
      '& li': {
        mb: 1,
        fontSize: '0.875rem'
      }
    },
    pilaresContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      maxHeight: 300,
      overflowY: 'auto',
      pr: 1,
      '&::-webkit-scrollbar': {
        width: '6px'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#4dabf7',
        borderRadius: '3px'
      }
    },
    pilarPaper: {
      p: 2,
      backgroundColor: 'rgba(77, 171, 247, 0.1)',
      border: '1px solid #4dabf7',
      borderRadius: 1
    },
    pilarTitle: {
      color: '#4dabf7',
      mb: 1,
      fontWeight: 600,
      fontSize: '1rem'
    },
    pilarText: {
      color: '#ffffff',
      fontSize: '0.875rem',
      wordBreak: 'break-word'
    },
    buttonsContainer: {
      display: 'flex',
      gap: 2,
      justifyContent: 'center',
      mt: 3,
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center'
      }
    },
    createButton: {
      color: '#4dabf7',
      borderColor: '#4dabf7',
      textTransform: 'none',
      fontWeight: 500,
      '&:hover': {
        borderColor: '#4dabf7',
        backgroundColor: 'rgba(77, 171, 247, 0.1)'
      }
    },
    editButton: {
      background: 'linear-gradient(145deg, #4dabf7 0%, #1a237e 100%)',
      color: '#ffffff',
      fontWeight: 600,
      textTransform: 'none',
      '&:hover': {
        background: 'linear-gradient(145deg, #1a237e 0%, #4dabf7 100%)',
        boxShadow: '0 0 15px rgba(77, 171, 247, 0.5)'
      }
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '95%',
      maxWidth: 700,
      maxHeight: '90vh',
      bgcolor: 'rgba(16, 20, 55, 0.98)',
      boxShadow: 24,
      p: 1,
      borderRadius: '10px',
      border: '5px solid rgba(77, 171, 247, 0.3)',
      overflow: 'auto',
      outline: 'none',
      '@media (max-width: 768px)': {
        width: '98%',
        p: 0.5
      }
    },
    modalContent: {
      p: 3,
      border: '1px solid #4dabf7',
      borderRadius: 2,
      '@media (max-width: 768px)': {
        p: 2
      }
    },
    modalTitle: {
      mb: 3,
      fontWeight: 700,
      fontSize: '1.5rem',
      color: '#4dabf7',
      textAlign: 'center',
      textShadow: '0 0 8px rgba(77, 171, 247, 0.6)'
    },
    modalField: {
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
      '& .MuiInputBase-input::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 1
      }
    },
    modalButtons: {
      mt: 4,
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 2
    },
    cancelButton: {
      color: '#4dabf7',
      border: '1px solid #4dabf7',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: 'rgba(77, 171, 247, 0.1)'
      }
    },
    submitButton: {
      background: 'linear-gradient(145deg, #4dabf7 0%, #1a237e 100%)',
      color: '#ffffff',
      fontWeight: 600,
      textTransform: 'none',
      '&:hover': {
        background: 'linear-gradient(145deg, #1a237e 0%, #4dabf7 100%)',
        boxShadow: '0 0 10px rgba(77, 171, 247, 0.5)'
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <Paper sx={styles.paper}>
        <Box sx={styles.content}>
          <Typography variant="h4" sx={styles.title}>
            ESTRATEGIA DE CONTENIDO
          </Typography>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Información Básica */}
            <Grid item xs={12} md={6}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6" sx={styles.cardTitle}>Información Básica</Typography>
                  <Typography sx={styles.cardText}><strong>Nombre:</strong> {estrategia.nombre}</Typography>
                  <Typography sx={styles.cardText}><strong>Descripción:</strong> {estrategia.descripcion}</Typography>
                  <Typography sx={styles.cardText}><strong>Ubicación:</strong> {estrategia.ubicacionFisica}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Público Objetivo */}
            <Grid item xs={12} md={6}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6" sx={styles.cardTitle}>Público Objetivo</Typography>
                  <Typography sx={styles.cardText}>{estrategia.publicoObjetivo}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Tono de la Marca */}
            <Grid item xs={12} md={6}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6" sx={styles.cardTitle}>Tono de la Marca</Typography>
                  <Box sx={styles.chipsContainer}>
                    {estrategia.tonoMarca.split(',').map((tono, index) => (
                      <Chip key={index} label={tono.trim()} sx={styles.chipTono} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Ofertas */}
            <Grid item xs={12} md={6}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6" sx={styles.cardTitle}>Ofertas Disponibles</Typography>
                  <Box sx={styles.chipsContainer}>
                    {estrategia.ofertas.split(',').map((oferta, index) => (
                      <Chip key={index} label={oferta.trim()} sx={styles.chipOferta} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Objetivos de Marketing */}
            <Grid item xs={12}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6" sx={styles.cardTitle}>Objetivos de Marketing</Typography>
                  <Box component="ul" sx={styles.objectivesList}>
                    {estrategia.objetivosMarketing.split('\n').map((obj, index) => (
                      <li key={index}>{obj}</li>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Pilares de Contenido */}
            <Grid item xs={12}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6" sx={styles.cardTitle}>Pilares de Contenido</Typography>
                  <Box sx={styles.pilaresContainer}>
                    {estrategia.pilaresContenido.split('\n').map((pilar, index) => {
                      const [titulo, ...descripcion] = pilar.split(':');
                      return (
                        <Paper key={index} sx={styles.pilarPaper}>
                          <Typography variant="subtitle1" sx={styles.pilarTitle}>
                            {titulo.trim()}
                          </Typography>
                          {descripcion.length > 0 && (
                            <Typography sx={styles.pilarText}>{descripcion.join(':').trim()}</Typography>
                          )}
                        </Paper>
                      );
                    })}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Botones */}
          <Box sx={styles.buttonsContainer}>
            <Button variant="outlined" onClick={handleCreate} sx={styles.createButton}>
              Crear Nueva
            </Button>
            <Button variant="contained" onClick={handleOpenEdit} sx={styles.editButton}>
              Editar Estrategia
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Modal de Creación */}
      <Modal open={openCreateModal} onClose={handleCloseCreate}>
        <Box sx={styles.modal}>
          <Box sx={styles.modalContent}>
            <Typography variant="h5" sx={styles.modalTitle}>Crear Nueva Estrategia</Typography>
            <Stack spacing={2}>
              <TextField 
                label="Nombre del Negocio" 
                value={nuevaEstrategia.nombre} 
                onChange={handleChangeField('nombre')} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Descripción" 
                value={nuevaEstrategia.descripcion} 
                onChange={handleChangeField('descripcion')} 
                multiline 
                rows={3} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Público Objetivo" 
                value={nuevaEstrategia.publicoObjetivo} 
                onChange={handleChangeField('publicoObjetivo')} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Tono de la marca (separado por comas)" 
                value={nuevaEstrategia.tonoMarca} 
                onChange={handleChangeField('tonoMarca')} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Objetivos de Marketing (uno por línea)" 
                value={nuevaEstrategia.objetivosMarketing} 
                onChange={handleChangeField('objetivosMarketing')} 
                multiline 
                rows={3} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Pilares de contenido (uno por línea)" 
                value={nuevaEstrategia.pilaresContenido} 
                onChange={handleChangeField('pilaresContenido')} 
                multiline 
                rows={3} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Ubicación Física" 
                value={nuevaEstrategia.ubicacionFisica} 
                onChange={handleChangeField('ubicacionFisica')} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Ofertas disponibles (separado por comas)" 
                value={nuevaEstrategia.ofertas} 
                onChange={handleChangeField('ofertas')} 
                sx={styles.modalField} 
              />
            </Stack>
            <Box sx={styles.modalButtons}>
              <Button onClick={handleCloseCreate} sx={styles.cancelButton}>Cancelar</Button>
              <Button variant="contained" onClick={handleSubmitCreate} sx={styles.submitButton}>Guardar Estrategia</Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Modal de Edición */}
      <Modal open={openEditModal} onClose={handleCloseEdit}>
        <Box sx={styles.modal}>
          <Box sx={styles.modalContent}>
            <Typography variant="h5" sx={styles.modalTitle}>Editar Estrategia</Typography>
            <Stack spacing={2}>
              <TextField 
                label="Nombre del Negocio" 
                value={nuevaEstrategia.nombre} 
                onChange={handleChangeField('nombre')} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Descripción" 
                value={nuevaEstrategia.descripcion} 
                onChange={handleChangeField('descripcion')} 
                multiline 
                rows={3} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Público Objetivo" 
                value={nuevaEstrategia.publicoObjetivo} 
                onChange={handleChangeField('publicoObjetivo')} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Tono de la marca (separado por comas)" 
                value={nuevaEstrategia.tonoMarca} 
                onChange={handleChangeField('tonoMarca')} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Objetivos de Marketing (uno por línea)" 
                value={nuevaEstrategia.objetivosMarketing} 
                onChange={handleChangeField('objetivosMarketing')} 
                multiline 
                rows={3} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Pilares de contenido (uno por línea)" 
                value={nuevaEstrategia.pilaresContenido} 
                onChange={handleChangeField('pilaresContenido')} 
                multiline 
                rows={3} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Ubicación Física" 
                value={nuevaEstrategia.ubicacionFisica} 
                onChange={handleChangeField('ubicacionFisica')} 
                sx={styles.modalField} 
              />
              <TextField 
                label="Ofertas disponibles (separado por comas)" 
                value={nuevaEstrategia.ofertas} 
                onChange={handleChangeField('ofertas')} 
                sx={styles.modalField} 
              />
            </Stack>
            <Box sx={styles.modalButtons}>
              <Button onClick={handleCloseEdit} sx={styles.cancelButton}>Cancelar</Button>
              <Button variant="contained" onClick={handleSubmitEdit} sx={styles.submitButton}>Guardar Cambios</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}