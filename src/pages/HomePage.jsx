import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/Product/ProductCard';
import Spinner from '../components/UI/Spinner';

const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['tous', 'légumes', 'fruits', 'produits laitiers', 'boulangerie']);
  const [selectedCategory, setSelectedCategory] = useState('tous');

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(
        selectedCategory === 'tous' ? null : selectedCategory
      );
      setProductList(data.products || []);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SUPPRIME CETTE LIGNE : <Header /> */}
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
           ZamZam
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Achetez directement auprès des producteurs algériens.
            Produits frais, prix justes, livraison rapide.
          </p>
        </div>

        {/* Le reste du code reste identique... */}

        {/* Catégories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Catégories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Produits */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">
              {selectedCategory === 'tous' ? 'Tous les produits' : selectedCategory}
            </h2>
            <span className="text-gray-500">
              {productList.length} produits
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">{error}</div>
              <button
                onClick={loadProducts}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Réessayer
              </button>
            </div>
          ) : productList.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Aucun produit disponible pour le moment
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productList.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => console.log('Ajouter au panier:', product.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Stats */}
        <div className="mt-16 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Pourquoi choisir Marketplace Alger ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Produits algériens</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
              <div className="text-gray-600">Livraison rapide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">0 DA</div>
              <div className="text-gray-600">Frais de commission</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">Marketplace Alger © 2026 -- Loubna Sellam</p>
          <p className="text-gray-400">
            Connectant producteurs et consommateurs pour une économie locale forte
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;