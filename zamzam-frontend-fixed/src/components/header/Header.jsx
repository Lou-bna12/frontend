import { Link } from "react-router-dom";
import { useState } from "react";
import HeaderTabs from "./HeaderTabs";
import logo from "../../assets/logo.png";
import { 
  Menu, X, Search, User, Store, Package, Truck, 
  ChefHat, ShoppingBag, Coffee, Home, Car 
} from "lucide-react";

export default function Header({ activeTab, onChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPartnerDropdownOpen, setIsPartnerDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Utilise les composants directement, pas dans un objet
  const PartnerStoreIcon = Store;
  const PartnerShoppingBagIcon = ShoppingBag;
  const PartnerPackageIcon = Package;
  const PartnerChefHatIcon = ChefHat;
  const PartnerCoffeeIcon = Coffee;
  const PartnerHomeIcon = Home;
  const PartnerCarIcon = Car;
  const PartnerTruckIcon = Truck;

  const partnerCategories = [
    { Icon: PartnerStoreIcon, label: "Superette / Épicerie", desc: "Alimentation quotidienne" },
    { Icon: PartnerShoppingBagIcon, label: "Magasin de vêtements", desc: "Mode et accessoires" },
    { Icon: PartnerPackageIcon, label: "Magasin électronique", desc: "High-tech et gadgets" },
    { Icon: PartnerChefHatIcon, label: "Restaurant / Café", desc: "Restauration et boissons" },
    { Icon: PartnerCoffeeIcon, label: "Boulangerie / Pâtisserie", desc: "Pain et douceurs" },
    { Icon: PartnerHomeIcon, label: "Maison & Décoration", desc: "Décoration intérieure" },
    { Icon: PartnerCarIcon, label: "Auto & Moto", desc: "Pièces et accessoires" },
    { Icon: PartnerTruckIcon, label: "Service de livraison", desc: "Logistique et transport" },
  ];

  // Version simplifiée pour les icônes de profil
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
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Menu hamburger + Logo */}
          <div className="flex items-center gap-4">
            {/* Menu hamburger pour profil */}
            <button
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Logo */}
             <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={() => onChange("stores")}
        >
          <img 
            src={logo} 
            alt="ZamZam Logo" 
            className="h-24 w-24 object-contain"
          />
         
        </Link>
          </div>

          {/* Barre de recherche - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher un produit, magasin ou ville"
                  className="w-full outline-none text-sm px-2"
                />
              </div>
              
              <div className="h-6 w-px bg-gray-300 mx-2"></div>
              
              <button className="flex items-center gap-2 bg-green-600 text-white rounded-full px-5 py-2 hover:bg-green-700 transition">
                <Search className="w-4 h-4" />
                <span className="font-medium text-sm">Rechercher</span>
              </button>
            </div>
          </div>

          {/* Devenir partenaire + Connexion */}
          <div className="flex items-center gap-4">
            {/* Devenir partenaire - Desktop avec dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsPartnerDropdownOpen(!isPartnerDropdownOpen)}
                className="text-sm font-medium text-gray-700 hover:text-green-600 px-4 py-2 rounded-full hover:bg-gray-100 transition flex items-center gap-2"
              >
                Devenir partenaire
                <span className={`transition-transform ${isPartnerDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Dropdown Devenir partenaire */}
              {isPartnerDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border p-4 z-50">
                  <h3 className="font-bold text-gray-900 mb-3">Choisissez votre type de commerce</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {partnerCategories.map(({ Icon, label, desc }, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition text-left"
                        onClick={() => {
                          setIsPartnerDropdownOpen(false);
                          // Redirection vers formulaire
                        }}
                      >
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{label}</div>
                          <div className="text-sm text-gray-500">{desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                      S'inscrire comme partenaire
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bouton mobile pour partenaire */}
            <button className="md:hidden text-sm font-medium text-gray-700 hover:text-green-600 px-3 py-2">
              Partenaire
            </button>

            {/* Bouton Connexion/Profil */}
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:shadow-md transition"
            >
              <Menu className="w-5 h-5 text-gray-600" />
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Barre de recherche - Mobile */}
        <div className="lg:hidden mt-4">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-3 shadow-sm">
            <input
              type="text"
              placeholder="Rechercher..."
              className="flex-1 outline-none text-sm"
            />
            <button className="ml-2 p-2 bg-green-600 text-white rounded-full">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu Profil */}
      {isProfileMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsProfileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl animate-slideIn">
            <div className="p-6">
              {/* En-tête */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Mon Compte</h2>
                <button
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Section Connexion */}
              <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Connectez-vous</div>
                    <div className="text-sm text-gray-500">Accédez à votre compte</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
                    Se connecter
                  </button>
                  <button className="py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                    S'inscrire
                  </button>
                </div>
              </div>

              {/* Menu Profil */}
              <div className="space-y-1">
                {profileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium text-gray-700">{item.label}</span>
                    </div>
                    <span>›</span>
                  </button>
                ))}
              </div>

              {/* Section Devenir partenaire */}
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    setIsPartnerDropdownOpen(true);
                  }}
                  className="w-full py-3 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 flex items-center justify-center gap-2"
                >
                  <Store className="w-5 h-5" />
                  Devenir commerçant partenaire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown overlay pour mobile */}
      {isPartnerDropdownOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsPartnerDropdownOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 animate-slideUp">
            <h3 className="font-bold text-xl mb-4">Devenir partenaire</h3>
            <div className="grid grid-cols-2 gap-3">
              {partnerCategories.slice(0, 4).map(({ Icon, label }, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center p-4 border rounded-xl hover:border-green-300"
                >
                  <Icon className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-center">{label}</span>
                </button>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-medium">
              Voir toutes les catégories
            </button>
          </div>
        </div>
      )}

      {/* Onglets */}
      <HeaderTabs activeTab={activeTab} onChange={onChange} />
    </header>
  );
}