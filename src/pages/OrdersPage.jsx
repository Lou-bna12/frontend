import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Layout/Header';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les commandes depuis localStorage
    const loadOrders = () => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('marketplace_orders') || '[]');
        // Filtrer par utilisateur si on a un système d'ID utilisateur
        setOrders(savedOrders.reverse()); // Plus récent en premier
      } catch (err) {
        console.error('Erreur chargement commandes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Si pas connecté
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-red-600 text-xl mb-4">Accès non autorisé</div>
          <p>Veuillez vous connecter pour voir vos commandes.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Livrée';
      case 'shipped': return 'Expédiée';
      case 'processing': return 'En traitement';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mes commandes</h1>
          <Link to="/" className="btn-secondary">
            Continuer mes achats
          </Link>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Aucune commande
            </h2>
            <p className="text-gray-600 mb-8">
              Vous n'avez pas encore passé de commande.
            </p>
            <Link to="/" className="btn-primary">
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* En-tête de commande */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="font-bold text-lg text-gray-800">
                        Commande {order.id}
                      </div>
                      <div className="text-sm text-gray-600">
                        Passée le {new Date(order.date).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <div className="font-bold text-green-700 text-lg">
                        {order.total?.toFixed(2) || '0.00'} DA
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Détails de la commande */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-700 mb-3">Articles:</h3>
                    <div className="space-y-3">
                      {order.items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center mr-3">
                              <div className="text-lg">🛒</div>
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">
                                {item.quantity} × {item.price?.toFixed(2) || '0.00'} DA
                              </div>
                            </div>
                          </div>
                          <div className="font-medium">
                            {(item.price * item.quantity).toFixed(2)} DA
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Adresse de livraison:</h3>
                      <p className="text-gray-600">{order.delivery_address}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Contact:</h3>
                      <p className="text-gray-600">{order.customer_phone}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                    <button className="btn-secondary">
                      Voir les détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;