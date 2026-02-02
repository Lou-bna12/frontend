import { ShoppingCart, User, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-emerald-600">
            ZamZam
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 mx-6 hidden md:flex">
          <div className="relative w-full max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un produit, un magasin ou un restaurant"
              className="w-full pl-11 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-600">
            <User size={18} />
            <span className="hidden sm:block">Connexion</span>
          </button>

          <button className="relative">
            <ShoppingCart size={20} className="text-gray-700 hover:text-emerald-600" />
            <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
