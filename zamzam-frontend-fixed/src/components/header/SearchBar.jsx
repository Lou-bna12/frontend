import { useState } from "react";
import { Link } from "react-router-dom";
import { mockStores } from "../../data/mockStores";
import { mockProducts } from "../../data/mockProducts";

export default function SearchBar({ activeTab }) {
  const [query, setQuery] = useState("");

  const lowerQuery = query.toLowerCase();

  const results =
    activeTab === "stores"
      ? mockStores.filter(
          (store) =>
            store.name.toLowerCase().includes(lowerQuery) ||
            store.description.toLowerCase().includes(lowerQuery) ||
            store.city.toLowerCase().includes(lowerQuery)
        )
      : activeTab === "products"
      ? mockProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery)
        )
      : [];

  return (
    <div className="w-full">
      {/* Champ de recherche */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={
          activeTab === "stores"
            ? "Rechercher un magasin..."
            : activeTab === "products"
            ? "Rechercher un produit..."
            : "Rechercher..."
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Résultats */}
      {query && (
        <div className="mt-4 space-y-2">
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                key={item.id}
                to={
                  activeTab === "stores"
                    ? `/stores/${item.id}`
                    : `/products/${item.id}`
                }
                className="block p-4 border rounded-lg bg-white hover:bg-gray-50 transition"
              >
                <h3 className="font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Aucun résultat trouvé.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
