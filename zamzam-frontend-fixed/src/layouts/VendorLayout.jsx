import VendorSidebar from "../components/VendorSidebar";
import VendorHeader from "../components/VendorHeader";

export default function VendorLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* SIDEBAR */}
      <VendorSidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <VendorHeader />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
