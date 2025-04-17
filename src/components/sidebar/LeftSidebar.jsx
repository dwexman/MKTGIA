import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Box,
  Divider,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import PushPinIcon from '@mui/icons-material/PushPin';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const LeftSidebar = ({ onSelectItem, onWidthChange }) => {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const drawerWidth = pinned || hovered ? 250 : 100;
  const isExpanded = pinned || hovered;

  useEffect(() => {
    if (onWidthChange) onWidthChange(drawerWidth);
  }, [drawerWidth, onWidthChange]);

  const handleMouseEnter = () => !pinned && setHovered(true);
  const handleMouseLeave = () => !pinned && setHovered(false);
  const togglePin = () => {
    setPinned(!pinned);
    setHovered(false);
  };

  const handleItemClick = (index, itemName) => {
    setSelectedIndex(index);
    onSelectItem?.(itemName);
  };

  // Efectos visuales
  const glassEffect = {
    background: 'rgba(16, 20, 55, 0.85)',
    backdropFilter: 'blur(12px)',
    borderRight: '1px solid rgba(77, 171, 247, 0.3)',
    boxShadow: '4px 0 15px rgba(77, 171, 247, 0.2)'
  };

  const neonText = {
    textShadow: '0 0 12px rgba(77, 171, 247, 0.6)'
  };

  const selectedStyles = {
    '&.Mui-selected': {
      background: 'linear-gradient(90deg, rgba(77, 171, 247, 0.25) 0%, transparent 100%)',
      borderLeft: '3px solid #4dabf7',
      '& .MuiListItemText-root': neonText
    },
    '&:hover': {
      background: 'rgba(77, 171, 247, 0.15)',
      '& .MuiListItemText-root': { color: '#4dabf7' }
    },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '8px',
    m: 1
  };

  const renderIconInCircle = (IconComponent, isSelected) => (
    <Box sx={{
      width: isExpanded ? 48 : 36,
      height: isExpanded ? 48 : 36,
      borderRadius: '50%',
      background: isSelected
        ? 'linear-gradient(145deg, #4dabf7 0%, #1a237e 100%)'
        : 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: isSelected
        ? '0 0 15px rgba(77, 171, 247, 0.5)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      marginRight: isExpanded ? 0 : '12px',
      border: isSelected
        ? '1px solid rgba(77, 171, 247, 0.5)'
        : '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <IconComponent sx={{
        color: isSelected ? '#fff' : '#4dabf7',
        fontSize: '1.4rem',
        filter: isSelected ? 'drop-shadow(0 0 2px white)' : 'none'
      }} />
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      open
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      PaperProps={{
        sx: {
          ...glassEffect,
          width: drawerWidth,
          transition: 'width 0.3s ease',
          color: '#fff',
          overflowX: 'hidden'
        }
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: 'width 0.3s ease',
      }}
    >
      <Toolbar sx={{
        minHeight: '64px !important',
        borderBottom: '1px solid rgba(77, 171, 247, 0.2)',
        display: 'flex',
        justifyContent: isExpanded ? 'space-between' : 'center',
        alignItems: 'center',
        px: 2
      }}>
        {isExpanded && (
          <Typography variant="h6" sx={{
            fontWeight: 600,
            letterSpacing: '1px',
            ...neonText,
            fontFamily: 'Arial Rounded MT Bold'
          }}>
            MKTG AI
          </Typography>
        )}
        <IconButton
          onClick={togglePin}
          sx={{
            color: '#4dabf7',
            '&:hover': {
              background: 'rgba(77, 171, 247, 0.1)'
            },
            transition: 'transform 0.3s'
          }}
        >
          {pinned ?
            <PushPinIcon sx={{
              transform: 'rotate(45deg)',
              filter: 'drop-shadow(0 0 2px #4dabf7)'
            }} /> :
            <MenuIcon sx={{ fontSize: '1.5rem' }} />
          }
        </IconButton>
      </Toolbar>

      <Divider sx={{ borderColor: 'rgba(77, 171, 247, 0.2)' }} />

      <List component="nav" sx={{ py: 2, px: 1 }}>
        {/* AdsBudget */}
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={() => handleItemClick(0, 'AdsBudget')}
          component={Link}
          to="/presupuestos/facebook-login"
          sx={selectedStyles}
        >
          <ListItemIcon sx={{ minWidth: isExpanded ? 56 : 40 }}>
            {renderIconInCircle(BarChartIcon, selectedIndex === 0)}
          </ListItemIcon>
          {isExpanded && (
            <ListItemText
              primary="AdsBudget"
              sx={{
                ml: 2,
                '& .MuiTypography-root': {
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  ...neonText,
                  fontSize: '0.95rem'
                }
              }}
            />
          )}
        </ListItemButton>

        {/* Comentarios */}
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={() => handleItemClick(1, 'Comentarios')}
          sx={selectedStyles}
        >
          <ListItemIcon sx={{ minWidth: isExpanded ? 56 : 40 }}>
            {renderIconInCircle(ChatIcon, selectedIndex === 1)}
          </ListItemIcon>
          {isExpanded && (
            <ListItemText
              primary="Comentarios"
              sx={{
                ml: 2,
                '& .MuiTypography-root': {
                  fontWeight: 500,
                  ...neonText,
                  fontSize: '0.95rem'
                }
              }}
            />
          )}
        </ListItemButton>

        {/* Contenido */}
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={() => handleItemClick(2, 'Contenido')}
          component={Link}
          to="/content_calendar/index"
          sx={selectedStyles}
        >
          <ListItemIcon sx={{ minWidth: isExpanded ? 56 : 40 }}>
            {renderIconInCircle(DescriptionIcon, selectedIndex === 2)}
          </ListItemIcon>
          {isExpanded && (
            <ListItemText
              primary="Contenido"
              sx={{
                ml: 2,
                '& .MuiTypography-root': {
                  fontWeight: 500,
                  ...neonText,
                  fontSize: '0.95rem'
                }
              }}
            />
          )}
        </ListItemButton>
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <Divider sx={{ borderColor: 'rgba(77, 171, 247, 0.2)' }} />
        <List>
          <ListItemButton
            onClick={() => window.location.href = '/comentarios/logout'}
            sx={{
              m: 1,
              borderRadius: '8px',
              '&:hover': {
                background: 'rgba(77, 171, 247, 0.15)',
                '& .MuiListItemText-root': { color: '#4dabf7' }
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <ListItemIcon sx={{ minWidth: isExpanded ? 56 : 40 }}>
              {renderIconInCircle(ExitToAppIcon, false)}
            </ListItemIcon>
            {isExpanded && (
              <ListItemText
                primary="Cerrar Sesión"
                sx={{
                  ml: 2,
                  '& .MuiTypography-root': {
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    ...neonText,
                    fontSize: '0.95rem'
                  }
                }}
              />
            )}
          </ListItemButton>
        </List>
      </Box>
    </Drawer>

  );
};

export default LeftSidebar;