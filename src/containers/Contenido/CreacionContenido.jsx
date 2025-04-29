import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const API_BASE = import.meta.env.VITE_API_URL; 

export default function CreacionContenido() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const newHistory = [...history, { sender: 'user', text: message }];
    setHistory(newHistory);
    setMessage('');
  
    try {
      const res = await fetch("https://www.mrkt21.com/creacionContenido/chatbot_api", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: newHistory }),
        credentials: 'include' // Solo si el backend requiere cookies
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }
      
      const data = await res.json();
      const reply = data.response ?? `Error: ${data.error ?? 'sin respuesta'}`;
      setHistory(h => [...h, { sender: 'bot', text: reply }]);
      
    } catch (err) {
      console.error('Error en la solicitud:', err);
      setHistory(h => [...h, { 
        sender: 'bot', 
        text: `Error de conexión: ${err.message || 'Intenta recargar la página'}`
      }]);
    }
  };

  return (
    <Box
      p={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Título + botones */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          width: '100%',
          maxWidth: 500,           // más angosto
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Contenido
        </Typography>
        <Typography variant="body1">
          Bienvenido al módulo de creación de contenido.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            mt: 2,
          }}
        >
          {[
            'Ver calendario\nde contenido',
            'Ver estrategia\nde contenido',
            'Planificar\nnuevo contenido'
          ].map((txt, i) => (
            <Button
              key={i}
              variant="contained"
              sx={{
                width: 120,        // más estrecho
                height: 70,        // más alto
                whiteSpace: 'pre', // respeta \n
              }}
            >
              {txt}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Chatbot */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: '100%',
          maxWidth: 500,           // mismo ancho
        }}
      >
        <Typography variant="h5" gutterBottom>
          Chatbot
        </Typography>

        <List
          sx={{
            maxHeight: 300,
            overflowY: 'auto',
            mb: 2,
          }}
        >
          {history.map((msg, idx) => (
            <ListItem
              key={idx}
              sx={{
                justifyContent:
                  msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Paper
                sx={{
                  p: 1,
                  bgcolor:
                    msg.sender === 'user' ? 'primary.light' : 'grey.200',
                  maxWidth: '80%',
                }}
              >
                <ListItemText primary={msg.text} />
              </Paper>
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <Button variant="contained" onClick={handleSend}>
            Enviar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
