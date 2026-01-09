// src/services/api.js
const API_URL = "http://localhost:8000";

export const api = {
  // Test connexion API
  test: async () => {
    try {
      const response = await fetch(`${API_URL}/`);
      return await response.json();
    } catch (error) {
      throw new Error('API non disponible');
    }
  },

  // Inscription
  register: async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  // Connexion
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  // Récupérer info utilisateur
  getMe: async (email) => {
    const response = await fetch(`${API_URL}/me?email=${email}`);
    return response.json();
  },

  // Produits
  getProducts: async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },

  // Produits par catégorie
  getProductsByCategory: async (category) => {
    const response = await fetch(`${API_URL}/products?category=${category}`);
    return response.json();
  },

  // Produits d'un shop
  getShopProducts: async (ownerEmail) => {
    const response = await fetch(`${API_URL}/shop/products?owner_email=${ownerEmail}`);
    return response.json();
  },

  // Créer produit (shop)
  createShopProduct: async (productData, ownerEmail) => {
    const response = await fetch(`${API_URL}/shop/products?owner_email=${ownerEmail}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return response.json();
  },

  // Commandes
  createOrder: async (orderData) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return response.json();
  }
};