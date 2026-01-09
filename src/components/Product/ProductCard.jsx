import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Empêche la navigation vers la page produit
    e.stopPropagation(); // Empêche la propagation de l'événement
    
    if (!user) {
      alert('Veuillez vous connecter pour ajouter au panier');
      return;
    }
    
    addToCart(product, quantity);
    alert(`${quantity} ${product.name} ajouté au panier !`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Lien vers la page produit */}
      <Link to={`/product/${product.id}`} className="block">
        {/* Image placeholder */}
        <div className="h-48 bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-2">
              {product.category === 'fruits' ? '🍎' :
               product.category === 'légumes' ? '🥦' :
               product.category === 'produits laitiers' ? '🥛' :
               product.category === 'boulangerie' ? '🥖' : '🛒'}
            </div>
            <div className="text-gray-600 text-sm">Produit Algérien</div>
          </div>
        </div>

        <div className="p-4">
          {/* Catégorie */}
          <div className="mb-2">
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {product.category || 'général'}
            </span>
            {product.shop_name && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-2">
                {product.shop_name}
              </span>
            )}
          </div>

          {/* Nom et description */}
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description || 'Produit frais de qualité'}
          </p>

          {/* Prix et stock */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-2xl font-bold text-green-700">
                {product.price?.toFixed(2) || '0.00'} DA
              </span>
            </div>
            <div className={`text-sm px-2 py-1 rounded ${
              product.stock > 10 ? 'bg-green-100 text-green-800' : 
              product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {product.stock || 0} en stock
            </div>
          </div>
        </div>
      </Link>

      {/* Bouton Ajouter au panier (EN DEHORS du Link) */}
      <div className="p-4 pt-0">
        <div className="flex items-center mb-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700 rounded-l"
            disabled={quantity <= 1}
          >
            -
          </button>
          <div className="w-12 h-8 flex items-center justify-center bg-gray-50 border-y">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700 rounded-r"
          >
            +
          </button>
          <div className="ml-2 text-sm text-gray-500">
            unité{quantity > 1 ? 's' : ''}
          </div>
        </div>

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
    </div>
  );
};

export default ProductCard;