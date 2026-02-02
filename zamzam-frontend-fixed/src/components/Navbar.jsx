import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  return (
    <>
      <header className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-xl font-semibold text-emerald-600">
            ZamZam
          </Link>

          {/* Search desktop */}
          <div className="flex-1 mx-6 hidden md:flex">
            <div className="relative w-full max-w-xl mx-auto">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Rechercher un produit, un magasin ou un restaurant"
                className="w-full pl-11 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/connexion"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-600"
            >
              <User size={18} />
              Connexion
            </Link>

            <Link to="/panier" className="relative">
              <ShoppingCart size={20} className="text-gray-700 hover:text-emerald-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Burger mobile */}
          <button onClick={() => setOpen(true)} className="md:hidden">
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute top-0 right-0 w-72 h-full bg-white p-6">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              <X size={22} />
            </button>

            <nav className="flex flex-col gap-4 mt-10 text-gray-700">
              <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
              <Link to="/courses" onClick={() => setOpen(false)}>Courses</Link>
              <Link to="/restaurants" onClick={() => setOpen(false)}>Restaurants</Link>
              <Link to="/auto" onClick={() => setOpen(false)}>Auto & services</Link>
              <Link to="/fournisseurs" onClick={() => setOpen(false)}>Fournisseurs</Link>

              <hr />

              <Link
                to="/panier"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Panier ({cart.length})
              </Link>

              <Link
                to="/connexion"
                onClick={() => setOpen(false)}
                className="text-emerald-600 font-semibold"
              >
                Connexion
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
