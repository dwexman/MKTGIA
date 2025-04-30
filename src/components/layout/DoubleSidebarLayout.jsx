import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LeftSidebar from '../sidebar/LeftSidebar';
import SecondarySidebar from '../sidebar/SecondarySidebar';
import Calendar from '../Calendar';
import Dashboard from '../../containers/Comentarios/Dashboard';
import ComentariosPrompts from '../../containers/Comentarios/ComentariosPrompts';
import RegistroComentarios from '../../containers/Comentarios/RegistroComentarios';
import Reportes from '../../containers/Comentarios/reportes/Reportes';
import Header from './Header';
import Home from '../../containers/Home/Home';
import Optimizar from '../../containers/AdsBudget/Optimizar';
import CreacionContenido from '../../containers/Contenido/CreacionContenido';
import Calendario from '../../containers/Contenido/Calendario';



const DoubleSidebarLayout = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [leftWidth, setLeftWidth] = useState(60);
  const [secondaryExpanded, setSecondaryExpanded] = useState(false);
  const location = useLocation();


  const handleSelectItem = (item) => {
    setSelectedSection(item);
  };

  const handleLeftWidthChange = (width) => {
    setLeftWidth(width);
  };

  const secondaryWidth = secondaryExpanded ? 240 : 90;
  
  const mainMarginLeft = location.pathname === '/comentarios/registro' && selectedSection 
    ? leftWidth + (secondaryExpanded ? 240 : 90)
    : 0;


  return (
    <>
    <Header />
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <LeftSidebar onSelectItem={handleSelectItem} onWidthChange={handleLeftWidthChange} />
      <SecondarySidebar section={selectedSection} leftSidebarWidth={leftWidth} onExpandChange={setSecondaryExpanded} />

      <Box component="main" 
      sx={{
          flexGrow: 1,
          p: 0,
          transition: 'margin 0.3s ease', 
          ml: `${mainMarginLeft}px`  
        }}
      >
        <Routes>
        <Route path="/home" element={<Dashboard />} />

          {/* AdsBudget */}
          <Route
            path="/presupuestos/facebook-login"
            element={<Optimizar />}
          />

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
          <Route
            path="/comentarios/reportes"
            element={<Reportes />}
          />

          {/* Contenido */}
           <Route
            path="/contenido/creacion"
            element={<CreacionContenido />}
          />

          <Route
            path="/contenido/calendario"
            element={<Calendario />}
          />


          {/* Fallback */}
          <Route
            path="*"
            element={<Home />}
          />
        </Routes>
      </Box>
    </Box>
    </>
  );
};

export default DoubleSidebarLayout;
