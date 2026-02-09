import StoresSection from "../components/home/StoresSection";
import ProductsSection from "../components/home/ProductsSection";
import DeliverySection from "../components/home/DeliverySection";
import TrustSection from "../components/home/TrustSection";

export default function Home({ activeTab }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Barre de recherche sous le Header */}
      <div className="mb-10 flex justify-center">
        <div className="w-full max-w-3xl flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-3 shadow-sm hover:shadow-md transition">
          <input
            type="text"
            placeholder="Rechercher un produit, un magasin ou une ville"
            className="flex-1 outline-none text-sm"
          />
          <button className="bg-green-600 text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-green-700 transition">
            🔍 Rechercher
          </button>
        </div>
      </div>

      <div key={activeTab} className="animate-fadeInUp">
        {activeTab === "stores" && <StoresSection />}
        {activeTab === "products" && <ProductsSection />}
        {activeTab === "delivery" && <DeliverySection />}

        <TrustSection />
      </div>
    </main>
  );
}