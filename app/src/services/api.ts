const API_BASE = '';

export const post = async <T = any>(path: string, data: any): Promise<T> => {
  const response = await fetch(`${API_BASE}/api/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
};

export const get = async <T = any>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE}/api/${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
};