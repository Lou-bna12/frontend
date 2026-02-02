import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function VendorDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const vendors = [
    { id: "1", name: "Boucherie El Baraka", category: "Alimentation", city: "Alger" },
    { id: "2", name: "Restaurant Le Palmier", category: "Restaurant", city: "Oran" },
    { id: "3", name: "Garage Auto Plus", category: "Auto & services", city: "Constantine" },
    { id: "4", name: "Marché du Centre", category: "Courses", city: "Blida" },
  ];

  const products = [
    { id: 1, vendorId: "1", name: "Viande de bœuf", price: "1800 DA" },
    { id: 2, vendorId: "1", name: "Merguez", price: "1200 DA" },
    { id: 3, vendorId: "2", name: "Poulet rôti", price: "1500 DA" },
    { id: 4, vendorId: "2", name: "Pizza maison", price: "900 DA" },
    { id: 5, vendorId: "4", name: "Fruits & légumes", price: "Variable" },
  ];

  const vendor = vendors.find(v => v.id === id);
  const vendorProducts = products.filter(p => p.vendorId === id);

  if (!vendor) {
    return <p>Fournisseur introuvable</p>;
  }

  return (
    <div className="space-y-8">
      <Link to="/fournisseurs" className="text-emerald-600 hover:underline">
        ← Retour aux fournisseurs
      </Link>

      {/* Infos fournisseur */}
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          {vendor.name}
        </h1>
        <p className="text-gray-600 mt-1">
          {vendor.category}
        </p>
        <p className="text-gray-500 mt-2">
          📍 {vendor.city}
        </p>
      </div>

      {/* Produits */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Produits
        </h2>

        {vendorProducts.length === 0 ? (
          <p className="text-gray-500">
            Aucun produit disponible pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {vendorProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
