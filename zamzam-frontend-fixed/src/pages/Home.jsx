import StoresSection from "../components/home/StoresSection";
import ProductsSection from "../components/home/ProductsSection";
import DeliverySection from "../components/home/DeliverySection";
import TrustSection from "../components/home/TrustSection";
import SearchBar from "../components/header/SearchBar";

export default function Home({ activeTab }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      
      {/* Barre de recherche contextuelle */}
      <div className="mb-10 flex justify-center">
        <div className="w-full max-w-3xl">
          <SearchBar activeTab={activeTab} />
        </div>
      </div>

      {activeTab === "stores" && <StoresSection />}
      {activeTab === "products" && <ProductsSection />}
      {activeTab === "delivery" && <DeliverySection />}

      <TrustSection />
    </main>
  );
}
