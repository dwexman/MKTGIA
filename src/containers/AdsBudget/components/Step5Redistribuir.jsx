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
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'

const BACKGROUND_COLOR = 'rgba(16, 20, 55, 0.95)'
const PRIMARY_COLOR = '#4dabf7'
const TEXT_COLOR = 'rgba(255, 255, 255, 1)'
const BORDER_COLOR = 'rgba(77, 171, 247, 0.3)'

export default function OptimizationRegister() {
  // Datos iniciales
  const initialData = [
    {
      titulo: 'Campaña A',
      tipo: 'Typo 1',
      costo: 0.5,
      presupuesto: 1000,
      porcentaje: '10%',
      nuevo: 1100,
      antes: 200,
      despues: 220
    },
    {
      titulo: 'Campaña B',
      tipo: 'Typo 2',
      costo: 1.2,
      presupuesto: 2000,
      porcentaje: '20%',
      nuevo: 2400,
      antes: 150,
      despues: 180
    }
  ]

  // State: filas con valor editable
  const [rows, setRows] = useState(
    initialData.map(row => ({ ...row, inputValue: row.nuevo.toString() }))
  )
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // Al cambiar el input, solo dígitos
  const handleInputChange = (index, value) => {
    const onlyNums = value.replace(/[^0-9]/g, '')
    setRows(prev =>
      prev.map((r, i) =>
        i === index ? { ...r, inputValue: onlyNums } : r
      )
    )
  }

  // Guardar el valor nuevo para la fila
  const handleSave = index => {
    setRows(prev =>
      prev.map((r, i) =>
        i === index
          ? { ...r, nuevo: Number(r.inputValue) }
          : r
      )
    )
  }

  // Calcular totales dinámicos
  const totals = rows.reduce(
    (acc, r) => {
      acc.presupuesto += r.presupuesto
      acc.nuevo += r.nuevo
      acc.antes += r.antes
      acc.despues += r.despues
      return acc
    },
    { presupuesto: 0, nuevo: 0, antes: 0, despues: 0 }
  )

  return (
    <Box sx={{
      p: 3,
      background: BACKGROUND_COLOR,
      backdropFilter: 'blur(12px)',
      borderRadius: '10px',
      minWidth: '930px',
      mx: '-190px',
      border: `2px solid ${BORDER_COLOR}`,
      boxShadow: '0 0 20px rgba(77, 171, 247, 0.3)'
    }}>
      <Typography variant="h4" sx={{
        color: PRIMARY_COLOR,
        fontWeight: 700,
        mb: 3,
        textAlign: 'center',
        textShadow: '0 0 12px rgba(77, 171, 247, 0.6)'
      }}>
        Registro de la Optimización
      </Typography>

      <Paper sx={{
        p: 2,
        mb: 3,
        background: 'rgba(16, 20, 55, 0.7)',
        border: `1px solid ${BORDER_COLOR}`,
        overflowX: 'auto',
      }}>
        <Table size="medium" sx={{
          width: '100%',
          '& .MuiTableCell-root': {
            color: TEXT_COLOR,
            borderColor: BORDER_COLOR,
            whiteSpace: 'nowrap',
            py: 1
          },
          '& .MuiTableHead-root': {
            borderBottom: `2px solid ${PRIMARY_COLOR}`
          }
        }}>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Costo/métrica</TableCell>
              <TableCell>Presupuesto anterior</TableCell>
              <TableCell>% anterior</TableCell>
              <TableCell>Nuevo presupuesto</TableCell>
              <TableCell>Métrica antes</TableCell>
              <TableCell>Métrica después</TableCell>
              <TableCell>
                <Tooltip title="Edita tu nuevo presupuesto">
                  <span>Editar nuevo</span>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx} hover sx={{ '&:hover': { background: 'rgba(77, 171, 247, 0.05)' } }}>
                <TableCell>{row.titulo}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>${row.costo}</TableCell>
                <TableCell>${row.presupuesto}</TableCell>
                <TableCell>{row.porcentaje}</TableCell>
                <TableCell>${row.nuevo}</TableCell>
                <TableCell>{row.antes}</TableCell>
                <TableCell>{row.despues}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      size="small"
                      type="number"
                      value={row.inputValue}
                      onChange={e => handleInputChange(idx, e.target.value)}
                      sx={{
                        width: 100,
                        '& .MuiInputBase-input': {
                          color: TEXT_COLOR,
                          py: 0.5,
                          fontSize: '0.875rem'
                        },
                        '& fieldset': { borderColor: BORDER_COLOR }
                      }}
                    />
                    <Tooltip title="Guardar nuevo presupuesto">
                      <IconButton
                        size="small"
                        onClick={() => handleSave(idx)}
                        sx={{ color: PRIMARY_COLOR }}
                      >
                        <SaveIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}

            {/* Totales */}
            <TableRow sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderTop: `2px solid ${BORDER_COLOR}`,
              '& td': {
                fontWeight: 700,
                color: PRIMARY_COLOR
              }
            }}>
              <TableCell colSpan={3}>Totales</TableCell>
              <TableCell>${totals.presupuesto}</TableCell>
              <TableCell></TableCell>
              <TableCell>${totals.nuevo}</TableCell>
              <TableCell>{totals.antes}</TableCell>
              <TableCell>{totals.despues}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{
            borderColor: PRIMARY_COLOR,
            color: PRIMARY_COLOR,
            '&:hover': {
              background: 'rgba(77, 171, 247, 0.1)'
            }
          }}
        >
          Confirmar Actualización
        </Button>
      </Box>

      {/* Diálogo de confirmación */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(26, 30, 75, 0.98)',
            backdropFilter: 'blur(15px)',
            borderRadius: '12px',
            border: `2px solid ${BORDER_COLOR}`,
            boxShadow: '0 0 30px rgba(77, 171, 247, 0.4)'
          }
        }}
      >
        <DialogTitle sx={{
          color: PRIMARY_COLOR,
          fontWeight: 700,
          fontSize: '1.5rem',
          borderBottom: `1px solid ${BORDER_COLOR}`,
          background: 'rgba(16, 20, 55, 0.6)',
          position: 'relative',
          pr: 6
        }}>
          Confirmar Actualización de Presupuestos
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#e63946',
              '&:hover': {
                color: '#ff0a0a',
                transform: 'translateY(-50%) rotate(90deg)',
                backgroundColor: 'rgba(230, 57, 70, 0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography sx={{ color: TEXT_COLOR, mb: 2 }}>
            Revisa los nuevos presupuestos antes de confirmar:
          </Typography>
          <Paper sx={{ p: 2, background: 'rgba(16, 20, 55, 0.7)', border: `1px solid ${BORDER_COLOR}` }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: PRIMARY_COLOR }}>Conjunto de anuncios</TableCell>
                  <TableCell align="right" sx={{ color: PRIMARY_COLOR }}>Presupuesto actual</TableCell>
                  <TableCell align="right" sx={{ color: PRIMARY_COLOR }}>Nuevo presupuesto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ color: TEXT_COLOR }}>{row.titulo}</TableCell>
                    <TableCell align="right" sx={{ color: TEXT_COLOR }}>${row.presupuesto}</TableCell>
                    <TableCell align="right" sx={{ color: PRIMARY_COLOR, fontWeight: 500 }}>
                      ${row.nuevo}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${BORDER_COLOR}`, background: 'rgba(16, 20, 55, 0.6)' }}>
          <Button onClick={handleClose} sx={{ color: TEXT_COLOR, border: `1px solid ${BORDER_COLOR}` }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleClose} sx={{
            background: `linear-gradient(135deg, ${PRIMARY_COLOR}, #3b8ec4)`,
            color: TEXT_COLOR,
            fontWeight: 600
          }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
