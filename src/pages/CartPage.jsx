import React from 'react';
import Header from '../components/Layout/Header';

const CartPage = () => {
  // Pour l'instant, cart vide
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">Ajoutez des produits pour commencer vos achats</p>
          <a href="/" className="btn-primary">
            Voir les produits
          </a>
        </div>
      </main>
    </div>
  );
};

export default CartPage;