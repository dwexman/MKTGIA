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
  