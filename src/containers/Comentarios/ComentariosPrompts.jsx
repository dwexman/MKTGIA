import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 
import './ComentariosPrompts.css';

const ComentariosPrompts = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newPrompt, setNewPrompt] = useState('');

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSavePrompt = () => {
    console.log('Guardando prompt:', newPrompt);
    setNewPrompt('');
    handleCloseModal();
  };

  return (
    <Box className="comentarios-container">
      <Typography variant="h4" gutterBottom className="neon-title">
        Gestión de Prompts
      </Typography>

      <Table className="prompts-table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha de Creación</TableCell>
            <TableCell>Prompt</TableCell>
            <TableCell>Activo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>2025-04-09</TableCell>
            <TableCell>Ejemplo de Prompt</TableCell>
            <TableCell>Sí</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button 
        variant="contained" 
        onClick={handleOpenModal}
        className="prompts-button"
      >
        Agregar nuevo Prompt
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="prompts-modal">
          <Paper className="modal-content">
          <IconButton 
              className="modal-close-button"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: '#e63946'
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom className="prompts-title modal-title">
              Nuevo Prompt
            </Typography>
            
            <TextField
              className="custom-textfield"
              label="Escribe tu prompt"
              multiline
              rows={4}
              fullWidth
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              InputLabelProps={{
                style: { color: '#9ca3af' }
              }}
              sx={{ mb: 2 }}
            />
            
            <Box className="modal-actions">
              <Button
                variant="outlined"
                onClick={handleCloseModal}
                className="modal-cancel-button"
              >
                Cancelar
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSavePrompt}
                className="modal-save-button"
              >
                Guardar
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default ComentariosPrompts;