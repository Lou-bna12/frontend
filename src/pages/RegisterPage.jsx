import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    full_name: '',
    role: 'customer'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await register(formData);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Erreur d\'inscription');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
 
      
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="card">
          <div className="card-header">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Inscription
            </h1>
          </div>
          
          <div className="card-body">
            {error && (
              <div className="alert-error mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Nom complet *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  placeholder="Votre nom complet"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="votre@email.com"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Téléphone (optionnel)</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+213 XX XX XX XX"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Mot de passe *</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Type de compte *</label>
                <select
                  className="form-input"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="customer">👤 Client - Acheter des produits</option>
                  <option value="shop">🏪 Fournisseur - Vendre vos produits</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.role === 'shop' 
                    ? 'En tant que fournisseur, vous pourrez créer votre boutique et vendre vos produits.'
                    : 'En tant que client, vous pourrez acheter des produits auprès des fournisseurs.'
                  }
                </p>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Inscription en cours...' : 'S\'inscrire'}
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Déjà un compte ?</p>
                <Link
                  to="/login"
                  className="btn-secondary w-full"
                >
                  Se connecter
                </Link>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  En vous inscrivant, vous acceptez nos conditions d'utilisation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// EXPORT PAR DÉFAUT - IMPORTANT !
export default RegisterPage;
