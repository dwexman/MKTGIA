import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './containers/Home/Home';
import Login from './containers/Auth/Login';
import DoubleSidebarLayout from './components/layout/DoubleSidebarLayout';

import Dashboard from './containers/Comentarios/Dashboard';
import ComentariosPrompts from './containers/Comentarios/ComentariosPrompts';
import RegistroComentarios from './containers/Comentarios/RegistroComentarios';
import Reportes from './containers/Comentarios/reportes/Reportes';

import Optimizar from './containers/AdsBudget/Optimizar';

import CreacionContenido from './containers/Contenido/CreacionContenido';
import Calendario from './containers/Contenido/Calendario';
import Estrategia from './containers/Contenido/Estrategia';
import Planificar from './containers/Contenido/Planificar';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      {/* 1. Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={<Login onLogin={() => setIsAuthenticated(true)} />}
      />

      {/* 2. Rutas protegidas */}
      <Route
        element={
          isAuthenticated
            ? <DoubleSidebarLayout />
            : <Navigate to="/login" replace />
        }
      >
        {/* Dashboard post-login */}
        <Route path="home" element={<Dashboard />} />

        {/* AdsBudget */}
        <Route path="presupuestos/facebook-login" element={<Optimizar />} />

        {/* Contenido */}
        <Route path="contenido/creacion" element={<CreacionContenido />} />
        <Route path="contenido/calendario" element={<Calendario />} />
        <Route path="contenido/estrategia" element={<Estrategia />} />
        <Route path="contenido/planificar" element={<Planificar />} />
        

        {/* Comentarios */}
        <Route path="comentarios/dashboard" element={<Dashboard />} />
        <Route path="comentarios/prompts" element={<ComentariosPrompts />} />
        <Route path="comentarios/registro" element={<RegistroComentarios />} />
        <Route path="comentarios/reportes" element={<Reportes />} />
      </Route>

      {/* 3. Cualquier otra ruta redirige a la portada pública */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
