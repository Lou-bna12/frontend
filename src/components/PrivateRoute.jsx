
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles = [], redirectTo = '/login' }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Pendant le chargement
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mb-4"></div>
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  // Si non authentifié, rediriger vers login
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Si des rôles sont spécifiés mais l'utilisateur n'a pas le bon rôle
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg max-w-md w-full text-center">
          <div className="text-2xl mb-3">⛔</div>
          <h2 className="text-xl font-bold mb-2">Accès non autorisé</h2>
          <p className="mb-4">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            <br />
            <span className="text-sm opacity-75">
              Votre rôle: <strong>{user.role}</strong>
            </span>
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  // Tout est bon, afficher le contenu
  return children;
};

export default PrivateRoute;