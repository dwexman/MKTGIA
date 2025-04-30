import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './containers/Home/Home';
import Login from './containers/Auth/Login';
import DoubleSidebarLayout from './components/layout/DoubleSidebarLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>

      {/* Ruta pública */}
      <Route path="/" element={<Home />} />

      {/* Ruta para el Login */}
      <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

      {/* Rutas protegidas con el layout */}
      <Route
        element={
          isAuthenticated ? (
            <DoubleSidebarLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        {/* Dentro del layout se definen todas las rutas de la aplicación */}
        <Route path="/home" element={<div />} />
        <Route path="/presupuestos/facebook-login" element={<div />} />
        <Route path="/content_calendar/calendario" element={<div />} />
        <Route path="/comentarios/dashboard" element={<div />} />
        <Route path="/comentarios/prompts" element={<div />} />
        <Route path="/comentarios/registro" element={<div />} />
        <Route path="/comentarios/reportes" element={<div />} />
        <Route path="/contenido/creacion" element={<div />} />
        <Route path="/contenido/calendario" element={<div />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
