import React, { useState } from 'react'
import {
  Box,
  Table, TableHead, TableRow, TableCell, TableBody,
  TextField, Button, Typography, Stack, Paper,
  TablePagination, CircularProgress
} from '@mui/material'
import PropTypes from 'prop-types'

const BACKGROUND_COLOR = 'rgba(16, 20, 55, 0.85)'
const PRIMARY_COLOR = '#4dabf7'
const SECONDARY_COLOR = '#1a237e'
const TEXT_COLOR = 'rgba(255, 255, 255, 1)'
const BORDER_COLOR = 'rgba(77, 171, 247, 0.3)'
const ROWS_PER_PAGE = 10

export default function RoiInput({ campaigns, onBack, onSubmit, loading = false }) {
  const [roiValues, setRoiValues] = useState({})
  const [page, setPage] = useState(0)

  const handleChange = id => e => {
    let value = e.target.value.replace(/[^0-9.]/g, '');        
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    setRoiValues(vals => ({ ...vals, [id]: value }));
  }

  const visibleCampaigns = campaigns.slice(
    page * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE + ROWS_PER_PAGE
  )

  const allFilled = visibleCampaigns.every(c => roiValues[c.id]?.trim())

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const showPagination = campaigns.length > ROWS_PER_PAGE

  return (
    <Paper sx={{
      p: 3,
      background: BACKGROUND_COLOR,
      backdropFilter: 'blur(12px)',
      border: `4px solid ${BORDER_COLOR}`,
      borderRadius: '10px',
      boxShadow: '8px 8px 10px rgba(77, 171, 247, 0.6)',
      // quitamos minHeight para que el contenido se adapte
    }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: PRIMARY_COLOR,
          textShadow: '0 0 12px rgba(77, 171, 247, 0.6)',
          fontSize: '1.5rem'
        }}
      >
        INGRESO ROI POR CONJUNTO DE ANUNCIO
      </Typography>

      <Table sx={{
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
            <TableCell sx={{ fontWeight: 700, color: PRIMARY_COLOR }}>Campaña</TableCell>
            <TableCell sx={{ fontWeight: 700, color: PRIMARY_COLOR }}>Nombre Conjunto</TableCell>
            <TableCell sx={{ fontWeight: 700, color: PRIMARY_COLOR }}>ROI a ingresar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleCampaigns.map(c => (
            <TableRow
              key={c.id}
              hover
              sx={{ '&:hover': { background: 'rgba(77, 171, 247, 0.1)' } }}
            >
              <TableCell>{c.name.split(' - ')[0]}</TableCell>
              <TableCell>{c.name.split(' - ')[1] || '—'}</TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={roiValues[c.id] || ''}
                  onChange={handleChange(c.id)}
                  placeholder="Ej: 1.25"
                  size="small"
                  InputProps={{
                    inputMode: 'decimal',
                    pattern: '[0-9]*[.]?[0-9]*',
                    sx: {
                      color: TEXT_COLOR,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: BORDER_COLOR },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: PRIMARY_COLOR },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: PRIMARY_COLOR,
                        boxShadow: '0 0 10px rgba(77, 171, 247, 0.3)'
                      }
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showPagination && (
        <TablePagination
          component="div"
          count={campaigns.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={ROWS_PER_PAGE}
          rowsPerPageOptions={[]}
          sx={{
            color: TEXT_COLOR,
            '.MuiTablePagination-toolbar': {
              color: TEXT_COLOR
            }
          }}
        />
      )}

      <Stack direction="row" justifyContent="center" spacing={3} sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            px: 4,
            borderColor: PRIMARY_COLOR,
            color: PRIMARY_COLOR,
            '&:hover': {
              borderColor: PRIMARY_COLOR,
              background: 'rgba(77, 171, 247, 0.1)'
            }
          }}
        >
          Volver
        </Button>
        <Button
          variant="contained"
          disabled={!allFilled || loading}
          onClick={() => onSubmit(roiValues)}
          sx={{
            px: 4,
            background: `linear-gradient(145deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`,
            color: TEXT_COLOR,
            fontWeight: 700,
            boxShadow: '0 0 15px rgba(77, 171, 247, 0.3)',
            '&:hover': {
              background: `linear-gradient(145deg, ${SECONDARY_COLOR} 0%, ${PRIMARY_COLOR} 100%)`,
              boxShadow: '0 0 25px rgba(77, 171, 247, 0.5)'
            }
          }}
        >
          {loading
            ? <CircularProgress size={22} sx={{ color: '#fff' }} />
            : 'Enviar ROI'}
        </Button>
      </Stack>
    </Paper>
  )
}

RoiInput.propTypes = {
  campaigns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading:  PropTypes.bool
}
