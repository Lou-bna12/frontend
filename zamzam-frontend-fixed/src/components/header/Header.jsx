import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import HeaderTabs from "./HeaderTabs";
import logo from "../../assets/logo.png";
import {
  Menu, X, Search, User, Store, Package, Truck,
  ChefHat, ShoppingBag, Coffee, Home, Car
} from "lucide-react";

export default function Header({ activeTab, onChange }) {
  const navigate = useNavigate();

  const [isPartnerDropdownOpen, setIsPartnerDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const partnerCategories = [
    { Icon: Store, label: "Superette / Épicerie" },
    { Icon: ShoppingBag, label: "Magasin de vêtements" },
    { Icon: Package, label: "Magasin électronique" },
    { Icon: ChefHat, label: "Restaurant / Café" },
    { Icon: Coffee, label: "Boulangerie / Pâtisserie" },
    { Icon: Home, label: "Maison & Décoration" },
    { Icon: Car, label: "Auto & Moto" },
    { Icon: Truck, label: "Service de livraison" },
  ];

  const profileMenuItems = [
    { label: "Mes Commandes", icon: "📦" },
    { label: "Mes Favoris", icon: "❤️" },
    { label: "Messages", icon: "💬" },
    { label: "Paiements", icon: "💳" },
    { label: "Coupons & Promos", icon: "🎫" },
    { label: "Paramètres", icon: "⚙️" },
    { label: "Centre d'aide", icon: "❓" },
    { label: "Déconnexion", icon: "🚪" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" onClick={() => onChange("stores")}>
          <img src={logo} alt="ZamZam" className="h-20 w-20" />
        </Link>

        {/* Search desktop */}
        <div className="hidden lg:flex flex-1 mx-10">
          <div className="flex w-full border rounded-full px-4 py-2">
            <input
              placeholder="Rechercher un produit, magasin ou ville"
              className="flex-1 outline-none text-sm"
            />
            <button className="bg-green-600 text-white px-4 rounded-full flex items-center gap-2">
              <Search size={16} /> Rechercher
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          

          <button
            onClick={() => setIsProfileMenuOpen(true)}
            className="flex items-center gap-2 border rounded-full px-4 py-2"
          >
            <Menu size={18} />
            <User size={18} />
          </button>
        </div>
      </div>

      {/* SIDEBAR */}
      {isProfileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsProfileMenuOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col">
            <div className="p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">Mon Compte</h2>
              <button onClick={() => setIsProfileMenuOpen(false)}>
                <X />
              </button>
            </div>

            {/* Login block */}
            <div className="px-6 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="font-medium mb-3">Connectez-vous</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex-1 border rounded-lg py-2"
                  >
                    Se connecter
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="flex-1 bg-green-600 text-white rounded-lg py-2"
                  >
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="flex-1 px-4 space-y-1">
              {profileMenuItems.map((item, i) => (
                <button
                  key={i}
                  className="w-full flex justify-between items-center p-3 rounded-lg hover:bg-gray-50"
                >
                  <span className="flex gap-3">
                    <span>{item.icon}</span>
                    {item.label}
                  </span>
                  ›
                </button>
              ))}
            </div>

            {/* 👇 AJOUT UNIQUE ICI 👇 */}
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate("/register-vendor");
                }}
                className="w-full flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100"
              >
                <Store size={18} />
                Devenir partenaire / fournisseur
              </button>
            </div>
          </div>
        </div>
      )}

      <HeaderTabs activeTab={activeTab} onChange={onChange} />
    </header>
  );
}
