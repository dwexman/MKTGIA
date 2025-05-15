import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

  const handleAccept = () => {
    if (!from || from === '/login') {
      // si no hay origen o venimos del login, volvemos al login
      navigate('/login');
    } else {
      // si venimos de otra página dentro de la app, volvemos a ella
      navigate(from);
    }
  };

  // Estilo común para todas las listas
  const listStyle = {
    listStyle: 'none',
    pl: 0,
    mb: 3,
    '& li': {
      position: 'relative',
      pl: '32px',
      mb: 2,
      color: '#ffffff',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '8px',
        top: '8px',
        width: '8px',
        height: '8px',
        backgroundColor: '#4dabf7',
        borderRadius: '50%'
      }
    }
  };

  const terms = [
    {
      title: "1. Aceptación de los Términos",
      content: "Al acceder o utilizar nuestra aplicación de Facebook (CONTESTADOR DE MENSAJES), el usuario declara haber leído, entendido y aceptado estar sujeto a estos Términos y Condiciones, así como a la Política de Privacidad que se detalla a continuación. Si el usuario no acepta estos términos, no deberá utilizar la aplicación."
    },
    {
      title: "2. Descripción de la Aplicación",
      content: "La aplicación de Facebook 'CONTESTADOR DE MENSAJES' (en adelante, 'la Aplicación') ayuda a gestionar comentarios y mensajes en cuentas de Facebook e Instagram, permitiendo al usuario responder interacciones de terceros en estas redes sociales. Su propósito es optimizar la interacción con seguidores, potenciales clientes o público general, moderar contenido, así como recopilar ciertos datos relevantes para la gestión de la reputación en línea."
    },
    {
      title: "3. Permisos de la Aplicación",
      content: (
        <Box>
          <Typography variant="body1" sx={{ mb: 3, color: 'white' }}>
            La Aplicación solicita los siguientes permisos para su correcto funcionamiento, de acuerdo con las APIs de Facebook e Instagram:
          </Typography>

          <Box component="ul" sx={listStyle}>
            {[
              "instagram_business_basic: Permite leer información básica de la cuenta de Instagram Business conectada (por ejemplo, ID de la cuenta, nombre de usuario, estado de la cuenta).",
              "instagram_business_manage_messages: Permite acceder y gestionar los mensajes directos de la cuenta de Instagram Business, de modo que la Aplicación pueda leer y responder mensajes en nombre del usuario.",
              "instagram_business_content_publish: Permite a la Aplicación publicar contenido en la cuenta de Instagram Business, como respuestas a comentarios, bajo la autorización del usuario.",
              "instagram_manage_messages: Permite gestionar mensajes de Instagram (tanto leer como responder), asegurando la interacción con la audiencia de la cuenta del usuario.",
              "instagram_business_manage_comments: Permite acceder y gestionar comentarios en las publicaciones de la cuenta de Instagram Business para responder, ocultar u organizar estos comentarios.",
              "instagram_basic: Proporciona acceso básico a la información de la cuenta de Instagram (ID, nombre de usuario, tipo de cuenta, etc.) para identificar correctamente la cuenta que se está gestionando.",
              "Human Agent: Permite a la Aplicación comportarse como un agente humano en la plataforma de mensajería, lo que posibilita enviar mensajes de servicio al cliente más allá de las ventanas de mensajería estándar."
            ].map((item, index) => (
              <Box key={index} component="li">
                <Typography variant="body1">{item}</Typography>
              </Box>
            ))}
          </Box>

          <Typography variant="body1" sx={{ color: 'white' }}>
            La Aplicación utilizará estos permisos exclusivamente para las funciones descritas: leer y responder comentarios, gestionar mensajes directos, y publicar respuestas o contenidos en nombre del usuario. No se utilizarán estos permisos con otros fines, ni se transferirá información a terceros sin la debida autorización del usuario o sin cumplir las normativas aplicables.
          </Typography>
        </Box>
      )
    },
    {
      title: "4. Datos Recopilados y Almacenamiento",
      content: (
        <Box>
          <Typography variant="body1" sx={{ mb: 3, color: 'white' }}>
            La Aplicación puede recopilar las siguientes categorías de datos:
          </Typography>

          <Box component="ul" sx={listStyle}>
            {[
              "Comentarios y mensajes recibidos en las publicaciones y cuentas del usuario en Facebook e Instagram.",
              "Información básica de la cuenta de Instagram Business y la página de Facebook, incluida su identificación (ID), nombre de la cuenta/página y tokens de acceso.",
              "Metadatos asociados a la interacción (por ejemplo, ID del comentario, ID del autor, fecha y hora del comentario o mensaje)."
            ].map((item, index) => (
              <Box key={index} component="li">
                <Typography variant="body1" sx={{ color: 'white' }}>{item}</Typography>
              </Box>
            ))}
          </Box>

          <Typography variant="body1" sx={{ mb: 3, mt: 3, color: 'white' }}>
            Estos datos se utilizan para:
          </Typography>

          <Box component="ul" sx={listStyle}>
            {[
              "Responder de manera personalizada a los comentarios y mensajes.",
              "Ocultar o moderar contenido que se considere ofensivo, spam o no deseado.",
              "Almacenar historiales de interacción para análisis interno o mejora del servicio."
            ].map((item, index) => (
              <Box key={index} component="li">
                <Typography variant="body1" sx={{ color: 'white' }}>{item}</Typography>
              </Box>
            ))}
          </Box>

          <Typography variant="body1" sx={{ color: 'white' }}>
            Los datos recopilados pueden ser almacenados en hojas de cálculo de Google Sheets u otros proveedores de servicios en la nube con los cuales la Aplicación se integra. Se han tomado medidas razonables de seguridad para proteger los datos del acceso no autorizado, uso indebido o divulgación. Sin embargo, el usuario reconoce y acepta que ningún sistema es completamente seguro, y que el desarrollador no garantiza la seguridad absoluta de la información.
          </Typography>
        </Box>
      )
    },
    {
      title: "5. Uso del Contenido Generado",
      content: "La Aplicación puede generar respuestas automáticas personalizadas empleando servicios externos, incluyendo APIs de procesamiento de lenguaje natural. Estas respuestas se basan en el contenido del comentario original y siguen las directrices establecidas por el administrador de la cuenta."
    },
    {
      title: "6. Eliminación de Datos del Usuario",
      content: "El usuario puede solicitar la eliminación de sus datos personales y la desconexión de la cuenta de las funciones de la Aplicación en cualquier momento. Para ello, deberá notificar al desarrollador o utilizar el proceso automatizado disponible en la Aplicación. Tras recibir la solicitud, se eliminarán las informaciones relacionadas del sistema y se notificará al usuario de la confirmación de dicha eliminación."
    },
    {
      title: "7. Cumplimiento con las Políticas de Facebook e Instagram",
      content: "La Aplicación cumple con las políticas y normativas de la Plataforma de Facebook e Instagram, incluyendo las Políticas de Desarrolladores de Facebook e Instagram. Esto implica que el manejo de datos, la obtención de permisos y el uso de las APIs se hacen conforme a los términos vigentes, para garantizar que el usuario mantenga el control de su información y su experiencia en la plataforma."
    },
    {
      title: "8. Uso Exclusivo y Condiciones para Permisos de Instagram",
      content: (
        <Box>
          <Typography variant="body1" sx={{ mb: 3, color: 'white' }}>
            La obtención y uso de los permisos solicitados a Instagram están sujetos a un proceso de revisión adicional por parte de Meta (Facebook), en cumplimiento de sus políticas y directrices. Con este fin, se establece lo siguiente:
          </Typography>

          <Box component="ul" sx={listStyle}>
            {[
              "La Aplicación utilizará los permisos indicados únicamente para los fines establecidos en la Sección 3, tales como la gestión de mensajes, comentarios y publicaciones en la cuenta de Instagram Business.",
              "El uso de estos permisos se realizará de forma transparente y exclusiva para optimizar la interacción con seguidores, moderar contenido y brindar un servicio personalizado, sin incurrir en recolección masiva de datos o actividades que contravengan las normativas de Instagram.",
              "El usuario y el desarrollador reconocen y consienten que el acceso a la información y funcionalidades de la cuenta de Instagram Business se realizará únicamente con la autorización expresa del usuario y conforme a las políticas vigentes de Instagram y Facebook.",
              "Se implementarán medidas de seguridad y auditoría para registrar y controlar todas las acciones realizadas a través de dichos permisos, garantizando la trazabilidad y el cumplimiento normativo.",
              "El desarrollador se compromete a mantener la aplicación actualizada de acuerdo con las modificaciones en las políticas de Instagram, notificando oportunamente a los usuarios sobre cualquier cambio que pudiera afectar el uso de dichos permisos.",
              "Cualquier incumplimiento de estas condiciones podrá resultar en la revocación de los permisos por parte de Instagram, así como en las sanciones correspondientes conforme a la normativa aplicable."
            ].map((item, index) => (
              <Box key={index} component="li">
                <Typography variant="body1" sx={{ color: 'white' }}>{item}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )
    },
    {
      title: "9. Responsabilidad",
      content: "El uso de la Aplicación se realiza bajo el propio riesgo del usuario. El desarrollador no será responsable por daños directos, indirectos, especiales, incidentales o consecuentes derivados del uso o la imposibilidad de uso de la Aplicación, incluida la pérdida de datos o la falta de disponibilidad del servicio."
    },
    {
      title: "10. Modificaciones a los Términos y Condiciones",
      content: "El desarrollador se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. En caso de que se realicen cambios sustanciales, se notificará a los usuarios a través de los medios habituales. El uso continuado de la Aplicación después de la modificación implicará la aceptación de los nuevos términos."
    },
    {
      title: "11. Ley Aplicable y Jurisdicción",
      content: "Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del país o jurisdicción del desarrollador, sin perjuicio de los principios sobre conflictos de leyes. Cualquier disputa derivada de estos Términos y Condiciones se someterá a la jurisdicción exclusiva de los tribunales competentes en dicha jurisdicción."
    },
    {
      title: "12. Contacto",
      content: "Si el usuario tiene alguna pregunta, inquietud o comentario con respecto a estos Términos y Condiciones, puede ponerse en contacto con el desarrollador a través del correo electrónico o el formulario de contacto que se indique en la plataforma."
    }
  ];

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a1929 0%, #1a237e 100%)',
        overflow: 'hidden',
        position: 'relative',
        py: 4
      }}
    >
      <Paper
        elevation={24}
        sx={{
          width: '100%',
          maxWidth: 800,
          p: 4,
          position: 'relative',
          borderRadius: '8px',
          zIndex: 2,
          background: 'rgba(16, 20, 55, 0.98)',
          border: '5px solid rgba(77, 171, 247, 0.3)'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            color: '#4dabf7',
            textShadow: '0 0 12px rgba(77, 171, 247, 0.6)',
            textAlign: 'center'
          }}
        >
          TÉRMINOS Y CONDICIONES
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#ffffff',
            mb: 4,
            textAlign: 'center',
            fontSize: '1.1rem'
          }}
        >
          Por favor, lea atentamente los siguientes términos y condiciones antes de utilizar nuestra aplicación.
        </Typography>

        <Box sx={{ mb: 4 }}>
          {terms.map((term, index) => (
            <Accordion
              key={index}
              defaultExpanded
              sx={{
                background: 'rgba(26, 35, 126, 0.2)',
                border: '1px solid rgba(77, 171, 247, 0.5)',
                borderRadius: '4px !important',
                mb: 2,
                '&:before': {
                  display: 'none'
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#4dabf7' }} />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center'
                  }
                }}
              >
                <Typography
                  sx={{
                    flexShrink: 0,
                    color: '#4dabf7',
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}
                >
                  {term.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper
                  sx={{
                    p: 3,
                    background: 'rgba(10, 25, 41, 0.7)',
                    border: '1px solid rgba(77, 171, 247, 0.3)',
                    borderRadius: '4px'
                  }}
                >
                  {typeof term.content === 'string' ? (
                    <Typography sx={{ color: '#ffffff', lineHeight: 1.6 }}>
                      {term.content}
                    </Typography>
                  ) : (
                    term.content
                  )}
                </Paper>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Divider sx={{ borderColor: 'rgba(77, 171, 247, 0.3)', my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleAccept}
            sx={{
              background: 'linear-gradient(145deg, #4dabf7 0%, #1a237e 100%)',
              color: '#ffffff',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              '&:hover': {
                background: 'linear-gradient(145deg, #1a237e 0%, #4dabf7 100%)',
                boxShadow: '0 0 15px rgba(77, 171, 247, 0.5)'
              }
            }}
          >
            Aceptar Términos
          </Button>
        </Box>
      </Paper>

      {/* Efectos de fondo */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(77, 171, 247, 0.1) 0%, transparent 50%)',
          zIndex: 1
        }}
      />
    </Box>
  );
};

export default TermsAndConditions;