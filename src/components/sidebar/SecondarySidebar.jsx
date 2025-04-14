import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Divider,
  Typography,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PromptIcon from '@mui/icons-material/AutoAwesomeMotion';
import HistoryIcon from '@mui/icons-material/History';
import ReportIcon from '@mui/icons-material/Assessment';

const neonGlow = keyframes`
  from { filter: drop-shadow(0 0 1px #4dabf7); }
  to { filter: drop-shadow(0 0 3px #4dabf7); }
`;

// Configuración de menús por sección
const menus = {
  Contenido: [
    { icon: DescriptionIcon, text: 'Inicio Contenido', to: '/content_calendar/index' },
    { icon: EventIcon, text: 'Calendario', to: '/content_calendar/calendario' },
    { icon: LightbulbIcon, text: 'Estrategia', to: '/content_calendar/estrategia' },
    { icon: ScheduleIcon, text: 'Planificar', to: '/content_calendar/planificar_calendario' },
  ],
  Comentarios: [
    { icon: AccountTreeIcon, text: 'Conectar cuentas', to: '/comentarios/dashboard' },
    { icon: PromptIcon, text: 'Prompts', to: '/comentarios/prompts' },
    { icon: HistoryIcon, text: 'Registro de comentarios', to: '/comentarios/registro' },
    { icon: ReportIcon, text: 'Reportes', to: '/comentarios/reportes' },
  ],
};

const SecondarySidebar = ({ section, leftSidebarWidth, onExpandChange }) => {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const drawerWidth = pinned || hovered ? 240 : 90;
  const isExpanded = pinned || hovered;

  // Efecto para seleccionar la opción por defecto según la sección
  useEffect(() => {
    if (section === 'Comentarios') {
      // Selecciona el primer ítem (índice 0) en la sección Comentarios,
      // que corresponde a "Conectar cuentas"
      setSelectedIndex(0);
    } else {
      // Puedes establecer otro valor o dejarlo en null para otras secciones
      setSelectedIndex(null);
    }
  }, [section]);

  useEffect(() => {
    onExpandChange(pinned || hovered);
  }, [pinned, hovered, onExpandChange]);

  // Si no hay menú para esta sección, no renderiza nada
  const items = menus[section] || [];
  if (items.length === 0) return null;

  const drawerStyles = {
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      position: 'fixed',
      top: 0,
      left: leftSidebarWidth,
      height: '100vh',
      width: drawerWidth,
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      borderRight: '1px solid rgba(77, 171, 247, 0.3)',
      boxShadow: '4px 0 20px rgba(77, 171, 247, 0.2)',
      color: '#e0f2fe',
      background: 'linear-gradient(195deg, rgba(16, 20, 55, 0.9) 0%, rgba(26, 35, 126, 0.8) 100%)'
    }
  };

  const selectedStyles = {
    '&.Mui-selected': {
      background: 'linear-gradient(90deg, rgba(77, 171, 247, 0.2) 0%, transparent 100%)',
      borderLeft: '3px solid #4dabf7',
      '& .MuiListItemIcon-root': { 
        color: '#4dabf7',
        animation: `${neonGlow} 1.5s infinite alternate`
      }
    },
    '&:hover': { 
      background: 'rgba(77, 171, 247, 0.1)',
      transform: 'translateX(5px)'
    },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    m: 1,
    borderRadius: '8px'
  };

  const iconStyle = (isSelected) => ({
    color: isSelected ? '#4dabf7' : '#a5d8ff',
    fontSize: '1.4rem',
    transition: 'all 0.3s',
    ...(isSelected && {
      filter: 'drop-shadow(0 0 2px #4dabf7)'
    })
  });

  return (
    <Drawer
      variant="permanent"
      open
      onMouseEnter={() => !pinned && setHovered(true)}
      onMouseLeave={() => !pinned && setHovered(false)}
      sx={drawerStyles}
    >
      <Toolbar sx={{ 
        minHeight: '64px !important',
        display: 'flex',
        justifyContent: isExpanded ? 'space-between' : 'center',
        alignItems: 'center',
        px: 2,
        borderBottom: '1px solid rgba(77, 171, 247, 0.2)',
        background: 'linear-gradient(90deg, rgba(13, 16, 47, 0.9) 0%, rgba(26, 35, 126, 0.8) 100%)'
      }}>
        {isExpanded && (
          <Typography variant="h6" sx={{
            fontWeight: 600,
            letterSpacing: '1px',
            background: 'linear-gradient(45deg, #4dabf7, #a5d8ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'Arial Rounded MT Bold'
          }}>
            {section}
          </Typography>
        )}
        <IconButton 
          onClick={() => setPinned(!pinned)}
          sx={{ 
            color: '#4dabf7',
            '&:hover': { 
              background: 'rgba(77, 171, 247, 0.2)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s'
          }}
        >
          {pinned ? 
            <ChevronLeftIcon sx={{ fontSize: '1.6rem' }} /> : 
            <ChevronRightIcon sx={{ fontSize: '1.6rem' }} />
          }
        </IconButton>
      </Toolbar>

      <Divider sx={{ borderColor: 'rgba(77, 171, 247, 0.2)' }} />

      <List component="nav" sx={{ py: 1, px: 0.5 }}>
      {items.map((item, index) => (
          <ListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
            component={Link}
            to={item.to}
            sx={selectedStyles}
          >
            <ListItemIcon sx={{ minWidth: 50 }}>
              <Box sx={{
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                background: selectedIndex === index 
                  ? 'linear-gradient(145deg, rgba(77, 171, 247, 0.2) 0%, transparent 100%)' 
                  : 'transparent'
              }}>
                <item.icon sx={iconStyle(selectedIndex === index)} />
              </Box>
            </ListItemIcon>
            {isExpanded && (
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 500,
                  color: '#e0f2fe',
                  fontSize: '0.95rem',
                  letterSpacing: '0.3px',
                  textShadow: '0 0 8px rgba(77, 171, 247, 0.3)'
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>

      {!isExpanded && (
        <Box sx={{
          position: 'absolute',
          bottom: 20,
          right: 8,
          animation: `${neonGlow} 2s infinite alternate`
        }}>
          <ChevronRightIcon sx={{ 
            color: '#4dabf7', 
            fontSize: '1.4rem'
          }} />
        </Box>
      )}
    </Drawer>
  );
};

export default SecondarySidebar;