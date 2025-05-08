import React, { useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, Radio,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Button, Stack, Typography, Checkbox, FormControlLabel
} from '@mui/material';
import PropTypes from 'prop-types';

const BACKGROUND_COLOR = 'rgba(16, 20, 55, 0.85)';
const PRIMARY_COLOR = '#4dabf7';
const SECONDARY_COLOR = '#1a237e';
const TEXT_COLOR = 'rgba(255, 255, 255, 1)';
const BORDER_COLOR = 'rgba(77, 171, 247, 0.3)';

const SelectAccount = ({ accounts = [], campaignTypes = [], onBack, onContinue }) => {
  const today = new Date().toISOString().split('T')[0];
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];
  const [accountId, setAccountId] = useState('');
  const [startDate, setStartDate] = useState(twoWeeksAgo);
  const [endDate, setEndDate] = useState(today);
  const [campaignType, setCampaignType] = useState('Todos los tipos');
  const [variable, setVariable] = useState('Costo por Lead');
  const [removeWorst, setRemoveWorst] = useState(false);

  const uniqueCampaignTypes = ['Todos los tipos', ...new Set(campaignTypes)];

  return (
    <Stack spacing={3} sx={{
      padding: 3,
      background: BACKGROUND_COLOR,
      backdropFilter: 'blur(12px)',
      border: `4px solid ${BORDER_COLOR}`,
      borderRadius: '10px',
      boxShadow: '8px 8px 10px rgba(77, 171, 247, 0.6)',
    }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          color: TEXT_COLOR,
          textShadow: '0 0 12px rgba(77, 171, 247, 0.6)',
          mb: 4,
          fontSize: '1.5rem'
        }}
      >
        SELECCIONA UNA CUENTA
      </Typography>

      {/* Tabla de cuentas */}
      <Table sx={{
        '& .MuiTableCell-root': { color: TEXT_COLOR },
        '& .MuiTableHead-root': { borderBottom: `2px solid ${PRIMARY_COLOR}` }
      }}>
        <TableHead>
          <TableRow>
            <TableCell>Seleccionar</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((acc) => (
            <TableRow
              key={acc.id}
              hover
              onClick={() => setAccountId(String(acc.id))}
              sx={{ '&:hover': { background: 'rgba(77, 171, 247, 0.9)' } }}
            >
              <TableCell>
                <Radio
                  checked={accountId === String(acc.id)}
                  onChange={() => setAccountId(String(acc.id))}
                  sx={{
                    color: PRIMARY_COLOR,
                    '&.Mui-checked': { color: PRIMARY_COLOR }
                  }}
                />
              </TableCell>
              <TableCell>{acc.name}</TableCell>
              <TableCell>{acc.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Fechas */}
      <TextField
        label="Fecha de inicio"
        type="date"
        fullWidth
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
          style: { color: TEXT_COLOR },
        }}
        inputProps={{
          style: { color: TEXT_COLOR },
          sx: { '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } },
          onClick: e => e.currentTarget.showPicker()
        }}
        sx={{
          mt: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: BORDER_COLOR },
            '&:hover fieldset': { borderColor: PRIMARY_COLOR },
            '&.Mui-focused fieldset': {
              borderColor: PRIMARY_COLOR,
              boxShadow: '0 0 10px rgba(77, 171, 247, 0.3)'
            }
          }
        }}
      />

      <TextField
        label="Fecha de fin"
        type="date"
        fullWidth
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
          style: { color: TEXT_COLOR }
        }}
        inputProps={{
          style: { color: TEXT_COLOR },
          sx: { '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } },
          onClick: e => e.currentTarget.showPicker()
        }}
        sx={{
          mt: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: BORDER_COLOR },
            '&:hover fieldset': { borderColor: PRIMARY_COLOR },
            '&.Mui-focused fieldset': {
              borderColor: PRIMARY_COLOR,
              boxShadow: '0 0 10px rgba(77, 171, 247, 0.3)'
            }
          }
        }}
      />

      {/* Selección de tipo de campaña */}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel sx={{ color: TEXT_COLOR }}>Tipo de Campaña</InputLabel>
        <Select
          value={campaignType}
          label="Tipo de Campaña"
          onChange={(e) => setCampaignType(e.target.value)}
          sx={{
            color: TEXT_COLOR,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: BORDER_COLOR },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: PRIMARY_COLOR },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: PRIMARY_COLOR,
              boxShadow: '0 0 10px rgba(77, 171, 247, 0.3)'
            }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                background: 'rgba(16, 20, 55, 0.98)',
                border: '2px solid rgba(77, 171, 247, 0.5)',
                boxShadow: '0 0 20px rgba(77, 171, 247, 0.3)',
                '& .MuiMenuItem-root': {
                  color: PRIMARY_COLOR,
                  '&:hover': { background: 'rgba(77, 171, 247, 0.1)' }
                }
              }
            }
          }}
        >
          {uniqueCampaignTypes.map((ct) => (
            <MenuItem key={ct} value={ct}>{ct}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel sx={{ color: TEXT_COLOR }}>Variable a optimizar</InputLabel>
        <Select
          value={variable}
          label="Variable a optimizar"
          onChange={(e) => setVariable(e.target.value)}
          sx={{
            color: TEXT_COLOR,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: BORDER_COLOR },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: PRIMARY_COLOR },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: PRIMARY_COLOR,
              boxShadow: '0 0 10px rgba(77, 171, 247, 0.3)'
            }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                background: 'rgba(16, 20, 55, 0.98)',
                border: '2px solid rgba(77, 171, 247, 0.5)',
                boxShadow: '0 0 20px rgba(77, 171, 247, 0.3)',
                '& .MuiMenuItem-root': {
                  color: PRIMARY_COLOR,
                  '&:hover': { background: 'rgba(77, 171, 247, 0.1)' }
                }
              }
            }
          }}
        >
          {[
            'Costo por Lead',
            'Costo por 1000 Alcance (CPM)',
            'Costo por Acción (CPA)',
            'Costo por Clic (CPC)',
            'ROAS Facebook (Retorno sobre Gasto Publicitario)',
            'ROI Ingreso Manual (Retorno de Inversión)'
          ].map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
        <Typography sx={{ color: TEXT_COLOR }}>Eliminar 10% de menor rendimiento:</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={removeWorst}
              onChange={() => setRemoveWorst(true)}
              sx={{
                color: PRIMARY_COLOR,
                '&.Mui-checked': { color: PRIMARY_COLOR }
              }}
            />
          }
          label="Sí"
          sx={{color: TEXT_COLOR}}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!removeWorst}
              onChange={() => setRemoveWorst(false)}
              sx={{
                color: PRIMARY_COLOR,
                '&.Mui-checked': { color: PRIMARY_COLOR }
              }}
            />
          }
          label="No"
          sx={{color: TEXT_COLOR}}
        />
      </Stack>

      {/* Botones de acción */}
      <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={() => onContinue({
            accountId,
            startDate,
            endDate,
            campaignType,
            variable,
            removeWorst
          })}
          disabled={!accountId || !startDate || !endDate}
          sx={{
            background: `linear-gradient(145deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`,
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '2px',
            boxShadow: '0 0 15px rgba(77, 171, 247, 0.3)',
            '&:hover': {
              background: `linear-gradient(145deg, ${SECONDARY_COLOR} 0%, ${PRIMARY_COLOR} 100%)`,
              boxShadow: '0 0 25px rgba(77, 171, 247, 0.5)'
            }
          }}
        >
          CONTINUAR
        </Button>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            borderColor: PRIMARY_COLOR,
            color: PRIMARY_COLOR,
            '&:hover': {
              borderColor: PRIMARY_COLOR,
              background: 'rgba(77, 171, 247, 0.1)'
            }
          }}
        >
          VOLVER
        </Button>
      </Stack>
    </Stack>
  );
};

SelectAccount.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  campaignTypes: PropTypes.arrayOf(PropTypes.string),
  onBack: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default SelectAccount;
