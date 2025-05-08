import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import logo from '../../assets/logoblack.png'; 

const Header = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        p: 1,
        zIndex: 1100,
        backgroundColor: 'transparent', 
      }}
    >
      <Link to="/comentarios/dashboard">
      <img src={logo} alt="Logo" style={{ height: '50px' }} />
      </Link>
    </Box>
  );
};

export default Header;
