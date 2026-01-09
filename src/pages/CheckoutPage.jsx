import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Layout/Header';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, getSubtotal, getShipping, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    delivery_address: '',
    customer_phone: user?.phone || '',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Si pas connecté ou panier vide, rediriger
  if (!user) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Pour l'instant, simulation d'une commande
      // Plus tard, on enverra à l'API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Générer un ID de commande
      const newOrderId = 'CMD-' + Date.now();
      setOrderId(newOrderId);
      
      // Sauvegarder la commande dans localStorage (temporaire)
      const order = {
        id: newOrderId,
        date: new Date().toISOString(),
        items: cartItems,
        total: getTotal(),
        status: 'pending',
        delivery_address: formData.delivery_address,
        customer_phone: formData.customer_phone
      };
      
      // Sauvegarder dans l'historique
      const savedOrders = JSON.parse(localStorage.getItem('marketplace_orders') || '[]');
      savedOrders.push(order);
      localStorage.setItem('marketplace_orders', JSON.stringify(savedOrders));
      
      // Vider le panier
      clearCart();
      
      // Afficher le succès
      setOrderSuccess(true);
      
      // Redirection automatique après 3 secondes
      setTimeout(() => {
        navigate('/orders');
      }, 3000);
      
    } catch (err) {
      setError('Erreur lors de la création de la commande');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Commande confirmée !
            </h1>
            <p className="text-gray-600 mb-6">
              Votre commande <strong>{orderId}</strong> a été enregistrée avec succès.
            </p>
            <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 mb-6">
              <div className="text-lg font-semibold text-green-700 mb-4">
                Détails de votre commande
              </div>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Numéro de commande:</span>
                  <span className="font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-green-700">{getTotal().toFixed(2)} DA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    En attente
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-500 mb-6">
              Vous allez être redirigé vers vos commandes...
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/orders')}
                className="btn-primary"
              >
                Voir mes commandes
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                Continuer mes achats
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Finaliser la commande
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Informations de livraison
              </h2>
              
              {error && (
                <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6 border border-red-200">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse de livraison *
                  </label>
                  <textarea
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={formData.delivery_address}
                    onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
                    placeholder="Numéro, rue, quartier, ville..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                    placeholder="+213 XX XX XX XX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes pour le livreur (optionnel)
                  </label>
                  <textarea
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Code, étage, instructions spéciales..."
                  />
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Mode de paiement
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">💰</div>
                      <div>
                        <div className="font-medium text-green-800">Paiement à la livraison</div>
                        <div className="text-sm text-green-700">
                          Payez en espèces à la réception de votre commande
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/cart')}
                    className="btn-secondary"
                  >
                    ← Retour au panier
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary px-8"
                  >
                    {loading ? 'Traitement...' : 'Confirmer la commande'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Récapitulatif */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Votre commande
              </h2>
              
              <div className="mb-6">
                <div className="font-medium text-gray-700 mb-2">Articles:</div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.quantity} × {item.price.toFixed(2)} DA
                        </div>
                      </div>
                      <div className="font-medium">
                        {(item.price * item.quantity).toFixed(2)} DA
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{getSubtotal().toFixed(2)} DA</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className={getShipping() === 0 ? 'text-green-600' : ''}>
                    {getShipping() === 0 ? 'Gratuite' : `${getShipping().toFixed(2)} DA`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-700">{getTotal().toFixed(2)} DA</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="mb-2">
                  En confirmant, vous acceptez nos conditions générales de vente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;