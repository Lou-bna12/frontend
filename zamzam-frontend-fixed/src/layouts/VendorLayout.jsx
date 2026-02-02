import { useState } from "react";
import VendorSidebar from "../components/VendorSidebar";
import VendorHeader from "../components/VendorHeader";

export default function VendorLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <VendorSidebar isOpen={open} onClose={() => setOpen(false)} />

      {/* MAIN */}
      <div className="flex-1 flex flex-col md:ml-64">
        <VendorHeader onMenu={() => setOpen(true)} />

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
