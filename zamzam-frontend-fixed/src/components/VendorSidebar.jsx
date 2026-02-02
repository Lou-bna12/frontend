import { Link } from "react-router-dom";

export default function VendorSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 space-y-8">
      
      {/* LOGO */}
      <div className="text-2xl font-bold text-emerald-400">
        ZamZam
      </div>

      {/* MENU */}
      <nav className="space-y-4 text-sm">
        <Link to="/dashboard-fournisseur" className="block hover:text-emerald-400">
          Accueil
        </Link>
        <Link
  to="/dashboard-fournisseur/produits"
  className="block hover:text-emerald-400"
>
  Produits
</Link>

        <Link to="#" className="block hover:text-emerald-400">
          Commandes
        </Link>
        <Link to="#" className="block hover:text-emerald-400">
          Gagnottes & règlements
        </Link>
        <Link to="#" className="block hover:text-emerald-400">
          Avis & notations
        </Link>
        <Link to="#" className="block hover:text-emerald-400">
          Paramètres
        </Link>
        <Link to="#" className="block hover:text-emerald-400">
          Centre d’aide
        </Link>
      </nav>
    </aside>
  );
}
