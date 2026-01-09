import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';


const Header = () => {
  const { user, logout, isShop } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MA</span>
              </div>
              <div>
                <div className="font-bold text-xl text-gray-800">Marketplace Alger</div>
                <div className="text-xs text-gray-500">Achetez local 🇩🇿</div>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Accueil
            </Link>
            <Link to="/products" className="nav-link">
              Produits
            </Link>
            {user && isShop && (
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            )}
            <Link to="/about" className="nav-link">
              À propos
            </Link>
          </nav>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Panier */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-green-600">
              <div className="text-2xl">🛒</div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Compte utilisateur */}
            {user ? (
              <div className="flex items-center space-x-3">
                {isShop && (
                  <Link to="/dashboard" className="hidden md:block btn-secondary text-sm">
                    Dashboard
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                    <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-medium">
                      {user.full_name?.charAt(0) || 'U'}
                    </div>
                    <div className="hidden md:block text-sm text-gray-700">
                      {user.full_name}
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        👤 Mon profil
                      </Link>
                     <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        📦 Mes commandes
                    </Link>
                      {isShop && (
                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          🏪 Dashboard shop
                        </Link>
                      )}
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        🚪 Déconnexion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="hidden md:block text-gray-700 hover:text-green-600 font-medium">
                  Connexion
                </Link>
                <Link to="/register" className="btn-primary">
                  Inscription
                </Link>
              </div>
            )}

            {/* Menu mobile */}
            <button className="md:hidden p-2 text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Mobile */}
        <div className="md:hidden border-t border-gray-200 py-3">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="nav-link px-0">
              Accueil
            </Link>
            <Link to="/products" className="nav-link px-0">
              Produits
            </Link>
            {user && isShop && (
              <Link to="/dashboard" className="nav-link px-0">
                Dashboard
              </Link>
            )}
            {!user && (
              <>
                <Link to="/login" className="nav-link px-0">
                  Connexion
                </Link>
                <Link to="/register" className="nav-link px-0">
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;