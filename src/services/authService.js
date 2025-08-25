import { AUTH_SERVICE_URI } from './api';

export const authService = {
  login: async (credentials) => {
    const response = await fetch(AUTH_SERVICE_URI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }
};
