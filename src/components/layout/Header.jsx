// src/components/Header.js
import React from 'react';
import { Box } from '@mui/material';
import logo from '../../assets/logoblack.png'; // Ajusta la ruta según tu estructura

const Header = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        p: 1,
        zIndex: 1100,
        backgroundColor: 'transparent', 
      }}
    >
      <img src={logo} alt="Logo" style={{ height: '50px' }} />
    </Box>
  );
};

export default Header;
