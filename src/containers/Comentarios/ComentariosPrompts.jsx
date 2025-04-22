import React, { useState, useEffect } from 'react';
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
  TablePagination,
  TableFooter,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import './comentariosPrompts.css';

const ComentariosPrompts = () => {
  // Modal para agregar un nuevo prompt
  const [openModal, setOpenModal] = useState(false);
  const [newPrompt, setNewPrompt] = useState('');

  // Modal para visualizar un prompt existente
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const [promptData, setPromptData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  // Conecta al endpoint y extrae la propiedad "prompts"
  useEffect(() => {
    fetch('https://www.mrkt21.com/comentarios/comentarios_prompts/API/', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setPromptData(result.prompts || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching prompts: ", error);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSavePrompt = () => {
    fetch('https://www.mrkt21.com/comentarios/comentarios_prompts/API/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: newPrompt })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al guardar el prompt: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPromptData(data.prompts || []);
        setNewPrompt('');
        handleCloseModal();
      })
      .catch(error => {
        console.error("Error al guardar el prompt: ", error);
      });
  };

  // Función para visualizar el prompt completo en el modal de vista
  const handleViewPrompt = (promptText) => {
    setSelectedPrompt(promptText);
    setOpenViewModal(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Pagina los datos ordenados de mas reciente a mas antiguo
  const dataArray = Array.isArray(promptData) ? promptData : [];
  const sortedData = [...dataArray].sort((a, b) => {
    // a[3] === "TRUE" => ACTIVO
    if (a[3] === "TRUE" && b[3] !== "TRUE") return -1;
    if (a[3] !== "TRUE" && b[3] === "TRUE") return 1;
    // si ambos son iguales en estado, ordena por fecha (más reciente primero)
    return new Date(b[1]) - new Date(a[1]);
  });
  const displayedData = sortedData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Box className="comentarios-container">
      <Typography variant="h4" gutterBottom className="prompts-title">
        Gestión de Prompts
      </Typography>

      {loading ? (
        <Typography variant="body1">Cargando datos...</Typography>
      ) : (
        <>
          <Box
            className="table-container"
            sx={{
              width: '90%',
              maxWidth: '800px',
              margin: '0 auto',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
              border: '2px solid rgba(77, 171, 247, 0.4)',
              p: 3,
              mt: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(31, 38, 135, 0.25)'
              }
            }}
          >
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              padding: '0 16px'
            }}>
              <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 600 }}>
              </Typography>
              <Tooltip title="Agrega un nuevo prompt">
                <Button variant="contained" onClick={handleOpenModal} className="prompts-button">
                  <AddIcon sx={{ mr: 1 }} /> Prompt
                </Button>
              </Tooltip>
            </Box>

            <Table className="prompts-table" sx={{ width: '100%' }}>
              <TableHead>
                <TableRow sx={{
                  '& th:first-child': { borderTopLeftRadius: '12px' },
                  '& th:last-child': { borderTopRightRadius: '12px' }
                }}>
                  <TableCell className="fecha-column">Fecha de Creación</TableCell>
                  <TableCell className="estado-column">Estado</TableCell>
                  <TableCell className="prompt-column">Prompt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((promptArray, index) => (
                  <TableRow key={index} hover>
                    <TableCell className="fecha-column">
                      {new Date(promptArray[1]).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="estado-column" sx={{
                      textAlign: 'center',
                      backgroundColor: promptArray[3] === "TRUE" ? 'rgba(57, 255, 20, 0.15)' : 'rgba(255, 49, 49, 0.15)',
                      color: promptArray[3] === "TRUE" ? '#1a5e1a' : '#8b0000',
                      fontWeight: 600,
                      borderRadius: '16px',
                      width: '60px',
                      height: '12px',
                      marginTop: '15px',
                      padding: '3px 3px 5px 3px',
                      display: 'inline-block'
                    }}>
                      {promptArray[3] === "TRUE" ? "ACTIVO" : "INACTIVO"}
                    </TableCell>
                    <TableCell className="prompt-column">
                      <Button
                        variant="outlined"
                        onClick={() => handleViewPrompt(promptArray[2])}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(77, 171, 247, 0.08)'
                          }
                        }}
                      >
                        Ver prompt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} sx={{ p: 0, borderTop: '1px solid rgba(77, 171, 247, 0.2)' }}>
                    <TablePagination
                      component="div"
                      count={dataArray.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[20]}
                      sx={{
                        '& .MuiToolbar-root': { justifyContent: 'center' },
                        '& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                          color: '#1a237e'
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Box>

          {/* Modal para agregar un nuevo prompt */}
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              className="prompts-modal"
              sx={{
                width: '80vw',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 2
              }}
            >
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
                  rows={10}
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

          {/* Modal para visualizar un prompt existente */}
          <Modal open={openViewModal} onClose={() => setOpenViewModal(false)}>
            <Box
              className="prompt-view-modal-container"
              sx={{
                width: '80vw',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 2,
                background: 'linear-gradient(150deg, #f8f9ff 0%, #e6f0ff 100%)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)'
              }}
            >
              <Paper
                className="prompt-view-modal-content"
                sx={{
                  p: 3,
                  maxWidth: '750px',
                  margin: '0 auto',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                  position: 'relative'
                }}
              >
                <IconButton
                  className="modal-close-button"
                  onClick={() => setOpenViewModal(false)}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: '#e63946'
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" gutterBottom className="prompt-view-modal-title">
                  Detalle del Prompt
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.5,
                    color: '#2c3e50'
                  }}
                >
                  {selectedPrompt}
                </Typography>
              </Paper>
            </Box>
          </Modal>
        </>
      )
      }
    </Box >
  );
};

export default ComentariosPrompts;
