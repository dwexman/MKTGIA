/* 
 * Funciones de acceso al backend.
 * Todas devuelven un objeto JS ya parseado o lanzan error con `throw`.
 */

const parseIfJson = async (res) => {
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}\n${text}`);
  }

  const isJson = res.headers
    .get('content-type')
    ?.includes('application/json');

  if (!isJson) {
    throw new Error(`Respuesta no-JSON:\n${text}`);
  }
  return JSON.parse(text);
};

/**
 * Paso 1 – GET cuentas publicitarias de Facebook
 * @param {string} apiBase   – p.e. http://localhost:5000
 * @param {string} accessTok – token FB
 */
export async function getAccounts(apiBase, accessTok) {
  const url = `${apiBase}/presupuestos/select-account/API/?fb_access_token=${encodeURIComponent(accessTok)}`;
  const res = await fetch(url, { method: 'GET', credentials: 'include' });
  return parseIfJson(res);
}

/**
 * Paso 2 – POST selección de cuenta + rango fechas + opciones
 * IMPORTANTE ➜ el backend espera datos en `request.form`, por lo
 * que enviamos `application/x-www-form-urlencoded` (URLSearchParams).
 * @param {string} apiBase
 * @param {object} payload  – { account_id, start_date, end_date,
 *                              campaign_type, optimize_variable,
 *                              whether_or_not_to_eliminate_the_least_profitable_10_percent }
 */
export async function postAccountSelected(apiBase, payload) {
  const urlParams = new URLSearchParams();
  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null) urlParams.append(k, v);
  });

  const res = await fetch(`${apiBase}/presupuestos/account-selected`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      // Form-encode – no JSON:
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlParams
  });

  /* El backend responde 302 + HTML.
     Si res.status 2xx o 3xx ⇒ lo tomamos como ok                      */
     if (res.ok || (res.status >= 300 && res.status < 400)) {
      return { status: 'success' };
    }
    // Si llega aquí, realmente sí fue error:
    const text = await res.text();
    throw new Error(`HTTP ${res.status}\n${text}`);
  }

/**
 * Paso 3 – GET campañas para excluir
 * @param {string} apiBase
 * @param {object} qsObject – se pasa tal cual en querystring
 */
export async function getCampaignsToExclude(apiBase, qsObject) {
  const qs  = new URLSearchParams(qsObject).toString();
  const url = `${apiBase}/presupuestos/select-campaigns-to-exclude/API/?${qs}`;

  const res = await fetch(url, {
    method:       'GET',
    credentials:  'include',
    headers:      { Accept: 'application/json' } 
  });

  return parseIfJson(res);  
}

/**
 * Paso 4 – POST ROI manual por ad set
 * @param {string} apiBase
 * @param {object} roiMap { "<adset_id>": <roi>, … }
 */
export async function postInputRoi(apiBase, roiMap) {
  const res = await fetch(`${apiBase}/presupuestos/input-roi/API/`, {
    method:  'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(roiMap)
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data || data.status !== 'success') {
    throw new Error(
      data?.message ||
      `HTTP ${res.status}\nNo se pudo procesar el ROI`
    );
  }
  return data;        // ← retorna {status, message, adsets, redirect_url?}
}
