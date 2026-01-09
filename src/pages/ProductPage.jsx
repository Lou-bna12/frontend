import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api'; // IMPORT CORRECT
import Header from '../components/Layout/Header';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(parseInt(id));
      setProduct(data);
    } catch (err) {
      console.error('Erreur:', err);
      // Données de test
      setProduct({
        id: id,
        name: 'Produit ' + id,
        description: 'Description du produit',
        price: 100 + parseInt(id) * 50,
        category: 'général',
        stock: 20,
        shop_name: 'Boutique test'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
              <div className="text-8xl">🛒</div>
            </div>
          </div>

          {/* Informations */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            
            <div className="text-3xl font-bold text-green-700">
              {product.price?.toFixed(2) || '0.00'} DA
            </div>
            
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
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button className="w-full py-3 px-6 bg-green-600 text-white rounded-lg font-medium text-lg hover:bg-green-700">
              Ajouter au panier
            </button>

            <Link to="/" className="inline-block btn-secondary">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
