import { useState } from "react";
import HeaderTabs from "./HeaderTabs";
import SearchBar from "./SearchBar";

export default function Header() {
  const [activeTab, setActiveTab] = useState("stores");

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold text-green-700">
          ZamZam
        </div>

        {/* Search */}
        <SearchBar />

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium hover:underline">
            Devenir partenaire
          </button>
          <button className="p-2 rounded-full border hover:shadow">
            ☰
          </button>
        </div>
      </div>

      {/* Tabs */}
      <HeaderTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </header>
  );
}
