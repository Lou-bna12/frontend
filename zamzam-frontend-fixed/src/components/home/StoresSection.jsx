export default function StoresSection() {
  const categories = [
    "Toutes les catégories",
    "Magasins populaires", 
    "Nouveaux partenaires",
    "Proche de vous",
    "Épiceries",
    "Restaurants",
    "Électronique",
    "Mode & Beauté",
  ];

  const stores = [
    {
      name: "Marché du Centre",
      location: "Alger Centre",
      rating: "4.6",
      type: "Épicerie",
      delivery: "Livraison 30min",
      color: "green"
    },
    {
      name: "Saveurs d'Algérie",
      location: "Oran - Sidi El Houari",
      rating: "4.8",
      type: "Restaurant",
      delivery: "Livraison 45min",
      color: "emerald"
    },
    {
      name: "Maison & Confort",
      location: "Blida - Centre ville",
      rating: "4.5",
      type: "Décoration",
      delivery: "Livraison 1h",
      color: "purple"
    },
    {
      name: "Tech & Con",
      location: "Constantine - Didouche Mourad",
      rating: "4.7",
      type: "Électronique",
      delivery: "Livraison 2h",
      color: "blue"
    },
    {
      name: "Mode El Bahia",
      location: "Alger - Bab Ezzouar",
      rating: "4.4",
      type: "Vêtements",
      delivery: "Livraison 24h",
      color: "pink"
    },
    {
      name: "Pharmacie du Centre",
      location: "Alger - 1er Mai",
      rating: "4.9",
      type: "Pharmacie",
      delivery: "Livraison 1h",
      color: "red"
    },
  ];

  const recommendedStores = [
    {
      name: "Boulangerie Dar El Beida",
      detail: "Pain frais et pâtisseries",
      rating: "4.8"
    },
    {
      name: "Superette El Biar",
      detail: "Produits du quotidien",
      rating: "4.3"
    },
    {
      name: "Restaurant Le Gourmet",
      detail: "Cuisine traditionnelle",
      rating: "4.7"
    },
    {
      name: "TechZone Store",
      detail: "High-tech et gadgets",
      rating: "4.6"
    },
    {
      name: "Boutique de Mode",
      detail: "Vêtements tendance",
      rating: "4.4"
    },
    {
      name: "Jardinier Vert",
      detail: "Plantes et accessoires",
      rating: "4.9"
    },
  ];

  return (
    <div className="py-8">
      {/* Titre principal comme sur l'image */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        ZamZam
      </h1>
      <p className="text-gray-600 mb-8">Magasins | Courses | Restaurants</p>

      {/* Catégories horizontales */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`px-5 py-2.5 rounded-full border ${
              index === 0 
                ? "bg-green-600 text-white border-green-600 font-medium" 
                : "bg-white text-gray-700 border-gray-300 hover:border-green-500 font-normal"
            } text-sm`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne gauche - Magasins populaires */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Magasins populaires</h2>
          
          {/* Carte Magasins vedettes */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Magasins vedettes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stores.slice(0, 4).map((store, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{store.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">📍 {store.location}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full bg-${store.color}-500`}></div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="ml-2 font-bold">{store.rating}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-700">{store.type}</span>
                      <p className="text-xs text-gray-500">{store.delivery}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Autres magasins */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stores.slice(4).map((store, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border hover:border-green-300 transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{store.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">📍 {store.location}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full bg-${store.color}-500`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-2 font-bold">{store.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{store.delivery}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne droite - Vous aimerez aussi */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Magasins recommandés</h2>
          <div className="space-y-4">
            {recommendedStores.map((store, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border hover:border-green-300 transition">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-800">{store.name}</h4>
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="ml-1 text-sm font-medium">{store.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{store.detail}</p>
                <button className="w-full py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100">
                  Visiter la boutique
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}