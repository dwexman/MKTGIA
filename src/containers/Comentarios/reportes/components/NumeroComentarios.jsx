import React, { useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter,
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
    </Box>
  );
};

export default NumeroComentarios;