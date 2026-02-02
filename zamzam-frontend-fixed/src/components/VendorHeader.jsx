import { Search, Bell, User } from "lucide-react";

export default function VendorHeader() {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      
      {/* TITRE */}
      <h1 className="text-xl font-semibold">
        Accueil
      </h1>

      {/* ACTIONS */}
      <div className="flex items-center gap-4">
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-9 pr-3 py-2 border rounded-lg text-sm"
          />
        </div>

        <Bell className="w-5 h-5 text-gray-500" />
        <User className="w-5 h-5 text-gray-500" />
      </div>
    </header>
  );
}
