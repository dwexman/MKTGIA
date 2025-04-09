import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DoubleSidebarLayout from './components/layout/DoubleSidebarLayout';
import Login from './containers/Auth/Login';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        {/* Ruta para el login */}
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <DoubleSidebarLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </DndProvider>
  );
}

export default App;
