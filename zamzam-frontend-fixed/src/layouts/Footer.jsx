export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">
            ZamZam
          </h3>
          <p className="text-sm text-gray-400">
            Marketplace algérienne moderne pour acheter, vendre
            et se faire livrer en toute confiance.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-medium mb-3">
            Explorer
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Magasins</li>
            <li className="hover:text-white cursor-pointer">Produits</li>
            <li className="hover:text-white cursor-pointer">Livraison</li>
          </ul>
        </div>

        {/* Partenaires */}
        <div>
          <h4 className="text-white font-medium mb-3">
            Partenaires
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Devenir vendeur</li>
            <li className="hover:text-white cursor-pointer">Devenir livreur</li>
            <li className="hover:text-white cursor-pointer">
  <a href="/about">À propos</a>
</li>

          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-medium mb-3">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li>📧 support@zamzam.dz</li>
            <li>📍 Algérie</li>
          </ul>
        </div>
      </div>

      {/* Bas du footer – centré */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ZamZam — Tous droits réservés
          <br />
          <span>
            Projet conçu et développé par{" "}
            <strong className="text-gray-300">
              Loubna Sellam
            </strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
