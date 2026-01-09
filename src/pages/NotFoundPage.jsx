import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page non trouvée</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="space-x-4">
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
          <Link to="/products" className="btn-secondary">
            Voir les produits
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;