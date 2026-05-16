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

  logout() {
    localStorage.removeItem('token');
  }
};