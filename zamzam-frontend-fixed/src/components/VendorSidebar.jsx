import { NavLink } from "react-router-dom";

const linkBase =
  "block px-3 py-2 rounded-lg text-sm transition";
const linkInactive =
  "text-slate-300 hover:text-emerald-400 hover:bg-slate-800";
const linkActive =
  "text-white bg-slate-800";

export default function VendorSidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`
        fixed z-40 inset-y-0 left-0 w-64 bg-slate-900 text-white p-6
        transform transition-transform duration-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0
      `}
    >
      {/* LOGO */}
      <div className="text-2xl font-bold text-emerald-400 mb-8">
        ZamZam
      </div>

      {/* MENU */}
      <nav className="space-y-2">
        <NavLink
          to="/dashboard-fournisseur"
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
          onClick={onClose}
        >
          Accueil
        </NavLink>

        <NavLink
          to="/dashboard-fournisseur/produits"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
          onClick={onClose}
        >
          Produits
        </NavLink>

        <NavLink
          to="/dashboard-fournisseur/commandes"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
          onClick={onClose}
        >
          Commandes
        </NavLink>

        <NavLink
          to="/dashboard-fournisseur/parametres"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
          onClick={onClose}
        >
          Paramètres
        </NavLink>
      </nav>
    </aside>
  );
}
