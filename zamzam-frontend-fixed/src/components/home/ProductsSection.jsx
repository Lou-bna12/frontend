import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const products = [
  {
  id: 1,
  name: "Huile d’olive extra vierge",
  price: "1 200 DA",
  image: "/images/huile-olive.jpg",
},

  {
    id: 2,
    name: "Cafetière italienne",
    price: "3 500 DA",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
  },
  {
  id: 3,
  name: "Casque Bluetooth",
  price: "8 900 DA",
  image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
},

  {
    id: 4,
    name: "Sac à dos urbain",
    price: "4 200 DA",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProductsSection() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-6">
        Produits populaires
      </h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={1.4}
        breakpoints={{
          640: { slidesPerView: 2.4 },
          1024: { slidesPerView: 4.2 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-sm
                         transition-all duration-300
                         hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-green-600 font-semibold">
                  {product.price}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-8 text-center">
  <button
    className="inline-flex items-center gap-2 px-6 py-3 rounded-full
               bg-green-600 text-white font-medium
               transition hover:bg-green-700 hover:shadow-lg"
  >
    Voir tous les produits →
  </button>
</div>

    </section>
    
  );
}
