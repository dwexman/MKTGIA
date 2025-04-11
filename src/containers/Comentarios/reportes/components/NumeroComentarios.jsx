import React, { useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography
} from '@mui/material';
import './numeroComentarios.css';


const NumeroComentarios = ({ data = [] }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const dataArray = Array.isArray(data) ? data : [];
  const displayedData = dataArray.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <Box className="comentarios-container">
      <Typography variant="h4" gutterBottom className="neon-title" sx={{ fontSize: '1.5rem' }}>
        Número Total de Comentarios por Publicación
      </Typography>

      <Table className="glow-table">
        <TableHead>
          <TableRow>
            <TableCell className="MuiTableCell-head">ID Publicación</TableCell>
            <TableCell className="MuiTableCell-head">Total de Comentarios</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedData.map((row) => (
            <TableRow 
            key={row.post_id}
              hover
              sx={{ '&:hover': { transform: 'scale(1.002)' } }}
            >
              <TableCell>{row.post_id}</TableCell>
              <TableCell>{row.total}</TableCell>
            </TableRow>
          ))}
          
          {/* Paginación integrada */}
          <TableRow>
            <TableCell colSpan={2} sx={{ padding: '0 !important', borderBottom: 'none' }}>
              <TablePagination
                component="div"
                count={dataArray.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[20]}
                sx={{
                  width: '100%',
                  margin: 0,
                  borderTop: '1px solid rgba(77, 171, 247, 0.2)',
                  '& .MuiToolbar-root': {
                    justifyContent: 'center',
                    width: '100%',
                    padding: '8px 0'
                  },
                  '& .MuiTablePagination-selectLabel': {
                    color: '#1a237e',
                    fontWeight: 500
                  },
                  '& .MuiTablePagination-displayedRows': {
                    color: '#1a237e',
                    fontWeight: 600
                  },
                  '& .MuiIconButton-root': {
                    color: '#1a237e',
                    '&:hover': {
                      backgroundColor: 'rgba(77, 171, 247, 0.15)',
                      borderRadius: '4px'
                    }
                  }
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default NumeroComentarios;