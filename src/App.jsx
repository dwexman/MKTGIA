import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DoubleSidebarLayout from './components/layout/DoubleSidebarLayout';
import Login from './containers/Auth/Login'; // Asegúrate de tener este componente

function App() {
  // Estado simulado para la autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        {/* Ruta para el login */}
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
        {/* Ruta protegida para el layout principal */}
        <Route
          path="/inicio"
          element={
            isAuthenticated ? (
              <DoubleSidebarLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Redirige la raíz al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Ruta comodín redirige al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </DndProvider>
  );
}

export default App;
