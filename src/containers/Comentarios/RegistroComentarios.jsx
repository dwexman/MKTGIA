import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination
} from '@mui/material';
import './RegistroComentarios.css';

const RegistroComentarios = () => {

  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    fetch('https://www.mrkt21.com/comentarios/registro_comentarios/API/', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const sortedComments = (data.comments || []).sort((a, b) => new Date(b.date) - new Date(a.date));
        setComentarios(sortedComments || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los comentarios: ', error);
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const dataArray = Array.isArray(comentarios) ? comentarios : [];
  const displayedData = dataArray.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Box className="comentarios-container" sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom className="registro-title">
        Registro de Comentarios
      </Typography>
      <Typography variant="subtitle2" gutterBottom className="registro-subtitle">
        Revisa tus comentarios en Instagram y Facebook:
      </Typography>

      {loading ? (
        <Typography variant="body1">Cargando datos...</Typography>
      ) : (
        <Table className="registro-table" sx={{ marginTop: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Plataforma</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>ID de Publicación</TableCell>
              <TableCell>Respuesta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((comentario, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(comentario.date)}</TableCell>
                <TableCell>{comentario.platform || ''}</TableCell>
                <TableCell>{comentario.name || 'Anónimo'}</TableCell>
                <TableCell>{comentario.message || ''}</TableCell>
                <TableCell>{comentario.post_id || ''}</TableCell>
                <TableCell>{comentario.Reply_Message || ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={6}
                sx={{
                  borderTop: '1px solid rgba(77, 171, 247, 0.2)',
                  p: 0
                }}
              >
                <TablePagination
                  component="div"
                  count={dataArray.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[20]}
                  sx={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    margin: 0,
                    '& .MuiToolbar-root': {
                      justifyContent: 'center',
                      width: '100%',
                      padding: '8px 0'
                    },
                    '& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                      color: '#1a237e'
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </Box>
  );
};

export default RegistroComentarios;