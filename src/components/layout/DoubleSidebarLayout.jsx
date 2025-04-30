import React, { useState, useEffect } from 'react';
import { Box, Toolbar } from '@mui/material';
import { useLocation, Outlet } from 'react-router-dom';

import Header from './Header';
import LeftSidebar from '../sidebar/LeftSidebar';
import SecondarySidebar from '../sidebar/SecondarySidebar';

export default function DoubleSidebarLayout() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [leftWidth, setLeftWidth] = useState(60);
  const [secondaryExpanded, setSecondaryExpanded] = useState(false);
  const location = useLocation();

  // Cambia la sección activa del secondary sidebar según la ruta
  useEffect(() => {
    if (location.pathname.startsWith('/presupuestos')) {
      setSelectedSection('AdsBudget');
    } else if (location.pathname.startsWith('/contenido')) {
      setSelectedSection('Contenido');
    } else if (location.pathname.startsWith('/comentarios')) {
      setSelectedSection('Comentarios');
    } else {
      setSelectedSection(null);
    }
  }, [location.pathname]);

  // callbacks que pasan a los sidebars
  const handleLeftWidthChange = (width) => setLeftWidth(width);
  const handleSecondaryExpand = (expanded) => setSecondaryExpanded(expanded);

  // margen para empujar el contenido a la derecha de los dos sidebars
  const mainMarginLeft = leftWidth + (secondaryExpanded ? 240 : 90);

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <LeftSidebar
          onSelectItem={setSelectedSection}
          onWidthChange={handleLeftWidthChange}
        />
        <SecondarySidebar
          section={selectedSection}
          leftSidebarWidth={leftWidth}
          onExpandChange={handleSecondaryExpand}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: 'margin 0.3s ease',
            ml: `${mainMarginLeft}px`
          }}
        >
          {/* Toolbar para dejar espacio bajo el Header fijo */}
          <Toolbar />

          {/* Aquí rota CreacionContenido, Calendario, Estrategia, etc. */}
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
