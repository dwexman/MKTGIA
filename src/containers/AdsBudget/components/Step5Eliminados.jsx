import React, { useState } from 'react'
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination
} from '@mui/material'

const BACKGROUND_COLOR = 'rgba(16, 20, 55, 0.85)'
const PRIMARY_COLOR = '#4dabf7'
const TEXT_COLOR = 'rgba(255, 255, 255, 1)'
const BORDER_COLOR = 'rgba(77, 171, 247, 0.3)'

export default function Step5Eliminados({ data }) {
  // Filtramos solo los datos de hoy
  const today = new Date().toISOString().split('T')[0]

  // Datos dummy con campo fecha
  const dummyData = [
    { name: 'Campaña A', averageValue: 12.34, date: today },
    { name: 'Campaña B', averageValue: 8.56, date: today },
    { name: 'Campaña C', averageValue: 15.0, date: '2025-01-01' },
    { name: 'Campaña D', averageValue: 9.12, date: today },
    { name: 'Campaña E', averageValue: 11.11, date: today },
    { name: 'Campaña F', averageValue: 7.89, date: today },
    { name: 'Campaña G', averageValue: 7.89, date: today },
    { name: 'Campaña H', averageValue: 7.89, date: today }
  ]

  const rows = Array.isArray(data) && data.length > 0 ? data : dummyData
  const todayRows = rows.filter(r => r.date === today)

  // Paginación
  const rowsPerPage = 5
  const [page, setPage] = useState(0)
  const handleChangePage = (event, newPage) => setPage(newPage)

  const paginatedRows = todayRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Box sx={{
      p: 3,
      background: BACKGROUND_COLOR,
      backdropFilter: 'blur(12px)',
      borderRadius: '10px'
    }}>
      <Paper sx={{
        p: 3,
        background: 'rgba(16, 20, 55, 0.7)',
        border: `2px solid ${BORDER_COLOR}`,
        boxShadow: '0 0 15px rgba(77, 171, 247, 0.3)'
      }}>
        <Typography variant="h4" sx={{
          color: PRIMARY_COLOR,
          fontWeight: 700,
          mb: 3,
          textShadow: '0 0 12px rgba(77, 171, 247, 0.6)'
        }}>
          Conjunto de Anuncios Eliminados (10% de menor rendimiento)
        </Typography>

        <Table size="small" sx={{
          '& .MuiTableCell-root': {
            color: TEXT_COLOR,
            borderBottom: `1px solid ${BORDER_COLOR}`
          },
          '& .MuiTableHead-root': {
            borderBottom: `2px solid ${PRIMARY_COLOR}`
          }
        }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: PRIMARY_COLOR }}>Conjunto de anuncios</TableCell>
              <TableCell sx={{ fontWeight: 700, color: PRIMARY_COLOR }}>Valor promedio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, idx) => (
              <TableRow 
                key={idx}
                hover
                sx={{ '&:hover': { background: 'rgba(77, 171, 247, 0.1)' } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.averageValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={todayRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          sx={{
            color: TEXT_COLOR,
            '.MuiTablePagination-toolbar': {
              color: TEXT_COLOR
            },
            '.MuiTablePagination-selectIcon': {
              color: PRIMARY_COLOR
            }
          }}
        />
      </Paper>
    </Box>
  )
}