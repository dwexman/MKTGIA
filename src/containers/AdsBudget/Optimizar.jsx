import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Paper, Button, Typography,
  Tooltip, CircularProgress
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

import { getAccounts } from '../../utils/api';
import './optimizar.css';

const API_BASE = import.meta.env.VITE_API_URL;
const FB_APP_ID = import.meta.env.VITE_FB_APP_ID;

export default function Optimizar() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [campaignTypes, setCampaignTypes] = useState([]);
  const [configStep2, setConfigStep2] = useState(null);
  const [filteredCampaigns, setFiltered] = useState([]);
  const [excludedIds, setExcludedIds] = useState([]);
  const [selectedResultTab, setTab] = useState('resultados_opt');

  const [fbReady, setFbReady] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Si FB ya está cargado
    if (window.FB) {
      setFbReady(true);
      checkLoginStatus();
      return;
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: FB_APP_ID,
        cookie: true,
        xfbml: false,
        version: 'v19.0'
      });
      setFbReady(true);
      checkLoginStatus();
    };

    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      d.getElementsByTagName(s)[0].parentNode.insertBefore(js, d.getElementsByTagName(s)[0]);
    })(document, 'script', 'facebook-jssdk');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*Si ya está logeado, ir directo a Paso 2*/
  const checkLoginStatus = () => {
    if (!window.FB) return;
    window.FB.getLoginStatus(async response => {
      if (response.status !== 'connected') return;

      try {
        setLoading(true);
        const js = await getAccounts(API_BASE, response.authResponse.accessToken);
        if (js.status === 'success') {
          setAccounts(js.accounts || []);
          setCampaignTypes(js.campaign_types || []);
          setStep(2);
        } else {
          console.error('API error:', js);
        }
      } catch (err) {
        console.error('Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    });
  };

  /* abrir diálogo FB y llamar al backend*/
  const handleConnectFacebook = useCallback(() => {
    if (!window.FB) return;
    setLoading(true);
    // 1) ¿Ya está conectado?
    window.FB.getLoginStatus(async statusRes => {
      if (statusRes.status === 'connected') {
        // Ya tenemos token, vamos directo al backend
        try {
          const js = await getAccounts(API_BASE, statusRes.authResponse.accessToken);
          if (js.status === 'success') {
            setAccounts(js.accounts || []);
            setCampaignTypes(js.campaign_types || []);
            setStep(2);
          } else {
            console.error('API error:', js);
          }
        } catch (err) {
          console.error('Fetch error:', err.message);
        } finally {
          setLoading(false);
        }
        return;
      }
      // Si no hay sesión ⇒ abrimos diálogo FB.login
      window.FB.login(async loginRes => {
        if (loginRes.status !== 'connected') {
          setLoading(false);
          return;
        }
        try {
          const js = await getAccounts(API_BASE, loginRes.authResponse.accessToken);
          if (js.status === 'success') {
            setAccounts(js.accounts || []);
            setCampaignTypes(js.campaign_types || []);
            setStep(2);
          } else {
            console.error('API error:', js);
          }
        } catch (err) {
          console.error('Fetch error:', err.message);
        } finally {
          setLoading(false);
        }
      }, { scope: 'business_management,ads_management' });
    });
  }, []);

  const handleContinueStep2 = cfg => { setConfigStep2(cfg); setStep(3); };

  /* Paso 3 */
  const handleOptimizeCampaigns = (excluded, campaigns) => {
    setExcludedIds(excluded);
    setFiltered(campaigns.filter(c => !excluded.includes(c.id)));
    setStep(configStep2?.variable === 'ROI Ingreso Manual (Retorno de Inversión)' ? 4 : 5);
  };

  /* Paso 4 */
  const handleSubmitRoi = () => setStep(5);

  /* Helpers */
  const backTo1 = () => setStep(1);
  const backTo2 = () => setStep(2);
  const backTo3 = () => setStep(3);

  /* Render Paso 1 */
  if (step === 1) {
    return (
      <Box className="optimizar-container">
        <Paper className="optimizar-paper">
          <Box className="optimizar-header">
            <Typography variant="h3" className="optimizar-title">
              Conecta tu cuenta de<br />Facebook Business
            </Typography>
          </Box>

          <Box className="optimizar-status">
            <Typography variant="h5" className="optimizar-status-text">
              Conecta tu cuenta de Facebook Business<br />
              para comenzar a optimizar tus<br />presupuestos publicitarios.
            </Typography>
          </Box>

          <Box className="buttons-row">
            <Tooltip arrow title="Conecta tu cuenta de Facebook Business para acceder a herramientas avanzadas de optimización">
              <span>
                <Button
                  variant="contained"
                  startIcon={<FacebookIcon />}
                  className="facebook-btn"
                  size="large"
                  disabled={!fbReady || loading}
                  onClick={handleConnectFacebook}
                >
                  {loading
                    ? <CircularProgress size={24} sx={{ color: '#fff' }} />
                    : 'Conectar Facebook Business'}
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Paper>
      </Box>
    );
  }

  /* Paso 2 */
  if (step === 2) return (
    <Box className="optimizar-container">
      <Paper className="paper-step2">
        <SelectAccount
          accounts={accounts}
          campaignTypes={campaignTypes}
          onBack={backTo1}
          onContinue={handleContinueStep2}
        />
      </Paper>
    </Box>
  );

  /* Paso 3 */
  if (step === 3) return (
    <Box className="optimizar-container">
      <Paper className="paper-step2">
        <ExcludeCampaigns
          onBack={backTo2}
          onOptimize={handleOptimizeCampaigns}
        />
      </Paper>
    </Box>
  );

  /* Paso 4 */
  if (step === 4) return (
    <Box className="optimizar-container">
      <Paper className="paper-step2">
        <RoiInput
          campaigns={filteredCampaigns}
          onBack={backTo3}
          onSubmit={handleSubmitRoi}
        />
      </Paper>
    </Box>
  );

  /* Paso 5 */
  if (step === 5) return (
    <Box className="optimizar-container">
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
    </Box>
  );

  return null;
}
