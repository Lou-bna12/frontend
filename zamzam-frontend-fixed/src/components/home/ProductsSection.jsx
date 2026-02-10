import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { useCart } from "../../context/CartContext";

export default function ProductsSection() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const categories = [
    "Toutes les catégories",
    "Promotions",
    "Meilleures ventes",
    "Nouveautés",
    "Maison & Cuisine",
    "Électronique",
    "Auto & Moto",
    "Alimentation",
  ];

  const dailyOffers = [
    {
      id: 1,
      discount: "-15%",
      name: "Blender multifonction",
      price: 8900,
      detail: "Livraison rapide",
    },
    {
      id: 2,
      discount: "-20%",
      name: "Cafetière électrique",
      price: 12500,
      detail: "Garantie 1 an",
    },
    {
      id: 3,
      discount: "-10%",
      name: "Aspirateur sans sac",
      price: 18200,
      detail: "Haute puissance",
    },
    {
      id: 4,
      discount: "-25%",
      name: "Lot de produits ménagers",
      price: 3600,
      detail: "Pack économique",
    },
    {
      id: 5,
      discount: "",
      name: "Réfrigérateur double porte",
      price: 89000,
      detail: "Économie d’énergie",
    },
    {
      id: 6,
      discount: "",
      name: "Four électrique familial",
      price: 56000,
      detail: "Grande capacité",
    },
  ];

  const recommendedProducts = [
    "Machine à café automatique",
    "Lampe LED rechargeable",
    "Balance de cuisine digitale",
    "Batterie externe 20 000 mAh",
    "Casserole antiadhésive premium",
    "Aspirateur balai sans fil",
  ];

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        ZamZam
      </h1>
      <p className="text-gray-600 mb-8">
        Magasins | Courses | Restaurants
      </p>

      {/* Catégories */}
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
        {/* Colonne gauche */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">
            Offres du jour
          </h2>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              Promotions en cours
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dailyOffers.slice(0, 4).map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >
                  {offer.discount && (
                    <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {offer.discount}
                    </div>
                  )}

                  <h4 className="font-medium text-gray-800 mb-2">
                    {offer.name}
                  </h4>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold">
                      {offer.price} DA
                    </span>

                    <button
                      onClick={() => {
                        addToCart(offer);
                        navigate("/cart");
                      }}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dailyOffers.slice(4).map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-xl p-5 border hover:border-green-300 transition"
              >
                <h4 className="font-medium text-gray-800 mb-2">
                  {offer.name}
                </h4>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    {offer.price} DA
                  </span>

                  <button
                    onClick={() => {
                      addToCart(offer);
                      navigate("/cart");
                    }}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne droite */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Vous aimerez aussi
          </h2>

          <div className="space-y-4">
            {recommendedProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 border hover:border-green-300 transition"
              >
                <p className="font-medium text-gray-800 mb-3">
                  {product}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">
                    Prix variable
                  </span>
                  <span className="text-sm text-gray-500">
                    Disponible
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
