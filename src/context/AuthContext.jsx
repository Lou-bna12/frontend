
import React, { createContext, useState, useContext, useEffect } from 'react';

// Export séparé pour éviter les problèmes HMR
export const AuthContext = createContext({});

// Hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Essayer plusieurs clés pour la compatibilité
    const keys = ['user', 'marketplace_user', 'auth_user'];
    for (const key of keys) {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          console.log(`📱 Utilisateur chargé depuis ${key}:`, parsed);
          return parsed;
        } catch (e) {
          localStorage.removeItem(key);
        }
      }
    }
    return null;
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chargement initial
    setLoading(false);
    
    // Écouter les changements de localStorage (autres onglets)
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'marketplace_user') {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulation API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Détection du rôle
      let role = 'customer';
      let id = Date.now();
      
      if (email === 'admin@marketplace.dz') {
        role = 'admin';
        id = 1;
      } else if (email.includes('shop') || email.includes('vendeur')) {
        role = 'shop';
      }
      
      const userData = {
        id,
        email,
        full_name: email.split('@')[0],
        role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`,
        created_at: new Date().toISOString()
      };
      
      setUser(userData);
      
      // Sauvegarder dans toutes les clés pour compatibilité
      ['user', 'marketplace_user'].forEach(key => {
        localStorage.setItem(key, JSON.stringify(userData));
      });
      
      console.log('✅ Connexion réussie:', userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('❌ Erreur connexion:', error);
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const register = async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newUser = {
        id: Date.now(),
        email: userData.email,
        full_name: userData.full_name,
        role: userData.role || 'customer',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.full_name)}&background=random`,
        created_at: new Date().toISOString()
      };
      
      setUser(newUser);
      ['user', 'marketplace_user'].forEach(key => {
        localStorage.setItem(key, JSON.stringify(newUser));
      });
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Erreur d\'inscription' };
    }
  };

  const logout = () => {
    console.log('🔓 Déconnexion');
    setUser(null);
    // Nettoyer toutes les clés possibles
    ['user', 'marketplace_user', 'auth_user', 'token'].forEach(key => {
      localStorage.removeItem(key);
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isShop: user?.role === 'shop',
    isAdmin: user?.role === 'admin',
    isCustomer: user?.role === 'customer' || !user?.role,
    refreshUser: () => {
      const saved = localStorage.getItem('user') || localStorage.getItem('marketplace_user');
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch {
          logout();
        }
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export par défaut pour HMR
export default AuthProvider;