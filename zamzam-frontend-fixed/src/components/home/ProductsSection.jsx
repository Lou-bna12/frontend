import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProductsSection() {
  const categories = [
    "Toutes les catégories",
    "Offres groupées",
    "Choix",
    "Deal du jour",
    "Auto, moto",
    "Eclairage",
    "Électronique",
    "Alimentation",
  ];

  const dailyOffers = [
    {
      discount: "9.5% de vitroles",
      name: "Élonex windsur et équipements à l’air libre",
      price: "37,99€",
      detail: "Coût d’un seul équipement"
    },
    {
      discount: "20% de cupulser sur un tramway",
      name: "Tramway premium",
      price: "81,93€",
      detail: "À partir de 18 ans"
    },
    {
      discount: "20% de café sautants",
      name: "Café sautants Tout en mâchoire",
      price: "25,99€",
      detail: "À partir de 18 ans"
    },
    {
      discount: "",
      name: "Las frotules de mailles prénommés",
      price: "1,95€",
      detail: "À partir de 18 ans"
    },
    {
      discount: "",
      name: "Musits Foulomares",
      price: "1,357,99€",
      detail: "En cours d'achat"
    },
    {
      discount: "",
      name: "Bistro d'accueil avec un réfrigérateur",
      price: "1,337,99€",
      detail: "En cours d'achat"
    },
  ];

  const recommendedProducts = [
    "Wiskra vindt als agnëzir un",
    "PSJÉ Laminatoufréction",
    "Preond to tatataias plov",
    "à taterait cola/battent",
    "Croaverillga en de amotes",
    "Écroarved, inovocriaur"
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
        {/* Colonne gauche - Offres de jour */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Offres de jour</h2>
          
          {/* Carte Offres groupées */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Offres groupées</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dailyOffers.slice(0, 4).map((offer, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  {offer.discount && (
                    <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {offer.discount}
                    </div>
                  )}
                  <h4 className="font-medium text-gray-800 mb-2">{offer.name}</h4>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold">{offer.price}</span>
                    <span className="text-sm text-gray-500">{offer.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Autres offres */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dailyOffers.slice(4).map((offer, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border hover:border-green-300 transition">
                <h4 className="font-medium text-gray-800 mb-2">{offer.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{offer.price}</span>
                  <span className="text-sm text-gray-500">{offer.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne droite - Vous aimerez aussi */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Vous aimerez aussi</h2>
          <div className="space-y-4">
            {recommendedProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border hover:border-green-300 transition">
                <p className="font-medium text-gray-800 mb-3">{product}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">
                    {index === 5 ? "8 574€" : "9,99€ - 13,98€"}
                  </span>
                  <span className="text-sm text-gray-500">À partir de 18 ans</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}