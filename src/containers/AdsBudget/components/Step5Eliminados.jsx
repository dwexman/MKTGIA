import React, { useState } from 'react';
import {
  Box, Typography, Table, TableHead,
  TableRow, TableCell, TableBody,
  Paper, TablePagination
} from '@mui/material';

const BG  = 'rgba(16, 20, 55, 0.85)';
const PRI = '#4dabf7';
const TXT = 'rgba(255,255,255,1)';
const BOR = 'rgba(77,171,247,0.3)';

export default function Step5Eliminados({ data = [] }) {
  /* si el backend no eliminó nada */
  if (!data.length) {
    return (
      <Typography sx={{ color: TXT, mt: 2 }}>
        No se eliminaron conjuntos de anuncios.
      </Typography>
    );
  }

  /* paginación */
  const rowsPerPage = 8;
  const [page, setPage] = useState(0);
  const handleChangePage = (_, p) => setPage(p);
  const pageRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 3, background: BG, backdropFilter: 'blur(12px)', borderRadius: '10px' }}>
      <Paper sx={{
        p: 3,
        background: 'rgba(16, 20, 55, 0.7)',
        border: `2px solid ${BOR}`,
        boxShadow: '0 0 15px rgba(77,171,247,0.3)'
      }}>
        <Typography variant="h4" sx={{
          color: PRI, fontWeight: 700, mb: 3,
          textShadow: '0 0 12px rgba(77,171,247,0.6)'
        }}>
          Conjuntos de anuncios eliminados (10 % peor rendimiento)
        </Typography>

        <Table size="small" sx={{
          '& .MuiTableCell-root': { color: TXT, borderBottom: `1px solid ${BOR}` },
          '& .MuiTableHead-root': { borderBottom: `2px solid ${PRI}` }
        }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: PRI }}>Conjunto</TableCell>
              <TableCell sx={{ fontWeight: 700, color: PRI }}>Valor promedio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageRows.map(row => (
              <TableRow key={row.adset_id} hover
                sx={{ '&:hover': { background: 'rgba(77,171,247,0.1)' } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.average_value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {data.length > rowsPerPage && (
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
            sx={{ color: TXT }}
          />
        )}
      </Paper>
    </Box>
  );
}
