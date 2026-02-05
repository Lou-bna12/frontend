import StoresSection from "../components/home/StoresSection";
import ProductsSection from "../components/home/ProductsSection";
import DeliverySection from "../components/home/DeliverySection";
import TrustSection from "../components/home/TrustSection";


export default function Home({ activeTab }) {
  return (
    <div key={activeTab} className="animate-fadeInUp">
  {activeTab === "stores" && <StoresSection />}
  {activeTab === "products" && <ProductsSection />}
  {activeTab === "delivery" && <DeliverySection />}

  <TrustSection />
</div>
  );
}

