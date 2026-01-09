import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Layout/Header';

const CartPage = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getSubtotal, 
    getShipping, 
    getTotal,
    cartCount 
  } = useCart();
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert('Veuillez vous connecter pour passer commande');
      navigate('/login');
      return;
    }
    
    if (cartCount === 0) {
      alert('Votre panier est vide');
      return;
    }
    
    navigate('/checkout');
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">Ajoutez des produits pour commencer vos achats</p>
            <Link to="/" className="btn-primary">
              Voir les produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mon Panier ({cartCount} article{cartCount > 1 ? 's' : ''})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* En-tête du tableau */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <div className="col-span-6 font-medium text-gray-700">Produit</div>
                <div className="col-span-2 font-medium text-gray-700 text-center">Prix</div>
                <div className="col-span-2 font-medium text-gray-700 text-center">Quantité</div>
                <div className="col-span-2 font-medium text-gray-700 text-center">Total</div>
              </div>
              
              {/* Liste des articles */}
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Image et nom */}
                    <div className="flex items-center md:col-span-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center mr-4">
                        <div className="text-2xl">
                          {item.category === 'fruits' ? '🍎' :
                           item.category === 'légumes' ? '🥦' :
                           item.category === 'produits laitiers' ? '🥛' :
                           item.category === 'boulangerie' ? '🥖' : '🛒'}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm mt-2"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                    
                    {/* Prix unitaire */}
                    <div className="md:col-span-2 text-center">
                      <div className="font-medium text-gray-800">
                        {item.price.toFixed(2)} DA
                      </div>
                    </div>
                    
                    {/* Contrôles quantité */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <div className="w-12 h-10 flex items-center justify-center font-medium">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 text-center">
                      <div className="font-bold text-green-700 text-lg">
                        {(item.price * item.quantity).toFixed(2)} DA
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Actions */}
              <div className="p-6 border-t border-gray-200 flex justify-between">
                <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
                  ← Continuer mes achats
                </Link>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          </div>
          
          {/* Récapitulatif */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Récapitulatif de la commande</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total ({cartCount} article{cartCount > 1 ? 's' : ''})</span>
                  <span>{getSubtotal().toFixed(2)} DA</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className={getShipping() === 0 ? 'text-green-600' : ''}>
                    {getShipping() === 0 ? 'Gratuite' : `${getShipping().toFixed(2)} DA`}
                  </span>
                </div>
                {getShipping() > 0 && (
                  <div className="text-sm text-gray-500">
                    Livraison gratuite à partir de 5000 DA
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-700">{getTotal().toFixed(2)} DA</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    TTC, paiement à la livraison
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full btn-primary py-3 text-lg font-medium mb-4"
              >
                Passer la commande
              </button>
              
              <div className="text-sm text-gray-500 space-y-2">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Paiement à la livraison</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Livraison 24-48h à Alger</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Retour gratuit sous 7 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;