import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import TitleUpdater from './components/common/TitleUpdater';

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
import EditEvent from './containers/Contenido/EditEvent';
import Estrategia from './containers/Contenido/Estrategia';
import Planificar from './containers/Contenido/Planificar';

import TermsAndConditions from './containers/Condiciones/TermsAndConditions';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
    <TitleUpdater />
    <Routes>
      {/* 1. Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="terminos-condiciones" element={<TermsAndConditions />} />
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

        <Route path="contenido">
          <Route path="creacion" element={<CreacionContenido />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="calendario/editar/:id" element={<EditEvent />} />
          <Route path="estrategia" element={<Estrategia />} />
          <Route path="planificar" element={<Planificar />} />
        </Route>


        {/* Comentarios */}
        <Route path="comentarios/dashboard" element={<Dashboard />} />
        <Route path="comentarios/prompts" element={<ComentariosPrompts />} />
        <Route path="comentarios/registro" element={<RegistroComentarios />} />
        <Route path="comentarios/reportes" element={<Reportes />} />
      </Route>

      {/* 3. Cualquier otra ruta redirige a la portada pública */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}
