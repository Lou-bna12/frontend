import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getShopProducts, createShopProduct } from '../services/api'; // CHANGÉ ICI
import Header from '../components/Layout/Header';
import Spinner from '../components/UI/Spinner';

const ShopDashboard = () => {
  const { user, isShop } = useAuth();
  const [shopProducts, setShopProducts] = useState([]);
  const [shopOrders, setShopOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'general'
  });

  useEffect(() => {
    if (isShop && user) {
      loadShopData();
    }
  }, [isShop, user]);

  const loadShopData = async () => {
    try {
      setLoading(true);
      
      // Charger les produits du shop - CHANGÉ ICI
      const productsData = await getShopProducts(user.email);
      setShopProducts(productsData.products || []);
      
      // Pour l'instant, commandes simulées
      setShopOrders([
        { id: 1, product_name: 'Tomates', quantity: 2, total_price: 361, status: 'pending', customer_phone: '+213123456789' },
        { id: 2, product_name: 'Pommes', quantity: 1, total_price: 250, status: 'delivered', customer_phone: '+213987654321' },
      ]);
      
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
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

      // CHANGÉ ICI
      await createShopProduct(productData, user.email);
      alert('Produit créé avec succès!');
      setNewProduct({ name: '', description: '', price: '', stock: '', category: 'general' });
      loadShopData(); // Recharger les produits
    } catch (error) {
      alert('Erreur création produit: ' + error.message);
    }
  };

  if (!isShop) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-red-600 text-xl mb-4">Accès non autorisé</div>
          <p>Cette page est réservée aux fournisseurs.</p>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard Fournisseur
          </h1>
          <p className="text-gray-600">
            Bienvenue, {user?.full_name}. Gérez vos produits et commandes ici.
          </p>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-green-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{shopProducts.length}</div>
                <div className="text-gray-600">Produits actifs</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{shopOrders.length}</div>
                <div className="text-gray-600">Commandes totales</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">
                  {shopOrders.reduce((sum, order) => sum + order.total_price, 0).toFixed(2)} DA
                </div>
                <div className="text-gray-600">Chiffre d'affaires</div>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-2">
            {['products', 'orders', 'add-product'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-white border-t border-l border-r border-gray-300 text-green-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab === 'products' && 'Mes Produits'}
                {tab === 'orders' && 'Commandes'}
                {tab === 'add-product' && 'Ajouter Produit'}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Onglet Produits */}
          {activeTab === 'products' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Mes Produits</h2>
              {shopProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📦</div>
                  <p>Aucun produit pour le moment</p>
                  <button
                    onClick={() => setActiveTab('add-product')}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Ajouter mon premier produit
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
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
                            <div className="font-medium text-gray-900">{product.name}</div>
                            {product.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {product.description}
                              </div>
                            )}
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
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                Modifier
                              </button>
                              <button className="text-red-600 hover:text-red-800 text-sm">
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
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Commandes Récentes</h2>
              {shopOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📝</div>
                  <p>Aucune commande pour le moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {shopOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">{order.product_name}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            <span className="mr-4">Quantité: {order.quantity}</span>
                            <span>Total: {order.total_price.toFixed(2)} DA</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Client: {order.customer_phone}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status === 'delivered' ? 'Livrée' : 
                             order.status === 'pending' ? 'En attente' : order.status}
                          </span>
                          <div className="mt-2 space-x-2">
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                              Détails
                            </button>
                            {order.status === 'pending' && (
                              <button className="text-sm text-green-600 hover:text-green-800">
                                Marquer comme livrée
                              </button>
                            )}
                          </div>
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
            <div>
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