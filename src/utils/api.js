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

/**
 * Paso 5 – GET resultados de la optimización
 * @param {string} apiBase
 * @param {object} qsObject – querystring (account_id, fb_access_token, …)
 */
export async function getOptimizeCampaigns(apiBase, qsObject) {
  const qs  = new URLSearchParams(qsObject).toString();
  const url = `${apiBase}/presupuestos/optimize-campaigns/API/?${qs}`;

  const res  = await fetch(url, { credentials:'include' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.status !== 'success') throw new Error(data.message || 'Error al optimizar');
  return data;          // ← objeto con adsets_to_remove, …, metric_antes, etc.
}

/**
 * POST actualización de presupuestos
 * @param {string} apiBase
 * @param {object} newBudgets { "<adset_id>": <nuevo_presupuesto>, … }
 */
export async function postUpdateBudgets(apiBase, newBudgets) {
  const res = await fetch(`${apiBase}/presupuestos/update-budgets/API/`, {
    method:'POST',
    credentials:'include',
    headers:{ 'Content-Type':'application/json' },
    body:JSON.stringify({ new_budgets:newBudgets })
  });
  const data = await res.json().catch(()=>null);
  if (!res.ok || !data || data.status!=='success')
    throw new Error(data?.message || `HTTP ${res.status}`);
  return data;
}

export async function postCampaignsSelected(apiBase, excludeIds) {
  const body = new URLSearchParams();
  excludeIds.forEach(id => body.append('exclude_campaigns', id));

  const res = await fetch(`${apiBase}/presupuestos/campaigns-selected`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} al guardar exclusiones`);
}

export async function applyBudgetsUpdate(apiBase) {
  const res = await fetch(`${apiBase}/presupuestos/apply-budgets-update`, {
    method: 'POST',
    credentials: 'include',
    redirect: 'manual'        // <- evita que siga al 302
  });

  if (res.type === 'opaqueredirect' || res.status === 302 || res.ok) {
    return { status: 'success' };
  }
  throw new Error(`HTTP ${res.status}`);
}