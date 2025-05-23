import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
    Box, Paper, Typography, Button, Fade, Dialog, DialogTitle,
    DialogContent, DialogActions, Avatar, Divider, Chip, Stack, Menu, MenuItem
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import EventIcon from '@mui/icons-material/Event';
import { keyframes } from '@emotion/react';
import './Calendario.css';

const containerFloat = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const API_BASE = import.meta.env.VITE_API_URL;

const formatDate = date => date.toISOString().split('T')[0];

const moveEventOnServer = async (idEvento, nuevaFecha) => {
    const resGet = await fetch(`${API_BASE}/api/calendario/events/${idEvento}`, {
      credentials: 'include',
    });
    if (!resGet.ok) throw new Error(`GET ${idEvento}: HTTP ${resGet.status}`);
    const { event } = await resGet.json();      
  
    const payload = {
      brand: event.Brand ?? event.brand,            
      fecha: nuevaFecha,                          
      tipoContenido: event.TipoContenido ?? event.tipoContenido,
      titulo: event.Titulo ?? event.titulo,
      descripcion: event.Descripcion ?? event.descripcion ?? '',
    };
      const resPatch = await fetch(`${API_BASE}/api/calendario/events/${idEvento}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  
    if (!resPatch.ok) {
      const { message } = await resPatch.json().catch(() => ({}));
      throw new Error(message || `PATCH ${idEvento}: HTTP ${resPatch.status}`);
    }
  };

export default function Calendario() {
    const navigate = useNavigate();
    const calendarRef = useRef(null);
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    const [informe, setInforme] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [copiedEvents, setCopiedEvents] = useState([]);
    const [contextDay, setContextDay] = useState(null);
    const [openResumen, setOpenResumen] = useState(false);
    const handleOpenResumen = () => setOpenResumen(true);
    const handleCloseResumen = () => setOpenResumen(false);
    const [currentLabel, setCurrentLabel] = useState(
        today
            .toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
            .toUpperCase()
    );

    const [events, setEvents] = useState([]);

    const loadEvents = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/calendario/events`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const { status, events: raw } = await res.json();
            if (status === 'ok' && Array.isArray(raw)) {
                const mapped = raw.map(e => ({
                    id: String(e.ID),
                    date: e.Fecha,
                    title: e.Titulo,
                    color: '#4dabf7',
                    type: e.TipoContenido
                }));
                setEvents(mapped);
            }
        } catch (err) {
            console.error('Error cargando eventos:', err);
        }
    }, []);

    const handleDatesSet = (info) => {
        setCurrentLabel(info.view.title.toUpperCase());
    };

    const handleEventClick = (info) => {
        info.jsEvent.preventDefault();     
        navigate(`/contenido/calendario/editar/${info.event.id}`);

        return false; 
      };
      


    const handleEventContextMenu = (event, jsEvent) => {
        jsEvent.preventDefault();
        jsEvent.stopPropagation();
        setSelectedEvent(event);
        setContextMenu({
            mouseX: jsEvent.clientX - 2,
            mouseY: jsEvent.clientY - 4
        });
    };
    const handleCloseContextMenu = () => {
        setContextMenu(null);
        setSelectedEvent(null);
        setContextDay(null);
    };
    const handleCopy = () => {
        setCopiedEvents([selectedEvent.id]);
        handleCloseContextMenu();
    };
    const handlePaste = async () => {
        if (!copiedEvents.length) return;
        const targetDate = formatDate(selectedEvent ? selectedEvent.start : contextDay);
        await fetch(`${API_BASE}/api/calendario/events/paste`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventIds: copiedEvents, targetDate })
        });
        handleCloseContextMenu();
        loadEvents(); 
    };
    const handleDuplicate = async () => {
        const id = selectedEvent.id;
        const res = await fetch(`${API_BASE}/api/calendario/events/${id}/duplicate`, {
            method: 'POST',
            credentials: 'include'
        });
        if (res.ok) {
            loadEvents();
        }
        handleCloseContextMenu();
    };
    const handleRedo = async () => {
        if (!selectedEvent) return;
        const id = selectedEvent.id;
      
        try {
          const resGet = await fetch(`${API_BASE}/api/calendario/events/${id}`, {
            credentials: 'include',
          });
          if (!resGet.ok) throw new Error(`GET ${id}: HTTP ${resGet.status}`);
          const { event } = await resGet.json();
      
          const payload = {
            brand:          event.Brand          ?? event.brand,
            fecha:          event.Fecha          ?? event.fecha,          
            tipoContenido:  event.TipoContenido  ?? event.tipoContenido,
            titulo:         event.Titulo         ?? event.titulo,
            descripcion:    event.Descripcion    ?? event.descripcion ?? '',
          };
      
          const resPatch = await fetch(`${API_BASE}/api/calendario/events/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!resPatch.ok) {
            const { message } = await resPatch.json().catch(() => ({}));
            throw new Error(message || `PATCH ${id}: HTTP ${resPatch.status}`);
          }
      
          loadEvents();
          handleCloseContextMenu();
        } catch (err) {
          console.error('Error en rehacer:', err);
          alert('No se pudo rehacer:\n' + err.message);
        }
      };
    const handleDelete = async () => {
        const id = selectedEvent.id;
        const res = await fetch(`${API_BASE}/api/calendario/events/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (res.ok) {
            setEvents(prev => prev.filter(ev => ev.id !== id));
        }
        handleCloseContextMenu();
    };

    const handleDayContextMenu = (date, jsEvent) => {
        jsEvent.preventDefault();
        jsEvent.stopPropagation();
        setContextMenu({
            mouseX: jsEvent.clientX - 2,
            mouseY: jsEvent.clientY - 4
        });
        setContextDay(date);
        setSelectedEvent(null);
    };


    const fetchInforme = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/creacionContenido/api/informe_calendario`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            setInforme(data);
        } catch (err) {
            console.error('Error obteniendo informe:', err);
            setInforme({
                total_eventos: events.length,
                distribucion_por_tipo: events.reduce((acc, event) => {
                    acc[event.type] = (acc[event.type] || 0) + 1;
                    return acc;
                }, {})
            });
        }
    }, [events]);

    useEffect(() => {
        fetchInforme();
    }, [fetchInforme]);

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.setOption('eventDragMinDistance', 5);
        }
    }, []);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);


    const calendarEvents = events.map(ev => ({
        id: ev.id.toString(),
        title: `<div class="event-content" style="display: flex; align-items: center; gap: 8px; padding: 6px;">
      <span style="width: 10px; height: 10px; border-radius: 50%; background-color: ${ev.color}; box-shadow: 0 0 8px ${ev.color}"></span>
      <span style="font-size: 0.85rem; white-space: normal; line-height: 1.3; word-break: break-word;">${ev.title}</span>
    </div>`,
        start: ev.date,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(77, 171, 247, 0.2)',
        textColor: '#1a237e',
        classNames: ['custom-event'],
        extendedProps: {
            type: ev.type
        }
    }));

    return (
        <Box sx={{
            p: 3,
            mt: 6,
            display: 'flex',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #f8f9ff 0%, #e6f0ff 100%)',
            minHeight: '100vh',
            width: '100%',
            position: 'relative'
        }}>
            <Paper sx={{
                p: 3,
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
                border: '1px solid rgba(77, 171, 247, 0.2)',
                width: '1100px',
                minWidth: '1100px',
                animation: `${containerFloat} 8s ease-in-out infinite`,
                position: 'relative',
                overflow: 'hidden',
                ':before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: '2px solid transparent',
                    background: 'linear-gradient(120deg, rgba(77, 171, 247, 0.1) 0%, transparent 50%) border-box',
                    mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    borderRadius: '16px',
                }
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(145deg, rgba(77, 171, 247, 0.1) 0%, rgba(77, 171, 247, 0.05) 100%)',
                    borderRadius: '12px',
                    p: 1.5,
                    mb: 3,
                    border: '1px solid rgba(77, 171, 247, 0.15)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button
                            onClick={handleOpenResumen}
                            startIcon={<SummarizeIcon />}
                            variant="contained"
                            sx={{
                                backgroundColor: '#4dabf7',
                                color: 'white',
                                borderRadius: '12px',
                                px: 2,
                                py: 1,
                                textTransform: 'none',
                                fontWeight: 500,
                                boxShadow: '0 2px 8px rgba(77, 171, 247, 0.3)',
                                transition: 'all 0.3s ease',
                                ':hover': {
                                    backgroundColor: '#3a8bc8',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(77, 171, 247, 0.4)'
                                },
                                ':active': {
                                    transform: 'translateY(0)'
                                }
                            }}
                        >
                            Resumen
                        </Button>

                        <Button
                            onClick={() => calendarRef.current.getApi().prev()}
                            startIcon={<ArrowBackIosIcon sx={{ fontSize: '14px' }} />}
                            sx={{
                                color: '#4dabf7',
                                textTransform: 'none',
                                fontWeight: 500,
                                px: 2,
                                ':hover': { background: 'rgba(77, 171, 247, 0.08)' }
                            }}
                        >
                            Anterior
                        </Button>
                    </Stack>

                    <Typography variant="h6" sx={{
                        color: '#1a237e',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        textShadow: '0 2px 4px rgba(77, 171, 247, 0.1)',
                    }}>
                        {currentLabel}
                    </Typography>

                    <Button
                        onClick={() => calendarRef.current.getApi().next()}
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: '14px' }} />}
                        sx={{
                            color: '#4dabf7',
                            textTransform: 'none',
                            fontWeight: 500,
                            px: 2,
                            ':hover': { background: 'rgba(77, 171, 247, 0.08)' }
                        }}
                    >
                        Siguiente
                    </Button>
                </Box>

                <Fade in timeout={500}>
                    <Box>
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            headerToolbar={false}
                            editable={true}
                            dragScroll={true}
                            events={calendarEvents}
                            initialDate={today}
                            height={750}
                            datesSet={handleDatesSet}
                            eventClick={handleEventClick}
                            eventDragStart={(info) => {
                                const el = info.el;
                                el.style.width = `${el.offsetWidth}px`;
                                el.style.position = 'fixed';
                                el.style.pointerEvents = 'none';
                                el.style.zIndex = '9999';
                                el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                                el.style.opacity = '0.9';
                                el.style.transform = 'translate(-50%, -50%)';
                            }}
                            eventDrag={(info) => {
                                const el = info.el;
                                const mouseX = info.jsEvent.clientX;
                                const mouseY = info.jsEvent.clientY;
                                el.style.left = `${mouseX}px`;
                                el.style.top = `${mouseY}px`;
                            }}
                            eventDragStop={(info) => {
                                const el = info.el;
                                el.style.position = '';
                                el.style.width = '';
                                el.style.boxShadow = '';
                                el.style.opacity = '';
                                el.style.zIndex = '';
                                el.style.transform = '';
                                el.style.pointerEvents = '';
                                el.style.left = '';
                                el.style.top = '';
                            }}
                            eventDrop={async info => {
                                const newDate = formatDate(info.event.start);  
                                try {
                                  await moveEventOnServer(info.event.id, newDate);         
                                  setEvents(prev =>                                         
                                    prev.map(ev =>
                                      ev.id.toString() === info.event.id ? { ...ev, date: newDate } : ev
                                    )
                                  );
                                } catch (err) {
                                  info.revert();                                            
                                  console.error(err);
                                  alert('No se pudo mover el evento:\n' + err.message);
                                }
                              }}
                            dayHeaderContent={(arg) => (
                                <Box sx={{
                                    color: '#4dabf7',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    textShadow: '0 2px 4px rgba(77, 171, 247, 0.1)'
                                }}>
                                    {arg.text}
                                </Box>
                            )}
                            dayCellContent={(arg) => (
                                <Typography variant="caption" sx={{
                                    color: '#1a237e',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                }}>
                                    {arg.dayNumberText.replace(',', '')}
                                </Typography>
                            )}
                            eventContent={(arg) => ({
                                html: arg.event.title
                            })}
                            dayCellClassNames={(arg) =>
                                arg.isPast ? 'past-day' : arg.isToday ? 'today' : ''
                            }
                            eventClassNames="custom-event"
                            fixedWeekCount={false}
                            contentHeight="auto"
                            dayMaxEvents={4}
                            dayCellDidMount={(arg) => {
                                arg.el.style.border = '1px solid rgba(77, 171, 247, 0.3)';
                                arg.el.style.borderRadius = '8px';
                                arg.el.addEventListener('contextmenu', e => handleDayContextMenu(arg.date, e));
                            }}
                            eventDidMount={(info) => {
                                info.el.removeAttribute('href');   
                                info.el.style.cursor = 'pointer';
                                info.el.addEventListener('contextmenu', e =>
                                  handleEventContextMenu(info.event, e)
                                );
                                info.el.addEventListener(
                                  'click',
                                  e => {
                                    if (e.button === 2) {
                                      e.preventDefault();
                                      e.stopImmediatePropagation();
                                    }
                                  },
                                  { capture: true }
                                );
                              }}
                        />
                    </Box>
                </Fade>
                <Menu
                    open={Boolean(contextMenu)}
                    onClose={handleCloseContextMenu}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <MenuItem onClick={handleCopy}>Copiar</MenuItem>
                    <MenuItem onClick={handlePaste} disabled={!copiedEvents.length}>Pegar</MenuItem>
                    <MenuItem onClick={handleDuplicate}>Duplicar</MenuItem>
                    <MenuItem onClick={handleRedo}>Rehacer</MenuItem>
                    <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
                </Menu>

                <Dialog
                    open={openResumen}
                    onClose={handleCloseResumen}
                    PaperProps={{
                        sx: {
                            borderRadius: '16px',
                            background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
                            boxShadow: '0 12px 40px rgba(31, 38, 135, 0.25)',
                            minWidth: '450px',
                            overflow: 'hidden',
                            animation: `${fadeIn} 0.3s ease-out forwards`
                        }
                    }}
                >
                    <DialogTitle sx={{
                        background: 'linear-gradient(90deg, #4dabf7 0%, #69c0ff 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        py: 2
                    }}>
                        <SummarizeIcon fontSize="large" />
                        <Box>
                            <Typography variant="h6" fontWeight="bold">Resumen de Eventos</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>Estadísticas de tus actividades</Typography>
                        </Box>
                    </DialogTitle>

                    <DialogContent dividers sx={{ py: 3 }}>
                        {informe ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    borderRadius: '12px',
                                    background: 'rgba(77, 171, 247, 0.08)'
                                }}>
                                    <Avatar sx={{ bgcolor: '#4dabf7' }}>
                                        <EventIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Total de eventos
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold" color="#1a237e">
                                            {informe.total_eventos}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{
                                        mb: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: '#4dabf7'
                                    }}>
                                        <PieChartOutlineIcon fontSize="small" />
                                        Distribución por tipo
                                    </Typography>

                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1.5,
                                        mb: 2
                                    }}>
                                        {Object.entries(informe.distribucion_por_tipo).map(
                                            ([tipo, cantidad]) => (
                                                <Chip
                                                    key={tipo}
                                                    label={`${tipo}: ${cantidad}`}
                                                    sx={{
                                                        borderRadius: '8px',
                                                        background: 'linear-gradient(145deg, rgba(77, 171, 247, 0.1) 0%, rgba(77, 171, 247, 0.05) 100%)',
                                                        border: '1px solid rgba(77, 171, 247, 0.2)',
                                                        fontWeight: 500
                                                    }}
                                                />
                                            )
                                        )}
                                    </Box>

                                    <Box sx={{ mt: 3, mb: 2 }}>
                                        {Object.entries(informe.distribucion_por_tipo).map(
                                            ([tipo, cantidad]) => (
                                                <Box key={tipo} sx={{ mb: 1.5 }}>
                                                    <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                                                        {tipo} ({cantidad})
                                                    </Typography>
                                                    <Box sx={{
                                                        height: '8px',
                                                        borderRadius: '4px',
                                                        background: 'rgba(77, 171, 247, 0.2)',
                                                        width: '100%',
                                                        overflow: 'hidden'
                                                    }}>
                                                        <Box sx={{
                                                            height: '100%',
                                                            borderRadius: '4px',
                                                            background: 'linear-gradient(90deg, #4dabf7 0%, #69c0ff 100%)',
                                                            width: `${(cantidad / informe.total_eventos) * 100}%`,
                                                            transition: 'width 0.5s ease'
                                                        }} />
                                                    </Box>
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '200px'
                            }}>
                                <Typography variant="body1" color="text.secondary">
                                    Cargando resumen...
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>

                    <DialogActions sx={{
                        px: 3,
                        py: 2,
                        background: 'rgba(77, 171, 247, 0.05)'
                    }}>
                        <Button
                            onClick={handleCloseResumen}
                            variant="contained"
                            sx={{
                                backgroundColor: '#4dabf7',
                                color: 'white',
                                borderRadius: '8px',
                                px: 3,
                                textTransform: 'none',
                                fontWeight: 500,
                                ':hover': {
                                    backgroundColor: '#3a8bc8'
                                }
                            }}
                        >
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Box>
    );
}