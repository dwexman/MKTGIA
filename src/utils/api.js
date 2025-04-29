export async function getAccounts(apiBase, accessToken) {
    // GET con token en query-string
    const url = `${apiBase}/presupuestos/select-account/API/` +
                `?fb_access_token=${encodeURIComponent(accessToken)}`;
  
    const res  = await fetch(url, { method: 'GET', credentials: 'include' });
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
  }

  export async function getCampaignsToExclude(apiBase, params) {
    const url = new URL(`${apiBase}/presupuestos/select-campaigns-to-exclude/API/`);
    
    // Asegurarse de que los nombres de parámetros coincidan exactamente con el backend
    const backendParams = {
      account_id: params.account_id,
      start_date: params.start_date,
      end_date: params.end_date,
      campaign_type: params.campaign_type,
      optimize_variable: params.optimize_variable,
      whether_or_not_to_eliminate_the_least_profitable_10_percent: params.whether_or_not_to_eliminate_the_least_profitable_10_percent,
      fb_access_token: params.fb_access_token
    };
  
    // Agregar parámetros a la URL
    Object.entries(backendParams).forEach(([k, v]) => {
      if (v !== null && v !== undefined && v !== '') {
        url.searchParams.append(k, v);
      }
    });
  
    const res = await fetch(url, { 
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });
  
    const text = await res.text();
  
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}\n${text}`);
    }
  
    if (!res.headers.get('content-type')?.includes('application/json')) {
      throw new Error(`Respuesta no-JSON:\n${text}`);
    }
  
    return JSON.parse(text);
  }
  