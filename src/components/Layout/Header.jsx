
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store, Home, Package, Users, Settings } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import NotificationBell from '../UI/NotificationBell';

const Header = () => {
  const { user, logout, isAdmin, isShop } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Store className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold text-gray-800">Marketplace Alger</span>
            </Link>
            
            {/* Menu burger pour mobile */}
            <button className="md:hidden p-2" onClick={() => {}}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Navigation - Responsive */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
              <Home className="w-4 h-4" />
              <span>Accueil</span>
            </Link>
            
            {user && !isAdmin && !isShop && (
              <Link to="/orders" className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
                <Package className="w-4 h-4" />
                <span>Mes Commandes</span>
              </Link>
            )}
            
            {isShop && (
              <Link to="/dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
                <Settings className="w-4 h-4" />
                <span>Dashboard Shop</span>
              </Link>
            )}
            
            {isAdmin && (
              <Link to="/admin" className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
                <Users className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </nav>

          {/* Actions utilisateur - Responsive */}
          <div className="flex items-center space-x-4">
            {/* Panier */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-green-600">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
              <span className="sr-only">Panier</span>
            </Link>

            {/* Notifications */}
            {user && <NotificationBell />}

            {/* Profil utilisateur */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-700">
                    {user.full_name || user.email.split('@')[0]}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isAdmin ? 'bg-purple-100 text-purple-800' :
                    isShop ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {isAdmin ? 'Administrateur' : isShop ? 'Vendeur' : 'Client'}
                  </span>
                </div>
                
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-700 hover:text-green-600 text-sm"
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Menu mobile (simplifié) */}
        <div className="md:hidden mt-4 pt-4 border-t">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-600 hover:text-green-600">
              Accueil
            </Link>
            {user && !isAdmin && !isShop && (
              <Link to="/orders" className="text-gray-600 hover:text-green-600">
                Mes Commandes
              </Link>
            )}
            {isShop && (
              <Link to="/dashboard" className="text-gray-600 hover:text-green-600">
                Dashboard Shop
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-green-600">
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;