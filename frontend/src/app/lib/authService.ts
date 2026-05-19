const API_URL = 'http://localhost:5000';

export const authService = {
  async signup(email: string, password: string, username: string) {
    const res = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password, username})
    });
    return res.json();
  },

  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });
    const data = await res.json();
    if (data.token) localStorage.setItem('token', data.token);
    return data;
  },

  async request(path: string, method: string, body?: object) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? {'Authorization': `Bearer ${token}`} : {})
      },
      ...(body ? {body: JSON.stringify(body)} : {})
    });
    return res.json();
  },

  async logout() {
  const token = localStorage.getItem('token');
  if (token) {
    await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
  localStorage.removeItem('token');
}
};