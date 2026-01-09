const API_URL = "http://localhost:8000";

// Fonctions de base uniquement
export const getProducts = async (category) => {
  const url = category ? `${API_URL}/products?category=${category}` : `${API_URL}/products`;
  const response = await fetch(url);
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

export const getShopProducts = async (ownerEmail) => {
  const response = await fetch(`${API_URL}/shop/products?owner_email=${ownerEmail}`);
  return response.json();
};

export const createShopProduct = async (productData, ownerEmail) => {
  const response = await fetch(`${API_URL}/shop/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...productData, owner_email: ownerEmail })
  });
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Pour la compatibilité
export const products = {
  getAll: getProducts,
  getById: getProductById,
  getShopProducts: getShopProducts,
  createShopProduct: createShopProduct,
};

export default {
  getProducts,
  getProductById,
  getShopProducts,
  createShopProduct,
  login,
  register,
  products
};
