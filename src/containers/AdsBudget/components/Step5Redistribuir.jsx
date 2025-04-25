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
    DialogContentText,
    DialogActions
} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BACKGROUND_COLOR = 'rgba(16, 20, 55, 0.95)'
const PRIMARY_COLOR = '#4dabf7'
const TEXT_COLOR = 'rgba(255, 255, 255, 1)'
const BORDER_COLOR = 'rgba(77, 171, 247, 0.3)'

export default function OptimizationRegister() {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const data = [
        { titulo: 'Campaña A', tipo: 'Typo 1', costo: 0.5, presupuesto: 1000, porcentaje: '10%', nuevo: 1100, antes: 200, despues: 220 },
        { titulo: 'Campaña B', tipo: 'Typo 2', costo: 1.2, presupuesto: 2000, porcentaje: '20%', nuevo: 2400, antes: 150, despues: 180 }
    ]

    const totals = {
        presupuesto: 3000,
        nuevo: 3500,
        antes: 350,
        despues: 400
    }

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
                            <TableCell sx={{ minWidth: 120 }}>Título</TableCell>
                            <TableCell sx={{ minWidth: 100 }}>Tipo</TableCell>
                            <TableCell sx={{ minWidth: 120 }}>Costo/métrica</TableCell>
                            <TableCell sx={{ minWidth: 140 }}>Presupuesto anterior</TableCell>
                            <TableCell sx={{ minWidth: 100 }}>% anterior</TableCell>
                            <TableCell sx={{ minWidth: 140 }}>Nuevo presupuesto</TableCell>
                            <TableCell sx={{ minWidth: 100 }}>Métrica antes</TableCell>
                            <TableCell sx={{ minWidth: 100 }}>Métrica después</TableCell>
                            <TableCell sx={{ minWidth: 140 }}>Editar nuevo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index} hover sx={{ '&:hover': { background: 'rgba(77, 171, 247, 0.05)' } }}>
                                <TableCell>{row.titulo}</TableCell>
                                <TableCell>{row.tipo}</TableCell>
                                <TableCell>${row.costo}</TableCell>
                                <TableCell>${row.presupuesto}</TableCell>
                                <TableCell>{row.porcentaje}</TableCell>
                                <TableCell>${row.nuevo}</TableCell>
                                <TableCell>{row.antes}</TableCell>
                                <TableCell>{row.despues}</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        defaultValue={row.nuevo}
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
                                </TableCell>
                            </TableRow>
                        ))}

                        {/* Fila de totales */}
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

            {/* Diálogo de Confirmación */}
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
                    pr: 6,
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
                            transition: 'all 0.3s',
                            '&:hover': {
                                color: '#ff0a0a',
                                transform: 'translateY(-50%) rotate(90deg)',
                                backgroundColor: 'rgba(230, 57, 70, 0.1)',
                            }
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ py: 3 }}>
                    <Typography variant="body1" sx={{
                        color: TEXT_COLOR,
                        mt: 2,
                        mb: 2,
                        textShadow: '0 0 8px rgba(77, 171, 247, 0.3)'
                    }}>
                        Revisa los nuevos presupuestos antes de confirmar:
                    </Typography>

                    <Paper sx={{
                        p: 2,
                        background: 'rgba(16, 20, 55, 0.7)',
                        border: `1px solid ${BORDER_COLOR}`,
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)'
                    }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{
                                    '& th': {
                                        color: PRIMARY_COLOR,
                                        borderColor: BORDER_COLOR,
                                        fontWeight: 600,
                                        fontSize: '0.95rem'
                                    }
                                }}>
                                    <TableCell>Conjunto de anuncios</TableCell>
                                    <TableCell align="right">Presupuesto actual</TableCell>
                                    <TableCell align="right">Nuevo presupuesto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '& td': {
                                                color: TEXT_COLOR,
                                                borderColor: BORDER_COLOR,
                                                transition: '0.3s',
                                                '&:hover': {
                                                    background: 'rgba(255, 255, 255, 0.03)'
                                                }
                                            }
                                        }}
                                    >
                                        <TableCell>{row.titulo}</TableCell>
                                        <TableCell align="right">${row.presupuesto}</TableCell>
                                        <TableCell align="right" sx={{
                                            color: PRIMARY_COLOR,
                                            fontWeight: 500,
                                            textShadow: '0 0 8px rgba(77, 171, 247, 0.3)'
                                        }}>
                                            ${row.nuevo}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </DialogContent>

                <DialogActions sx={{
                    px: 3,
                    py: 2,
                    borderTop: `1px solid ${BORDER_COLOR}`,
                    background: 'rgba(16, 20, 55, 0.6)'
                }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: TEXT_COLOR,
                            border: `1px solid ${BORDER_COLOR}`,
                            px: 3,
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.05)'
                            }
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            background: `linear-gradient(135deg, ${PRIMARY_COLOR}, #3b8ec4)`,
                            color: TEXT_COLOR,
                            px: 3,
                            fontWeight: 600,
                            '&:hover': {
                                background: `linear-gradient(135deg, #3b8ec4, ${PRIMARY_COLOR})`,
                                boxShadow: '0 0 15px rgba(77, 171, 247, 0.4)'
                            }
                        }}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
