import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Paper, Button, Typography,
  Tooltip, CircularProgress, Alert
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import SelectAccount from './SelectAccount';
import ExcludeCampaigns from './ExcludeCampaigns';
import RoiInput from './RoiInput';
import Step5Resultados from './components/Step5Resultados';
import Step5Eliminados from './components/Step5Eliminados';
import Step5Redistribuir from './components/Step5Redistribuir';
import Step5Metrics from './components/Step5Metrics';
import { getAccounts, getCampaignsToExclude, postAccountSelected } from '../../utils/api';
import './optimizar.css';

const API_BASE = import.meta.env.VITE_API_URL;
const FB_APP_ID = import.meta.env.VITE_FB_APP_ID;

const OPT_VAR_MAP = {
  'Costo por Lead': 'cpl',
  'Costo por 1000 Alcance (CPM)': 'cpm',
  'Costo por Acción (CPA)': 'cpa',
  'Costo por Clic (CPC)': 'cpc',
  'ROAS Facebook (Retorno sobre Gasto Publicitario)': 'roas',
  'ROI Ingreso Manual (Retorno de Inversión)': 'roi_manual'
};

export default function Optimizar() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [campaignTypes, setCampaignTypes] = useState([]);
  const [configStep2, setConfigStep2] = useState(null);
  const [filteredCampaigns, setFiltered] = useState([]);
  const [excludedIds, setExcludedIds] = useState([]);
  const [selectedResultTab, setTab] = useState('resultados_opt');
  const [fbToken, setFbToken] = useState(localStorage.getItem('fbToken') || null);
  const [fbReady, setFbReady] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState({
    global: false,
    facebook: false,
    accounts: false,
    campaigns: false
  });

  // Carga del SDK de Facebook
  useEffect(() => {
    console.log('Iniciando carga de Facebook SDK...');
    
    if (window.FB) {
      console.log('SDK ya estaba cargado');
      setFbReady(true);
      checkLoginStatus();
      return;
    }

    window.fbAsyncInit = function() {
      console.log('Inicializando SDK de Facebook...');
      window.FB.init({
        appId: FB_APP_ID,
        cookie: true,
        xfbml: false,
        version: 'v19.0',
        status: true,
        autoLogAppEvents: true
      });
      setFbReady(true);
      console.log('SDK inicializado con App ID:', FB_APP_ID);
      checkLoginStatus();
    };

    // Cargar script asincrónico
    (function(d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const fjs = element;
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      js.async = true;
      js.defer = true;
      js.crossOrigin = 'anonymous';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  // Verificar estado de login
  const checkLoginStatus = useCallback(() => {
    if (!window.FB) {
      console.error('Facebook SDK no disponible');
      return;
    }

    console.log('Verificando estado de login...');
    setLoading(prev => ({...prev, facebook: true}));
    
    window.FB.getLoginStatus(async (response) => {
      console.log('Respuesta de estado:', response.status);
      
      if (response.status === 'connected') {
        const token = response.authResponse.accessToken;
        console.log('Usuario conectado. Token:', token);
        setFbToken(token);
        localStorage.setItem('fbToken', token);
        
        try {
          setLoading(prev => ({...prev, accounts: true}));
          const accountsData = await getAccounts(API_BASE, token);
          
          if (accountsData.status === 'success') {
            setAccounts(accountsData.accounts || []);
            setCampaignTypes(accountsData.campaign_types || []);
            setStep(2);
          } else {
            setAuthError(accountsData.message || 'Error al obtener cuentas');
          }
        } catch (error) {
          setAuthError(error.message);
        } finally {
          setLoading(prev => ({...prev, accounts: false, facebook: false}));
        }
      } else {
        console.log('Usuario no conectado');
        setLoading(prev => ({...prev, facebook: false}));
      }
    }, true); // Fuerza verificación con Facebook
  }, []);

  // Manejo de conexión con Facebook
  const handleConnectFacebook = useCallback(async () => {
    if (!window.FB) {
      setAuthError('El plugin de Facebook no se cargó correctamente');
      return;
    }

    console.log('Iniciando proceso de login...');
    setLoading(prev => ({...prev, facebook: true}));
    setAuthError(null);

    try {
      const response = await new Promise((resolve) => {
        window.FB.login(resolve, {
          scope: 'business_management,ads_management',
          return_scopes: true,
          auth_type: 'rerequest'
        });
      });

      console.log('Respuesta de login:', response);
      
      if (response.status !== 'connected') {
        throw new Error(response.error?.message || 'El usuario no autorizó la aplicación');
      }

      if (!response.authResponse.grantedScopes.includes('business_management')) {
        throw new Error('Se requieren permisos de business_management');
      }

      const token = response.authResponse.accessToken;
      setFbToken(token);
      localStorage.setItem('fbToken', token);

      // Obtener cuentas después de conectar
      setLoading(prev => ({...prev, accounts: true}));
      const accountsData = await getAccounts(API_BASE, token);
      
      if (accountsData.status === 'success') {
        setAccounts(accountsData.accounts || []);
        setCampaignTypes(accountsData.campaign_types || []);
        setStep(2);
      } else {
        throw new Error(accountsData.message || 'Error al obtener cuentas publicitarias');
      }
    } catch (error) {
      console.error('Error en conexión Facebook:', error);
      setAuthError(error.message);
      localStorage.removeItem('fbToken');
    } finally {
      setLoading(prev => ({...prev, facebook: false, accounts: false}));
    }
  }, []);

  // Paso 2: Continuar con la configuración
  const handleContinueStep2 = async (cfg) => {
    if (!fbToken) {
      setAuthError('Sesión no válida. Vuelve a conectar con Facebook.');
      return;
    }
  
    setLoading(prev => ({ ...prev, campaigns: true }));
    setAuthError(null);
  
    try {
      /* 1️⃣ POST account-selected */
      await postAccountSelected(API_BASE, {
        account_id:  cfg.accountId,
        start_date:   cfg.startDate,
        end_date:     cfg.endDate,
        ...(cfg.campaignType !== 'Todos los tipos' && { campaign_type: cfg.campaignType }),
        optimize_variable: OPT_VAR_MAP[cfg.variable],
        whether_or_not_to_eliminate_the_least_profitable_10_percent:
            cfg.removeWorst ? 'true' : 'false'
      });
  
      /* 2️⃣ GET campañas a excluir */
      const data = await getCampaignsToExclude(API_BASE, {
        account_id:  cfg.accountId,
        start_date:  cfg.startDate,
        end_date:    cfg.endDate,
        ...(cfg.campaignType !== 'Todos los tipos' && { campaign_type: cfg.campaignType }),
        optimize_variable: OPT_VAR_MAP[cfg.variable],
        whether_or_not_to_eliminate_the_least_profitable_10_percent:
            cfg.removeWorst ? 'true' : 'false',
        fb_access_token: fbToken
      });
  
      console.log('➡️ Respuesta campañas', data);   // -- depuración
  
      if (data.status === 'success') {
        setFiltered(data.campaigns || []);
        setConfigStep2(cfg);
        setStep(3);
      } else {
        throw new Error(data.message || 'Error al obtener campañas');
      }
    } catch (err) {
      console.error(err);
      setAuthError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, campaigns: false }));
    }
  };

  const handleOptimizeCampaigns = (excluded, campaigns) => {
    setExcludedIds(excluded);
    setFiltered(campaigns.filter(c => !excluded.includes(c.id)));
    setStep(configStep2?.variable === 'ROI Ingreso Manual (Retorno de Inversión)' ? 4 : 5);
  };

  const handleSubmitRoi = () => setStep(5);
  const backTo1 = () => setStep(1);
  const backTo2 = () => setStep(2);
  const backTo3 = () => setStep(3);

  // Renderizado
  return (
    <Box className="optimizar-container">
      {/* Paso 1: Conexión con Facebook */}
      {step === 1 && (
        <Paper className="optimizar-paper">
          <Box className="optimizar-header">
            <Typography variant="h3" className="optimizar-title">
              Conecta tu cuenta de<br />Facebook Business
            </Typography>
          </Box>

          {authError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {authError}
            </Alert>
          )}

          <Box className="optimizar-status">
            <Typography variant="h5" className="optimizar-status-text">
              Conecta tu cuenta de Facebook Business<br />
              para comenzar a optimizar tus<br />presupuestos publicitarios.
            </Typography>
          </Box>

          <Box className="buttons-row">
            <Tooltip title="Conecta con Facebook para acceder a tus cuentas publicitarias">
              <Button
                variant="contained"
                startIcon={<FacebookIcon />}
                className="facebook-btn"
                size="large"
                disabled={!fbReady || loading.facebook || loading.accounts}
                onClick={handleConnectFacebook}
              >
                {loading.facebook || loading.accounts ? (
                  <>
                    <CircularProgress size={24} sx={{ color: '#fff', mr: 1 }} />
                    Conectando...
                  </>
                ) : (
                  'Conectar Facebook Business'
                )}
              </Button>
            </Tooltip>
          </Box>
        </Paper>
      )}

      {/* Paso 2: Selección de cuenta */}
      {step === 2 && (
        <Paper className="paper-step2">
          {loading.accounts ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <SelectAccount
              accounts={accounts}
              campaignTypes={campaignTypes}
              onBack={backTo1}
              onContinue={handleContinueStep2}
              loading={loading.campaigns}
            />
          )}
        </Paper>
      )}

      {/* Paso 3: Excluir campañas */}
      {step === 3 && (
        <Paper className="paper-step2">
          {loading.campaigns ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress size={60} />
              <Typography variant="body1" sx={{ ml: 2 }}>
                Cargando campañas...
              </Typography>
            </Box>
          ) : (
            <ExcludeCampaigns
              onBack={backTo2}
              onOptimize={handleOptimizeCampaigns}
              campaigns={filteredCampaigns}
            />
          )}
        </Paper>
      )}

      {/* Paso 4: ROI Manual */}
      {step === 4 && (
        <Paper className="paper-step2">
          <RoiInput
            campaigns={filteredCampaigns}
            onBack={backTo3}
            onSubmit={handleSubmitRoi}
          />
        </Paper>
      )}

      {/* Paso 5: Resultados */}
      {step === 5 && (
        <Paper className="paper-step2">
          <Box className="resultados-container">
            <Box className="opt-buttons-container">
              {[
                ['resultados_opt', 'Resultados de la Optimización'],
                ['anuncios_eliminados', 'Anuncios Eliminados'],
                ['redistribucion_presupuestos', 'Redistribución de Presupuestos'],
                ['metricas_generales', 'Métricas Generales']
              ].map(([key, label]) => (
                <button
                  key={key}
                  className={`opt-button ${selectedResultTab === key ? 'selected' : ''}`}
                  onClick={() => setTab(key)}
                >
                  {label}
                </button>
              ))}
            </Box>

            <Box className="opt-content">
              {selectedResultTab === 'resultados_opt' && <Step5Resultados />}
              {selectedResultTab === 'anuncios_eliminados' && <Step5Eliminados />}
              {selectedResultTab === 'redistribucion_presupuestos' && <Step5Redistribuir />}
              {selectedResultTab === 'metricas_generales' && <Step5Metrics />}
            </Box>

            <Box mt={3} textAlign="right">
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={() => navigate('comentarios/dashboard')}
              >
                Volver al Inicio
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}