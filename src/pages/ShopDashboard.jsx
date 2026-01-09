import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getShopProducts, createShopProduct } from '../services/api';
import Header from '../components/Layout/Header';
import Spinner from '../components/UI/Spinner';

const ShopDashboard = () => {
  const { user, isShop } = useAuth();
  const [shopProducts, setShopProducts] = useState([]);
  const [shopOrders, setShopOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'general'
  });
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    if (isShop && user) {
      loadShopData();
    }
  }, [isShop, user]);

  const loadShopData = async () => {
    try {
      setLoading(true);
      
      // Charger les produits du shop
      const productsData = await getShopProducts(user.email);
      setShopProducts(productsData.products || []);
      
      // Charger les commandes du shop (à implémenter dans api.js)
      // Pour l'instant, on simule
      const mockOrders = [
        { 
          id: 1, 
          order_number: 'CMD-20240109-123456',
          items: [{ product_name: 'Tomates', quantity: 2, unit_price: 180.5 }],
          total_price: 361,
          status: 'pending', 
          customer_phone: '+213123456789',
          delivery_address: '123 Rue Test, Alger',
          created_at: '2024-01-09T10:00:00Z'
        },
        { 
          id: 2, 
          order_number: 'CMD-20240109-789012',
          items: [{ product_name: 'Pommes', quantity: 1, unit_price: 250 }],
          total_price: 250,
          status: 'delivered', 
          customer_phone: '+213987654321',
          delivery_address: '456 Avenue Test, Oran',
          created_at: '2024-01-08T15:30:00Z'
        },
      ];
      setShopOrders(mockOrders);
      
      // Calculer les statistiques
      calculateStats(productsData.products || [], mockOrders);
      
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (products, orders) => {
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    
    setStats({
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders
    });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        category: newProduct.category
      };

      await createShopProduct(productData, user.email);
      alert('Produit créé avec succès!');
      setNewProduct({ name: '', description: '', price: '', stock: '', category: 'general' });
      loadShopData(); // Recharger les données
    } catch (error) {
      alert('Erreur création produit: ' + error.message);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      // À implémenter avec l'API
      console.log(`Mise à jour commande ${orderId} -> ${newStatus}`);
      alert(`Statut de la commande mis à jour: ${newStatus}`);
      // Recharger les commandes après mise à jour
      loadShopData();
    } catch (error) {
      alert('Erreur mise à jour statut: ' + error.message);
    }
  };

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

  if (!isShop) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-red-600 text-xl mb-4">Accès non autorisé</div>
          <p>Cette page est réservée aux fournisseurs.</p>
          <a href="/register" className="btn-primary mt-4 inline-block">
            Devenir fournisseur
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* En-tête dashboard */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dashboard Fournisseur
              </h1>
              <p className="text-gray-600">
                Bienvenue, {user?.full_name}. Gérez votre boutique ici.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Votre boutique</div>
              <div className="font-bold text-green-700">Boutique de {user?.full_name}</div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-green-600 text-2xl">📦</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalProducts}</div>
                  <div className="text-gray-600 text-sm">Produits actifs</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-2xl">🛒</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalOrders}</div>
                  <div className="text-gray-600 text-sm">Commandes totales</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-purple-600 text-2xl">💰</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalRevenue.toFixed(2)} DA</div>
                  <div className="text-gray-600 text-sm">Chiffre d'affaires</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-orange-600 text-2xl">⏳</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</div>
                  <div className="text-gray-600 text-sm">Commandes en attente</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-2 overflow-x-auto">
            {['overview', 'products', 'orders', 'add-product'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium whitespace-nowrap rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-white border-t border-l border-r border-gray-300 text-green-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab === 'overview' && 'Aperçu'}
                {tab === 'products' && 'Mes Produits'}
                {tab === 'orders' && 'Commandes'}
                {tab === 'add-product' && 'Ajouter Produit'}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Onglet Aperçu */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Commandes récentes */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Commandes Récentes</h2>
                  {shopOrders.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-4">📝</div>
                      <p>Aucune commande pour le moment</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {shopOrders.slice(0, 5).map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-900">{order.order_number}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                {order.items?.length || 0} article(s) • {order.total_price.toFixed(2)} DA
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {new Date(order.created_at).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(order.id, 'processing')}
                                  className="mt-2 text-sm text-green-600 hover:text-green-800"
                                >
                                  Traiter
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {shopOrders.length > 5 && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Voir toutes les commandes →
                      </button>
                    </div>
                  )}
                </div>

                {/* Produits populaires */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Produits en Stock</h2>
                  {shopProducts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-4">📦</div>
                      <p>Aucun produit pour le moment</p>
                      <button
                        onClick={() => setActiveTab('add-product')}
                        className="mt-4 btn-primary"
                      >
                        Ajouter mon premier produit
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {shopProducts.slice(0, 5).map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                {product.price?.toFixed(2)} DA • Stock: {product.stock || 0}
                              </div>
                            </div>
                            <div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                product.stock > 10 ? 'bg-green-100 text-green-800' :
                                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {product.stock > 10 ? 'Bon stock' : product.stock > 0 ? 'Stock faible' : 'Rupture'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {shopProducts.length > 5 && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => setActiveTab('products')}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Voir tous les produits →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Onglet Produits */}
          {activeTab === 'products' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Mes Produits</h2>
                <button
                  onClick={() => setActiveTab('add-product')}
                  className="btn-primary"
                >
                  + Ajouter un produit
                </button>
              </div>
              
              {shopProducts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">📦</div>
                  <p className="mb-4">Aucun produit pour le moment</p>
                  <button
                    onClick={() => setActiveTab('add-product')}
                    className="btn-primary"
                  >
                    Ajouter mon premier produit
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {shopProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-green-600">🛒</span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                {product.description && (
                                  <div className="text-sm text-gray-500 truncate max-w-xs">
                                    {product.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="font-bold text-green-700">
                              {product.price?.toFixed(2)} DA
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.stock > 10 ? 'bg-green-100 text-green-800' :
                              product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.stock || 0} unités
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-gray-600 capitalize">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 hover:bg-blue-50 rounded">
                                Modifier
                              </button>
                              <button className="text-red-600 hover:text-red-800 text-sm px-2 py-1 hover:bg-red-50 rounded">
                                Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Onglet Commandes */}
          {activeTab === 'orders' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-700">Commandes Reçues</h2>
              
              {shopOrders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">📝</div>
                  <p>Aucune commande pour le moment</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {shopOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* En-tête commande */}
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="font-bold text-lg text-gray-800">{order.order_number}</div>
                            <div className="text-sm text-gray-600">
                              Passée le {new Date(order.created_at).toLocaleDateString('fr-FR')} à {new Date(order.created_at).toLocaleTimeString('fr-FR')}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                            <div className="font-bold text-green-700 text-lg">
                              {order.total_price.toFixed(2)} DA
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Corps commande */}
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="font-medium text-gray-700 mb-2">Informations client:</h3>
                            <div className="text-gray-600">
                              <div>Téléphone: {order.customer_phone}</div>
                              <div>Adresse: {order.delivery_address}</div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-700 mb-2">Articles:</h3>
                            <div className="space-y-2">
                              {order.items?.map((item, index) => (
                                <div key={index} className="flex justify-between text-gray-600">
                                  <span>{item.product_name} × {item.quantity}</span>
                                  <span>{(item.unit_price * item.quantity).toFixed(2)} DA</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                          {order.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateOrderStatus(order.id, 'processing')}
                                className="btn-primary"
                              >
                                Accepter la commande
                              </button>
                              <button
                                onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                                className="btn-secondary border-red-600 text-red-600 hover:bg-red-50"
                              >
                                Refuser
                              </button>
                            </>
                          )}
                          {order.status === 'processing' && (
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, 'shipped')}
                              className="btn-primary"
                            >
                              Marquer comme expédiée
                            </button>
                          )}
                          {order.status === 'shipped' && (
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                              className="btn-primary"
                            >
                              Marquer comme livrée
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-800 text-sm">
                            Voir les détails
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Onglet Ajouter Produit */}
          {activeTab === 'add-product' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-700">Ajouter un Nouveau Produit</h2>
              <form onSubmit={handleCreateProduct} className="max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Nom du produit *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Ex: Tomates fraîches"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Catégorie
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="general">Général</option>
                      <option value="légumes">Légumes</option>
                      <option value="fruits">Fruits</option>
                      <option value="produits laitiers">Produits laitiers</option>
                      <option value="boulangerie">Boulangerie</option>
                      <option value="viande">Viande</option>
                      <option value="poisson">Poisson</option>
                      <option value="épicerie">Épicerie</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Décrivez votre produit..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Prix (DA) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Ex: 180.50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Stock initial *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Ex: 50"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('products')}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Publier le produit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShopDashboard;