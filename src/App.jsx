import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage'; 
import ShopDashboard from './pages/ShopDashboard';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch('http://localhost:8000/');
        if (response.ok) {
          setApiStatus('connected');
        } else {
          setApiStatus('disconnected');
        }
      } catch {
        setApiStatus('disconnected');
      }
    };
    
    checkApi();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            {apiStatus === 'disconnected' && (
              <div className="bg-yellow-500 text-white text-center py-2 px-4">
                ⚠️ Backend non connecté - Mode démo
              </div>
            )}
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/dashboard" element={<ShopDashboard />} />
              <Route path="*" element={<HomePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;