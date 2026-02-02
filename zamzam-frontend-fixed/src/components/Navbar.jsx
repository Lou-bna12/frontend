import { Link } from "react-router-dom";
import { User, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-emerald-600">
          ZamZam
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">
          
          {/* PANIER */}
          <Link to="/panier" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* UTILISATEUR */}
          {!user ? (
            <>
              <Link
                to="/connexion"
                className="text-gray-600 hover:text-emerald-600 transition"
              >
                Se connecter
              </Link>

              <Link
                to="/inscription"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                S’inscrire
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user.email}
              </span>

              {user.role === "fournisseur" && (
                <Link
                  to="/dashboard-fournisseur"
                  className="text-sm font-medium text-emerald-600"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className="text-sm text-red-500 hover:underline"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
