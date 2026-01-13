import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout
import Header from './components/Layout/Header';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage'; 
import ShopDashboard from './pages/ShopDashboard';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import NotificationsPage from './pages/NotificationsPage';
import AdminDashboard from './pages/AdminDashboard';

// Components
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [apiStatus, setApiStatus] = useState('checking');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Vérifier la connexion API
    const checkApi = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('http://localhost:8000/health', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          setApiStatus(data.status === 'healthy' ? 'connected' : 'disconnected');
        } else {
          setApiStatus('disconnected');
        }
      } catch (error) {
        setApiStatus('disconnected');
        console.log('Backend non disponible, mode démo activé');
      }
    };
    
    checkApi();
    
    // Vérifier toutes les minutes
    const apiInterval = setInterval(checkApi, 60000);
    
    // Écouter la connexion réseau
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      clearInterval(apiInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              {/* Alertes système */}
              {!isOnline && (
                <div className="bg-red-500 text-white text-center py-2 px-4">
                  ⚠️ Vous êtes hors ligne
                </div>
              )}
              
              {apiStatus === 'disconnected' && isOnline && (
                <div className="bg-yellow-500 text-white text-center py-2 px-4">
                  ⚠️ Backend non connecté - Mode démo activé
                </div>
              )}
              
              {apiStatus === 'checking' && (
                <div className="bg-blue-500 text-white text-center py-2 px-4">
                  🔄 Connexion au backend...
                </div>
              )}
              
              {/* Header */}
              <Header />
              
              {/* Contenu principal */}
              <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8">
                <Routes>
                  {/* Routes publiques */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  
                  {/* Routes protégées */}
                  <Route path="/checkout" element={
                    <PrivateRoute>
                      <CheckoutPage />
                    </PrivateRoute>
                  } />
                  
                  <Route path="/orders" element={
                    <PrivateRoute>
                      <OrdersPage />
                    </PrivateRoute>
                  } />
                  
                  <Route path="/notifications" element={
                    <PrivateRoute>
                      <NotificationsPage />
                    </PrivateRoute>
                  } />
                  
                  <Route path="/dashboard" element={
                    <PrivateRoute allowedRoles={['shop']}>
                      <ShopDashboard />
                    </PrivateRoute>
                  } />
                  
                  <Route path="/admin" element={
                    <PrivateRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </PrivateRoute>
                  } />
                  
                  {/* Route de secours */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              
              {/* Footer */}
              <footer className="bg-white border-t mt-12">
                <div className="container mx-auto px-4 py-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                      <p className="text-gray-800 font-medium">Marketplace Alger</p>
                      <p className="text-gray-600 text-sm mt-1">
                        La première marketplace algérienne
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        apiStatus === 'connected' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {apiStatus === 'connected' ? '✅ Backend OK' : '⚠️ Mode démo'}
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isOnline 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {isOnline ? '🌐 En ligne' : '❌ Hors ligne'}
                      </div>
                    </div>
                    
                    <div className="text-center md:text-right">
                      <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Marketplace Alger
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Tous droits réservés
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </CartProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;