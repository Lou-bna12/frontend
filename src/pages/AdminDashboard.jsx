import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Package, ShoppingBag, DollarSign, 
  BarChart, Settings, Bell, TrendingUp,
  AlertCircle, CheckCircle, XCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/';
      return;
    }
    
    loadStats();
  }, [isAdmin]);

  const loadStats = async () => {
    try {
      // Simuler des stats pour l'instant
      setTimeout(() => {
        setStats({
          totalUsers: 124,
          totalProducts: 567,
          totalOrders: 89,
          totalRevenue: 1254300,
          pendingOrders: 12,
          activeShops: 23,
          lowStockProducts: 8
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Accès non autorisé</h2>
          <p className="text-gray-600 mt-2">Cette page est réservée aux administrateurs</p>
          <Link to="/" className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Admin */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Administrateur</h1>
              <p className="text-gray-600 mt-1">
                Bienvenue, <span className="font-semibold">{user?.full_name || user?.email}</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium">
                Administrateur
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Utilisateurs</p>
                <p className="text-3xl font-bold mt-2">{stats?.totalUsers || 0}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Produits</p>
                <p className="text-3xl font-bold mt-2">{stats?.totalProducts || 0}</p>
              </div>
              <Package className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Commandes</p>
                <p className="text-3xl font-bold mt-2">{stats?.totalOrders || 0}</p>
              </div>
              <ShoppingBag className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Revenus</p>
                <p className="text-3xl font-bold mt-2">{stats?.totalRevenue?.toLocaleString() || 0} DA</p>
              </div>
              <DollarSign className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/admin/users" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="font-medium text-gray-800">Gérer les utilisateurs</h3>
              <p className="text-sm text-gray-600 mt-1">Gérer les comptes clients et vendeurs</p>
            </Link>
            
            <Link to="/admin/products" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Package className="w-6 h-6 text-green-500 mb-2" />
              <h3 className="font-medium text-gray-800">Gérer les produits</h3>
              <p className="text-sm text-gray-600 mt-1">Ajouter/modifier/supprimer des produits</p>
            </Link>
            
            <Link to="/admin/orders" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <ShoppingBag className="w-6 h-6 text-yellow-500 mb-2" />
              <h3 className="font-medium text-gray-800">Gérer les commandes</h3>
              <p className="text-sm text-gray-600 mt-1">Suivre et traiter les commandes</p>
            </Link>
          </div>
        </div>

        {/* Alertes */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Alertes système</h2>
            <Bell className="w-6 h-6 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Système de notifications activé</p>
                <p className="text-sm text-gray-600">Les notifications temps réel fonctionnent correctement</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{stats?.pendingOrders || 0} commandes en attente</p>
                <p className="text-sm text-gray-600">À traiter dans la section commandes</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{stats?.lowStockProducts || 0} produits en rupture</p>
                <p className="text-sm text-gray-600">Nécessite un réapprovisionnement</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;