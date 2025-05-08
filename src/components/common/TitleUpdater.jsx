import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function TitleUpdater() {
  const { pathname } = useLocation();

  // Mapa estático de rutas → títulos
  const titles = {
    '/':                                'Inicio · Marketing 21',
    '/terminos-condiciones':            'Términos y Condiciones',
    '/login':                           'Login',
    '/home':                            'Dashboard',
    '/presupuestos/facebook-login':     'Optimizar Presupuestos',
    '/contenido/creacion':              'Creación de Contenido',
    '/contenido/calendario':            'Calendario',
    '/contenido/estrategia':            'Estrategia',
    '/contenido/planificar':            'Planificar',
    '/comentarios/dashboard':           'Dashboard de Comentarios',
    '/comentarios/prompts':             'Prompts de Comentarios',
    '/comentarios/registro':            'Registro de Comentarios',
    '/comentarios/reportes':            'Reportes de Comentarios',
  };

  useEffect(() => {
    let title = titles[pathname] || 'Marketing 21';

    // Ruta dinámica de edición de evento
    if (pathname.startsWith('/contenido/calendario/editar')) {
      title = 'Editar Evento';
    }

    document.title = title;
  }, [pathname]);

  return null;
}
