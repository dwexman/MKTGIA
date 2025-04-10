import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import './RegistroComentarios.css';

const RegistroComentarios = () => {
  // Datos de ejemplo 
  const comentarios = [
    {
      fecha: '2025-04-10',
      plataforma: 'Instagram',
      usuario: 'usuario1',
      mensaje: '¡Excelente publicación!',
      idPublicacion: '12345',
      respuesta: 'Gracias por tu comentario!'
    },
    {
      fecha: '2025-04-09',
      plataforma: 'Facebook',
      usuario: 'usuario2',
      mensaje: 'Muy interesante.',
      idPublicacion: '67890',
      respuesta: 'Nos alegra que te guste.'
    }
  ];

  return (
    <Box className="comentarios-container" sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom className="neon-title">
        Registro de Comentarios
      </Typography>
      <Typography variant="subtitle2" gutterBottom className="neon-subtitle">
        Revisa tus comentarios en Instagram y Facebook:
      </Typography>

      <Table className="glow-table" sx={{ marginTop: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Plataforma</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Mensaje</TableCell>
            <TableCell>ID de Publicación</TableCell>
            <TableCell>Respuesta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comentarios.map((comentario, index) => (
            <TableRow key={index}>
              <TableCell>{comentario.fecha}</TableCell>
              <TableCell>{comentario.plataforma}</TableCell>
              <TableCell>{comentario.usuario}</TableCell>
              <TableCell>{comentario.mensaje}</TableCell>
              <TableCell>{comentario.idPublicacion}</TableCell>
              <TableCell>{comentario.respuesta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default RegistroComentarios;
