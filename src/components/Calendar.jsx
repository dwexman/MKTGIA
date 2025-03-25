import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Fade } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { keyframes } from '@emotion/react';

const formatDate = (date) => date.toISOString().split('T')[0];
const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Animación contenedor
const containerFloat = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
`;

const DraggableEvent = ({ event }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [event]);

  return (
    <Paper
      ref={drag}
      sx={{
        p: 1,
        mt: 0.5,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        color: '#1a237e',
        cursor: 'grab',
        borderRadius: '6px',
        opacity: isDragging ? 0.5 : 1,
        boxShadow: `0 2px 8px ${event.color}40`,
        transition: 'all 0.2s ease',
        border: '1px solid rgba(77, 171, 247, 0.2)',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 12px ${event.color}60`
        }
      }}
    >
      <Typography variant="body2" sx={{ 
        fontWeight: 500,
        fontSize: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: event.color,
          boxShadow: `0 0 8px ${event.color}`
        }} />
        {event.title}
      </Typography>
    </Paper>
  );
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, date: formatDate(new Date()), title: "Análisis de Campaña", color: "#4dabf7" },
    { id: 2, date: formatDate(new Date(new Date().setDate(new Date().getDate() + 2))), title: "Optimización IA", color: "#ff6b6b" },
  ]);

  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    let days = [];

    if (startDay > 0) {
      const prevMonthLastDate = new Date(year, month, 0).getDate();
      for (let i = startDay - 1; i >= 0; i--) {
        days.push({ date: new Date(year, month - 1, prevMonthLastDate - i), isCurrentMonth: false });
      }
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }

    while (days.length % 7 !== 0 || days.length < 42) {
      const nextDate = new Date(year, month, lastDayOfMonth.getDate() + (days.length - (startDay + lastDayOfMonth.getDate())) + 1);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const handleDrop = (item, day) => {
    const newDate = formatDate(day.date);
    setEvents(prevEvents => prevEvents.map(ev => ev.id === item.id ? { ...ev, date: newDate } : ev));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const calendarDays = getCalendarDays();

  const getEventsForDay = (day) => {
    return events.filter(ev => ev.date === formatDate(day.date));
  };

  return (
    <Box sx={{ 
      p: 3,
      display: 'flex',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #f8f9ff 0%, #e6f0ff 100%)',
      minHeight: '100vh',
      width: '100%'
    }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          border: '1px solid rgba(77, 171, 247, 0.2)',
          width: '1000px',
          minWidth: '1000px',
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
        }}
      >
        {/* Header de navegación */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(145deg, rgba(77, 171, 247, 0.1) 0%, rgba(77, 171, 247, 0.05) 100%)',
          borderRadius: '12px',
          p: 1.5,
          mb: 3,
          border: '1px solid rgba(77, 171, 247, 0.15)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
        }}>
          <Button
            onClick={goToPreviousMonth}
            startIcon={<ArrowBackIosIcon sx={{ fontSize: '14px' }} />}
            sx={{
              color: '#4dabf7',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              ':hover': {
                background: 'rgba(77, 171, 247, 0.08)'
              }
            }}
          >
            Anterior
          </Button>
          
          <Typography variant="h6" sx={{
            color: '#1a237e',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(77, 171, 247, 0.1)'
          }}>
            {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase()}
          </Typography>
          
          <Button
            onClick={goToNextMonth}
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: '14px' }} />}
            sx={{
              color: '#4dabf7',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              ':hover': {
                background: 'rgba(77, 171, 247, 0.08)'
              }
            }}
          >
            Siguiente
          </Button>
        </Box>

        <Fade in={true} timeout={500}>
          <Box>
            {/* Días de la semana */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 1.5,
              mb: 2,
              '& > *': {
                color: '#4dabf7',
                fontWeight: 600,
                fontSize: '0.9rem',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(77, 171, 247, 0.1)'
              }
            }}>
              {daysOfWeek.map((day, idx) => (
                <Box key={idx}>{day}</Box>
              ))}
            </Box>

            {/* Grilla de días */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 1.5
            }}>
              {calendarDays.map((day, idx) => {
                const [{ isOver }, drop] = useDrop(() => ({
                  accept: 'EVENT',
                  drop: (item) => handleDrop(item, day),
                  collect: (monitor) => ({
                    isOver: !!monitor.isOver(),
                  }),
                }), [day]);

                return (
                  <Box
                    key={idx}
                    ref={drop}
                    sx={{
                      height: '120px',
                      position: 'relative',
                      borderRadius: '8px',
                      background: day.isCurrentMonth 
                        ? 'rgba(255, 255, 255, 0.95)' 
                        : 'rgba(245, 245, 255, 0.7)',
                      p: 1.5,
                      border: '1px solid rgba(77, 171, 247, 0.15)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease',
                      ...(isOver && { 
                        background: 'rgba(77, 171, 247, 0.08)',
                        boxShadow: '0 0 15px rgba(77, 171, 247, 0.2)'
                      }),
                      ':hover': { 
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 16px rgba(77, 171, 247, 0.15)'
                      },
                      '& .MuiTypography-caption': {
                        color: '#1a237e',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        mb: 0.5
                      }
                    }}
                  >
                    <Typography variant="caption">
                      {day.date.getDate()}
                    </Typography>
                    {getEventsForDay(day).map(ev => (
                      <DraggableEvent key={ev.id} event={ev} />
                    ))}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Fade>
      </Paper>
    </Box>
  );
};

export default Calendar;