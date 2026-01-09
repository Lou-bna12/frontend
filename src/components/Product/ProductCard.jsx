import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Veuillez vous connecter pour ajouter au panier');
      return;
    }
    alert(`${quantity} ${product.name} ajouté au panier!`);
    // Ici, tu devrais appeler ton contexte panier
  };

  return (
    <Link to={`/product/${product.id}`} className="card block hover:no-underline">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center rounded-t-xl">
        <div className="text-center">
          <div className="text-6xl mb-2">
            {product.category === 'fruits' ? '🍎' :
             product.category === 'légumes' ? '🥦' :
             product.category === 'produits laitiers' ? '🥛' :
             product.category === 'boulangerie' ? '🥖' : '🛒'}
          </div>
          <div className="text-gray-600 text-sm">Produit Algérien</div>
        </div>
      </div>

      <div className="p-5">
        {/* Catégorie et shop */}
        <div className="flex justify-between items-start mb-3">
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            {product.category || 'général'}
          </span>
          {product.stock > 0 ? (
            <span className="text-xs text-green-700 font-medium">
              {product.stock} en stock
            </span>
          ) : (
            <span className="text-xs text-red-700 font-medium">
              Rupture
            </span>
          )}
        </div>

        {/* Nom et description */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description || 'Produit frais de qualité supérieure'}
        </p>

        {/* Prix */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold text-green-700">
              {product.price?.toFixed(2) || '0.00'} DA
            </span>
            {product.price_per_kg && (
              <div className="text-xs text-gray-500">
                {product.price_per_kg.toFixed(2)} DA/kg
              </div>
            )}
          </div>
          {product.shop_name && (
            <div className="text-xs text-gray-500">
              {product.shop_name}
            </div>
          )}
        </div>

        {/* Bouton Ajouter au panier */}
        <button
          onClick={handleAddToCart}
          disabled={!product.stock || product.stock <= 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            !product.stock || product.stock <= 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {!product.stock || product.stock <= 0 ? 'Rupture de stock' : 'Ajouter au panier'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;