const API_URL = "http://localhost:8000";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erreur de connexion');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erreur d\'inscription');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const getMe = async (email) => {
  try {
    const response = await fetch(`${API_URL}/me?email=${email}`);
    
    if (!response.ok) {
      throw new Error('Erreur récupération utilisateur');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get me error:', error);
    throw error;
  }
};
