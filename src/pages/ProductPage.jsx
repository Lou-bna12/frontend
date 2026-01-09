import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Header from '../components/Layout/Header';

const ProductPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(parseInt(id));
      setProduct(data);
      setError('');
    } catch (err) {
      setError('Produit non trouvé');
      console.error('Erreur:', err);
      // Données de test en cas d'erreur
      setProduct({
        id: id,
        name: 'Produit ' + id,
        description: 'Description du produit',
        price: 100 + parseInt(id) * 50,
        stock: 20,
        category: 'légumes',
        shop_name: 'Boutique test'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      alert('Veuillez vous connecter pour ajouter au panier');
      return;
    }
    
    if (!product) return;
    
    addToCart(product, quantity);
    alert(`${quantity} ${product.name} ajouté au panier !`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-green-600">Accueil</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image et galerie */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-8xl">
                {product.category === 'fruits' ? '🍎' :
                 product.category === 'légumes' ? '🥦' :
                 product.category === 'produits laitiers' ? '🥛' :
                 product.category === 'boulangerie' ? '🥖' : '🛒'}
              </div>
            </div>
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.description || 'Produit de qualité supérieure, frais et local.'}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-green-700">
                {product.price?.toFixed(2)} DA
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 10 ? 'bg-green-100 text-green-800' :
                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {product.stock || 0} en stock
              </div>
            </div>

            {/* Sélection quantité */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Quantité</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <div className="w-16 h-12 flex items-center justify-center font-medium text-lg">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="text-gray-500">
                  unité{quantity > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.stock || product.stock <= 0}
                className={`flex-1 py-3 px-6 rounded-lg font-medium text-lg transition-colors ${
                  !product.stock || product.stock <= 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {!product.stock || product.stock <= 0 ? 'Rupture de stock' : 'Ajouter au panier'}
              </button>
              <Link 
                to="/cart" 
                className="py-3 px-6 border-2 border-green-600 text-green-600 rounded-lg font-medium text-lg hover:bg-green-50 text-center"
              >
                Voir le panier
              </Link>
            </div>

            {/* Infos livraison */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-green-600 text-xl">🚚</div>
                <div>
                  <div className="font-medium text-green-800 mb-1">Livraison rapide</div>
                  <div className="text-green-700 text-sm">
                    Livré en 24-48h à Alger • Paiement à la livraison • Retour gratuit sous 7 jours
                  </div>
                </div>
              </div>
            </div>

            {/* Retour */}
            <div>
              <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;