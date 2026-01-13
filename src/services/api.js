
const API_URL = "http://localhost:8000";

// Helper function
const fetchAPI = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ===== FONCTIONS EXPORTÉES =====

// AUTH
export const login = (email, password) => 
  fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const register = (userData) => 
  fetchAPI('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const getMe = (email) => 
  fetchAPI(`/me?email=${email}`);

// PRODUCTS
export const getProducts = (category) => 
  fetchAPI(category ? `/products?category=${category}` : '/products');

export const getProductById = (id) => 
  fetchAPI(`/products/${id}`);

export const getShopProducts = (ownerEmail) => 
  fetchAPI(`/shop/products?owner_email=${ownerEmail}`);

export const createShopProduct = (productData, ownerEmail) => 
  fetchAPI('/shop/products', {
    method: 'POST',
    body: JSON.stringify({ ...productData, owner_email: ownerEmail }),
  });

// ORDERS
export const createOrder = (orderData) => 
  fetchAPI('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });

export const getOrdersByPhone = (phone) => 
  fetchAPI(`/orders/${phone}`);

export const getOrdersByEmail = (email) => 
  fetchAPI(`/orders/user/${email}`);

export const getShopOrders = (ownerEmail) => 
  fetchAPI(`/orders/shop/${ownerEmail}`);

export const updateOrderStatus = (orderId, status) => 
  fetchAPI(`/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

// NOTIFICATIONS
// Test l'API REST
fetch('http://localhost:8000/api/notifications/1')
  .then(r => r.json())
  .then(data => console.log('📋 Notifications:', data));

// Envoie une notification test
fetch('http://localhost:8000/api/notifications/test/1', { method: 'POST' })
  .then(r => r.json())
  .then(data => console.log('🎯 Notification test:', data));
export const getUserNotifications = (userId) => 
  fetchAPI(`/api/notifications/${userId}`);

export const createNotification = (notificationData) => 
  fetchAPI('/api/notifications', {
    method: 'POST',
    body: JSON.stringify(notificationData),
  });

export const markNotificationAsRead = (notificationId) => 
  fetchAPI(`/api/notifications/${notificationId}/read`, {
    method: 'PUT',
  });

export const markAllNotificationsAsRead = (userId) => 
  fetchAPI(`/api/notifications/user/${userId}/read-all`, {
    method: 'PUT',
  });

export const deleteNotification = (notificationId) => 
  fetchAPI(`/api/notifications/${notificationId}`, {
    method: 'DELETE',
  });

export const testNotification = (userId) => 
  fetchAPI(`/api/notifications/test/${userId}`, {
    method: 'POST',
  });

// ADMIN
export const getAllUsers = () => 
  fetchAPI('/admin/users');

export const getStats = () => 
  fetchAPI('/admin/stats');

// UTILS
export const testConnection = () => fetchAPI('/');
export const healthCheck = () => fetchAPI('/health');

// ===== OBJET API POUR L'EXPORT NOMÉ =====
export const api = {
  // Auth
  login,
  register,
  getMe,
  
  // Products
  getProducts,
  getProductById,
  getShopProducts,
  createShopProduct,
  
  // Orders
  createOrder,
  getOrdersByPhone,
  getOrdersByEmail,
  getShopOrders,
  updateOrderStatus,
  
  // Notifications
  getUserNotifications,
  createNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  testNotification,
  
  // Admin
  getAllUsers,
  getStats,
  
  // Utils
  testConnection,
  healthCheck,
};

// Export par défaut aussi pour compatibilité
export default api;