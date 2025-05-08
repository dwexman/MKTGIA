import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Button, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Tooltip
} from '@mui/material';
import SaveIcon  from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const BG  = 'rgba(16, 20, 55, 0.95)';
const PRI = '#4dabf7';
const TXT = 'rgba(255,255,255,1)';
const BOR = 'rgba(77,171,247,0.3)';

export default function Step5Redistribuir({ adsetData = null, onSaveBudgets }) {
  const toRows = d =>
  !d || Object.keys(d).length === 0
    ? []
    : Object.entries(d).map(([aid, ad])  => ({
        id:           aid,
        titulo:     ad.conjunto_de_anuncio    || ad.campaign_name,
        tipo:       ad.tipo_de_campaña        || ad.objective,
        costo:         ad.costo_variable              ?? null,
        presupuesto:   Number(ad.daily_budget         ?? 0),
        nuevo:         Number(ad.nuevo_daily_budget   ?? 0),
        antes:         Number(ad.metric_antes         ?? 0),
        despues:       Number(ad.metric_despues       ?? 0),
        porcentaje:  ad.porcentaje_presupuesto_anterior_formateado
                      ?? ad.porcentaje_presupuesto_anterior
                      ?? '',
        inputValue:  String(ad.nuevo_daily_budget ?? '')
      }));

  /* filas en estado, actualizadas cada vez que cambie la prop */
  const [rows, setRows] = useState([]);
  useEffect(() => { setRows(toRows(adsetData)); }, [adsetData]);

  /* diálogo confirmación */
  const [open, setOpen] = useState(false);
  const handleOpen  = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* edición rápida */
  const handleInputChange = (idx, val) => {
    const clean = val.replace(/[^0-9]/g, '');
    setRows(r => r.map((row,i)=> i===idx ? ({...row, inputValue:clean}) : row));
  };
  const handleSave = idx => {
    setRows(r => r.map((row,i)=>
      i===idx ? ({...row, nuevo:Number(row.inputValue || 0)}) : row
    ));
  };

  /* totales */
  const totals = rows.reduce((acc,r)=>({
    presupuesto : acc.presupuesto + r.presupuesto,
    nuevo       : acc.nuevo       + r.nuevo,
    antes       : acc.antes       + r.antes,
    despues     : acc.despues     + r.despues
  }), { presupuesto:0, nuevo:0, antes:0, despues:0 });

  /* confirmar */
  const confirmBudgets = () => {
    const map = rows.reduce((acc,r)=>({ ...acc, [r.id]: r.nuevo }),{});
    onSaveBudgets(map);
    handleClose();
  };

  if (!rows.length) {
    return <Typography sx={{ color:TXT, mt:2 }}>Cargando datos de redistribución…</Typography>;
  }

  /* ────────────────────────────────────────── UI ────────────────────────────────────────── */
  return (
    <Box sx={{
      p:3, background:BG, backdropFilter:'blur(12px)', borderRadius:'10px',
      minWidth:'930px', mx:'-190px',
      border:`2px solid ${BOR}`, boxShadow:'0 0 20px rgba(77,171,247,0.3)'
    }}>
      <Typography variant="h4" sx={{
        color:PRI, fontWeight:700, mb:3, textAlign:'center',
        textShadow:'0 0 12px rgba(77,171,247,0.6)'
      }}>
        Registro de la optimización
      </Typography>

      {/* tabla principal */}
      <Paper sx={{ p:2, mb:3, background:'rgba(16,20,55,0.7)',
        border:`1px solid ${BOR}`, overflowX:'auto' }}>
        <Table size="medium" sx={{
          '& .MuiTableCell-root':{ color:TXT, borderColor:BOR, py:1, whiteSpace:'nowrap' },
          '& .MuiTableHead-root':{ borderBottom:`2px solid ${PRI}` }
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
              <TableCell><Tooltip title="Editar nuevo presupuesto"><span>Editar</span></Tooltip></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,idx)=>(
              <TableRow key={row.id} hover sx={{'&:hover':{background:'rgba(77,171,247,0.05)'}}}>
                <TableCell>{row.titulo}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>${row.costo}</TableCell>
                <TableCell>${row.presupuesto}</TableCell>
                <TableCell>{row.porcentaje}</TableCell>
                <TableCell>${row.nuevo}</TableCell>
                <TableCell>{row.antes}</TableCell>
                <TableCell>{row.despues}</TableCell>
                <TableCell>
                  <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                    <TextField
                      size="small"
                      type="number"
                      value={row.inputValue}
                      onChange={e=>handleInputChange(idx,e.target.value)}
                      sx={{
                        width:90,
                        '& .MuiInputBase-input':{ color:TXT, py:0.5, fontSize:'0.875rem' },
                        '& fieldset':{ borderColor:BOR }
                      }}
                    />
                    <Tooltip title="Guardar">
                      <IconButton size="small" onClick={()=>handleSave(idx)} sx={{color:PRI}}>
                        <SaveIcon fontSize="small"/>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}

            {/* totales */}
            <TableRow sx={{
              background:'rgba(255,255,255,0.1)', borderTop:`2px solid ${BOR}`,
              '& td':{ fontWeight:700, color:PRI }
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

      {/* botón confirmar */}
      <Box sx={{display:'flex',justifyContent:'flex-end',mt:3}}>
        <Button variant="outlined" onClick={handleOpen}
          sx={{ borderColor:PRI, color:PRI, '&:hover':{background:'rgba(77,171,247,0.1)'} }}>
          Confirmar actualización
        </Button>
      </Box>

      {/* diálogo confirmación */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth
        PaperProps={{sx:{
          background:'rgba(26,30,75,0.98)', backdropFilter:'blur(15px)',
          borderRadius:'12px', border:`2px solid ${BOR}`,
          boxShadow:'0 0 30px rgba(77,171,247,0.4)'
        }}}>
        <DialogTitle sx={{
          color:PRI, fontWeight:700, fontSize:'1.5rem',
          borderBottom:`1px solid ${BOR}`, background:'rgba(16,20,55,0.6)',
          position:'relative', pr:6
        }}>
          Confirmar actualización de presupuestos
          <IconButton aria-label="close" onClick={handleClose} sx={{
            position:'absolute', right:16, top:'50%',
            transform:'translateY(-50%)', color:'#e63946',
            '&:hover':{ color:'#ff0a0a', background:'rgba(230,57,70,0.1)', transform:'translateY(-50%) rotate(90deg)' }
          }}>
            <CloseIcon/>
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{py:3}}>
          <Typography sx={{color:TXT,mb:2}}>
            Revisa los nuevos presupuestos antes de confirmar:
          </Typography>
          <Paper sx={{p:2, background:'rgba(16,20,55,0.7)', border:`1px solid ${BOR}`}}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{color:PRI}}>Conjunto</TableCell>
                  <TableCell align="right" sx={{color:PRI}}>Presupuesto actual</TableCell>
                  <TableCell align="right" sx={{color:PRI}}>Nuevo presupuesto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(r=>(
                  <TableRow key={r.id}>
                    <TableCell sx={{color:TXT}}>{r.titulo}</TableCell>
                    <TableCell align="right" sx={{color:TXT}}>${r.presupuesto}</TableCell>
                    <TableCell align="right" sx={{color:PRI,fontWeight:500}}>${r.nuevo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </DialogContent>

        <DialogActions sx={{px:3,py:2, borderTop:`1px solid ${BOR}`, background:'rgba(16,20,55,0.6)'}}>
          <Button onClick={handleClose} sx={{color:TXT, border:`1px solid ${BOR}`}}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={confirmBudgets}
            sx={{ background:`linear-gradient(135deg, ${PRI}, #3b8ec4)`, color:TXT, fontWeight:600 }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
