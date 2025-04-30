import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  Paper,
  Stack,
  Grid,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import './Estrategia.css';

export default function Estrategia() {
  // Estado de la estrategia guardada
  const [estrategia, setEstrategia] = useState({
    nombre: 'Mi Negocio',
    descripcion: 'Descripción de ejemplo de mi negocio',
    publicoObjetivo: 'Adultos jóvenes entre 25-35 años',
    tonoMarca: 'Amigable, Profesional, Innovador',
    objetivosMarketing: 'Aumentar engagement\nIncrementar ventas\nMejorar reconocimiento de marca',
    pilaresContenido:
      'Educación: Contenido que educa a nuestros clientes\n' +
      'Entretenimiento: Contenido divertido y atractivo\n' +
      'Promoción: Mostrar nuestros productos y servicios\n' +
      'Testimonios: Experiencias reales de clientes',
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

  return (
    <Box className="estrategia-container">
      <Paper className="estrategia-paper">
        <Box className="estrategia-content">
          <Typography variant="h4" className="estrategia-title">
            ESTRATEGIA DE CONTENIDO
          </Typography>

          <Grid container spacing={3} className="estrategia-grid">
            {/* Información Básica */}
            <Grid item xs={12} md={6}>
              <Card className="estrategia-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    Información Básica
                  </Typography>
                  <Typography className="card-text">
                    <strong>Nombre:</strong> {estrategia.nombre}
                  </Typography>
                  <Typography className="card-text">
                    <strong>Descripción:</strong> {estrategia.descripcion}
                  </Typography>
                  <Typography className="card-text">
                    <strong>Ubicación:</strong> {estrategia.ubicacionFisica}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Público Objetivo */}
            <Grid item xs={12} md={6}>
              <Card className="estrategia-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    Público Objetivo
                  </Typography>
                  <Typography className="card-text">
                    {estrategia.publicoObjetivo}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Tono de la Marca */}
            <Grid item xs={12} md={6}>
              <Card className="estrategia-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    Tono de la Marca
                  </Typography>
                  <Box className="chips-container">
                    {estrategia.tonoMarca.split(',').map((tono, idx) => (
                      <Chip key={idx} label={tono.trim()} className="chip-tono" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Ofertas */}
            <Grid item xs={12} md={6}>
              <Card className="estrategia-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    Ofertas Disponibles
                  </Typography>
                  <Box className="chips-container">
                    {estrategia.ofertas.split(',').map((oferta, idx) => (
                      <Chip key={idx} label={oferta.trim()} className="chip-oferta" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Objetivos de Marketing */}
            <Grid item xs={12}>
              <Card className="estrategia-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    Objetivos de Marketing
                  </Typography>
                  <Box component="ul" className="objectives-list">
                    {estrategia.objetivosMarketing.split('\n').map((obj, idx) => (
                      <li key={idx} className="objective-item">
                        {obj}
                      </li>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Pilares de Contenido */}
            <Grid item xs={12}>
              <Card className="estrategia-card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    Pilares de Contenido
                  </Typography>
                  <Box className="pilares-container">
                    {estrategia.pilaresContenido.split('\n').map((pilar, idx) => {
                      const [titulo, ...desc] = pilar.split(':');
                      return (
                        <Paper key={idx} className="pilar-paper">
                          <Typography variant="subtitle1" className="pilar-title">
                            {titulo.trim()}
                          </Typography>
                          {desc.length > 0 && (
                            <Typography className="pilar-text">
                              {desc.join(':').trim()}
                            </Typography>
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
          <Box className="buttons-container">
            <Button variant="outlined" onClick={handleCreate} className="create-button">
              Crear Nueva
            </Button>
            <Button variant="contained" onClick={handleOpenEdit} className="edit-button">
              Editar Estrategia
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Modal de Creación */}
      <Modal open={openCreateModal} onClose={handleCloseCreate}>
        <Box className="modal-container">
          <Box className="modal-content">
            <Typography variant="h5" className="modal-title">
              Crear Nueva Estrategia
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Nombre del Negocio"
                value={nuevaEstrategia.nombre}
                onChange={handleChangeField('nombre')}
                className="modal-field"
              />
              <TextField
                label="Descripción"
                value={nuevaEstrategia.descripcion}
                onChange={handleChangeField('descripcion')}
                multiline
                rows={3}
                className="modal-field"
              />
              <TextField
                label="Público Objetivo"
                value={nuevaEstrategia.publicoObjetivo}
                onChange={handleChangeField('publicoObjetivo')}
                className="modal-field"
              />
              <TextField
                label="Tono de la marca (separado por comas)"
                value={nuevaEstrategia.tonoMarca}
                onChange={handleChangeField('tonoMarca')}
                className="modal-field"
              />
              <TextField
                label="Objetivos de Marketing (uno por línea)"
                value={nuevaEstrategia.objetivosMarketing}
                onChange={handleChangeField('objetivosMarketing')}
                multiline
                rows={3}
                className="modal-field"
              />
              <TextField
                label="Pilares de contenido (uno por línea)"
                value={nuevaEstrategia.pilaresContenido}
                onChange={handleChangeField('pilaresContenido')}
                multiline
                rows={3}
                className="modal-field"
              />
              <TextField
                label="Ubicación Física"
                value={nuevaEstrategia.ubicacionFisica}
                onChange={handleChangeField('ubicacionFisica')}
                className="modal-field"
              />
              <TextField
                label="Ofertas disponibles (separado por comas)"
                value={nuevaEstrategia.ofertas}
                onChange={handleChangeField('ofertas')}
                className="modal-field"
              />
            </Stack>
            <Box className="modal-buttons">
              <Button onClick={handleCloseCreate} className="cancel-button">
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleSubmitCreate} className="submit-button">
                Guardar Estrategia
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Modal de Edición */}
      <Modal open={openEditModal} onClose={handleCloseEdit}>
        <Box className="modal-container">
          <Box className="modal-content">
            <Typography variant="h5" className="modal-title">
              Editar Estrategia
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Nombre del Negocio"
                value={nuevaEstrategia.nombre}
                onChange={handleChangeField('nombre')}
                className="modal-field"
              />
              <TextField
                label="Descripción"
                value={nuevaEstrategia.descripcion}
                onChange={handleChangeField('descripcion')}
                multiline
                rows={3}
                className="modal-field"
              />
              <TextField
                label="Público Objetivo"
                value={nuevaEstrategia.publicoObjetivo}
                onChange={handleChangeField('publicoObjetivo')}
                className="modal-field"
              />
              <TextField
                label="Tono de la marca (separado por comas)"
                value={nuevaEstrategia.tonoMarca}
                onChange={handleChangeField('tonoMarca')}
                className="modal-field"
              />
              <TextField
                label="Objetivos de Marketing (uno por línea)"
                value={nuevaEstrategia.objetivosMarketing}
                onChange={handleChangeField('objetivosMarketing')}
                multiline
                rows={3}
                className="modal-field"
              />
              <TextField
                label="Pilares de contenido (uno por línea)"
                value={nuevaEstrategia.pilaresContenido}
                onChange={handleChangeField('pilaresContenido')}
                multiline
                rows={3}
                className="modal-field"
              />
              <TextField
                label="Ubicación Física"
                value={nuevaEstrategia.ubicacionFisica}
                onChange={handleChangeField('ubicacionFisica')}
                className="modal-field"
              />
              <TextField
                label="Ofertas disponibles (separado por comas)"
                value={nuevaEstrategia.ofertas}
                onChange={handleChangeField('ofertas')}
                className="modal-field"
              />
            </Stack>
            <Box className="modal-buttons">
              <Button onClick={handleCloseEdit} className="cancel-button">
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleSubmitEdit} className="submit-button">
                Guardar Cambios
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
