import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const stores = [
  {
    id: 1,
    name: "Marché du Centre",
    city: "Alger",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
  {
    id: 2,
    name: "Saveurs d’Algérie",
    city: "Oran",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  },
  {
    id: 3,
    name: "Maison & Confort",
    city: "Blida",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1",
  },
  {
    id: 4,
    name: "Tech & Plus",
    city: "Constantine",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",

  },
];

export default function StoresSection() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-6">
        Magasins populaires
      </h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
      >
        {stores.map((store) => (
          <SwiperSlide key={store.id}>
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-sm
                         transition-all duration-300
                         hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={store.image}
                alt={store.name}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-gray-800">
                    {store.name}
                  </h3>
                  <span className="text-sm text-gray-600">
                    ⭐ {store.rating}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  📍 {store.city}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
