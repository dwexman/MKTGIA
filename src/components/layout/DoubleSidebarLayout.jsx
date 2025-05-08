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

  useEffect(() => {
    if (location.pathname.startsWith('/presupuestos')) setSelectedSection('AdsBudget');
    else if (location.pathname.startsWith('/contenido')) setSelectedSection('Contenido');
    else if (location.pathname.startsWith('/comentarios')) setSelectedSection('Comentarios');
    else setSelectedSection(null);
  }, [location.pathname]);

  const SEC_WIDTH = {
    expanded: 240,
    collapsed: 90,
  };
  const secondaryWidth = secondaryExpanded ? SEC_WIDTH.expanded : SEC_WIDTH.collapsed;

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `${leftWidth}px ${secondaryWidth}px 1fr`,
          minHeight: '100vh'
        }}
      >
        <LeftSidebar
          onSelectItem={setSelectedSection}
          onWidthChange={setLeftWidth}
        />

        <SecondarySidebar
          section={selectedSection}
          leftSidebarWidth={leftWidth}
          onExpandChange={setSecondaryExpanded}
        />

        <Box component="main">
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
