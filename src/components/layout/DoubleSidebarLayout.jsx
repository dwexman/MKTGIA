import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import LeftSidebar from '../sidebar/LeftSidebar';
import SecondarySidebar from '../sidebar/SecondarySidebar';
import Calendar from '../Calendar';
import Dashboard from '../../containers/Comentarios/Dashboard';
import ComentariosPrompts from '../../containers/Comentarios/ComentariosPrompts';
import RegistroComentarios from '../../containers/Comentarios/RegistroComentarios';


const DoubleSidebarLayout = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [leftWidth, setLeftWidth] = useState(60);

  const handleSelectItem = (item) => {
    setSelectedSection(item);
  };

  const handleLeftWidthChange = (width) => {
    setLeftWidth(width);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <LeftSidebar onSelectItem={handleSelectItem} onWidthChange={handleLeftWidthChange} />
      <SecondarySidebar section={selectedSection} />

      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Routes>
          {/* Contenido */}
          <Route
            path="/content_calendar/calendario"
            element={<Calendar />}
          />

          {/* Comentarios */}
          <Route
            path="/comentarios/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/comentarios/prompts"
            element={<ComentariosPrompts />}
          />
          <Route
            path="/comentarios/registro"
            element={<RegistroComentarios />}
  />

          {/* Fallback */}
          <Route
            path="*"
            element={<div>Seleccione una opción del sidebar.</div>}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default DoubleSidebarLayout;
