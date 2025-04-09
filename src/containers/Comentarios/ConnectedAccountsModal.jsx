import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Modal,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ConnectedAccountsModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Paper sx={{
          p: 3,
          width: '80%',
          maxWidth: 800,
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid rgba(77, 171, 247, 0.3)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          position: 'relative'
        }}>
          <IconButton 
            onClick={onClose} 
            sx={{ 
              position: 'absolute', 
              right: 16, 
              top: 16,
              color: '#4dabf7'
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" gutterBottom sx={{ 
            color: '#1a237e',
            fontWeight: 600,
            mb: 3
          }}>
            Cuentas conectadas
          </Typography>

          <TableContainer>
            <Table sx={{
              '& .MuiTableCell-root': {
                borderColor: 'rgba(77, 171, 247, 0.2)'
              }
            }}>
              <TableHead>
                <TableRow sx={{ 
                  background: 'linear-gradient(145deg, rgba(77, 171, 247, 0.1) 0%, rgba(77, 171, 247, 0.05) 100%)' 
                }}>
                  <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>ID de Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>ID de Facebook</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Nombre de la Página</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>ID de Instagram</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Aquí irían las filas de datos */}
                <TableRow hover sx={{ '&:hover': { background: 'rgba(77, 171, 247, 0.03)' } }}>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ConnectedAccountsModal;