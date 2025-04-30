import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Stack
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const API_BASE = import.meta.env.VITE_API_URL;


const PRIMARY_COLOR = '#4dabf7';
const SECONDARY_COLOR = '#1a237e';
const TEXT_COLOR_LIGHT = '#ffffff';
const BORDER_COLOR = 'rgba(77, 171, 247, 0.3)';
const INPUT_BORDER_COLOR = '#4dabf7';
const BUTTON_BG_COLOR = '#4dabf7';

export default function CreacionContenido() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const newHistory = [...history, { sender: 'user', text: message }];
    setHistory(newHistory);
    setMessage('');

    try {
      const res = await fetch(`${API_BASE}/creacionContenido/chatbot_api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: newHistory }),
        credentials: 'include'
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

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
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        minHeight: '100vh',
        background: 'transparent'
      }}
    >
      {/* Módulo principal - Paper claro con fondo oscuro dentro */}
      <Paper
        elevation={0}
        sx={{
          p: 1,
          width: '100%',
          maxWidth: 600,
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box
          sx={{
            p: 3,
            background: 'rgba(16, 20, 55, 0.9)',
            borderRadius: '8px',
            border: `5px solid ${BORDER_COLOR}`
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: PRIMARY_COLOR,
              textShadow: '0 0 12px rgba(77, 171, 247, 0.6)',
              textAlign: 'center'
            }}
          >
            CREACIÓN DE CONTENIDO
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: TEXT_COLOR_LIGHT,
              textAlign: 'center',
              mb: 3
            }}
          >
            Bienvenido al módulo de creación de contenido.
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ flexWrap: 'wrap' }}
          >
            {[
              'Ver calendario',
              'Ver estrategia',
              'Planificar nuevo'
            ].map((txt, i) => (
              <Button
                key={i}
                variant="contained"
                onClick={() => {
                  if (txt === 'Ver calendario') {
                    navigate('/contenido/calendario');
                  }
                }}

                sx={{
                  width: 140,
                  height: 60,
                  background: `linear-gradient(145deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`,
                  color: TEXT_COLOR_LIGHT,
                  fontWeight: 600,
                  '&:hover': {
                    background: `linear-gradient(145deg, ${SECONDARY_COLOR} 0%, ${PRIMARY_COLOR} 100%)`,
                    boxShadow: '0 0 15px rgba(77, 171, 247, 0.5)'
                  }
                }}
              >
                {txt}
              </Button>
            ))}
          </Stack>
        </Box>
      </Paper>

      {/* Chatbot - Paper claro con fondo oscuro dentro */}
      <Paper
        elevation={0}
        sx={{
          p: 1,
          width: '100%',
          maxWidth: 600,
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box
          sx={{
            p: 3,
            background: 'rgba(16, 20, 55, 0.9)',
            borderRadius: '8px',
            border: `5px solid ${BORDER_COLOR}`
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: PRIMARY_COLOR,
              textShadow: '0 0 12px rgba(77, 171, 247, 0.6)',
              textAlign: 'center'
            }}
          >
            Marketing del siglo 21 - Mrkt21
          </Typography>

          <List
            sx={{
              maxHeight: 300,
              overflowY: 'auto',
              mb: 2,
              bgcolor: 'rgba(16, 20, 55, 0.5)',
              borderRadius: '8px',
              p: 1,
              border: `1px solid ${BORDER_COLOR}`
            }}
          >
            {history.map((msg, idx) => (
              <ListItem
                key={idx}
                sx={{
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  px: 1,
                  py: 0.5
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    bgcolor: msg.sender === 'user'
                      ? `rgba(77, 171, 247, 0.2)`
                      : 'rgba(26, 35, 126, 0.3)',
                    border: `1px solid ${msg.sender === 'user' ? PRIMARY_COLOR : SECONDARY_COLOR}`,
                    borderRadius: '8px',
                    maxWidth: '80%',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <ListItemText
                    primary={msg.text}
                    sx={{
                      color: TEXT_COLOR_LIGHT,
                      '& .MuiTypography-root': {
                        fontSize: '0.95rem'
                      }
                    }}
                  />
                </Paper>
              </ListItem>
            ))}
          </List>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: TEXT_COLOR_LIGHT,
                  '& fieldset': {
                    borderColor: INPUT_BORDER_COLOR,
                  },
                  '&:hover fieldset': {
                    borderColor: PRIMARY_COLOR,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: PRIMARY_COLOR,
                    boxShadow: '0 0 10px rgba(77, 171, 247, 0.3)'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: TEXT_COLOR_LIGHT,
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              endIcon={<SendIcon sx={{ color: TEXT_COLOR_LIGHT }} />}
              sx={{
                background: BUTTON_BG_COLOR,
                color: TEXT_COLOR_LIGHT,
                fontWeight: 600,
                minWidth: '120px',
                '&:hover': {
                  background: '#3a8fd9',
                  boxShadow: `0 0 10px ${BUTTON_BG_COLOR}`
                }
              }}
            >
              Enviar
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}