import StoresSection from "../components/home/StoresSection";
import DeliverySection from "../components/home/DeliverySection";
import TrustSection from "../components/home/TrustSection";

export default function Home({ activeTab }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div key={activeTab} className="animate-fadeInUp">
        {activeTab === "stores" && <StoresSection />}
        {activeTab === "delivery" && <DeliverySection />}

        <TrustSection />
      </div>
    </main>
  );
}
