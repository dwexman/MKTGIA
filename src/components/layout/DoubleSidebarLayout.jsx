import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import LeftSidebar from '../sidebar/LeftSidebar';
import SecondarySidebar from '../sidebar/SecondarySidebar';
import Calendar from '../Calendar';

const DoubleSidebarLayout = () => {
  const [showSecondary, setShowSecondary] = useState(false);
  const [leftWidth, setLeftWidth] = useState(60);

  const handleSelectItem = (item) => {
    if (item === 'Contenido') {
      setShowSecondary(true);
    } else {
      setShowSecondary(false);
    }
  };

  const handleLeftWidthChange = (width) => {
    setLeftWidth(width);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <LeftSidebar onSelectItem={handleSelectItem} onWidthChange={handleLeftWidthChange} />
      {showSecondary && <SecondarySidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Routes>
          <Route path="/content_calendar/calendario" element={<Calendar />} />
          <Route path="*" element={<div>Seleccione una opción del sidebar.</div>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default DoubleSidebarLayout;
