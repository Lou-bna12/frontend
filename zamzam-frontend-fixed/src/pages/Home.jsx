import { Link } from "react-router-dom";

export default function Home() {

  const services = [
    { label: "Courses", path: "/courses" },
    { label: "Restaurants", path: "/restaurants" },
    { label: "Auto & services", path: "/auto" },
    { label: "Fournisseurs", path: "/fournisseurs" },
  ];

  return (
    <div className="space-y-16">

      {/* HERO */}
      <section className="bg-white rounded-2xl p-10 shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Tout ce dont vous avez besoin,
            <span className="text-emerald-600"> livré chez vous</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Commandez auprès de vos commerces, restaurants et fournisseurs locaux.
          </p>

          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Rechercher un produit, un magasin, un restaurant…"
              className="w-full max-w-xl px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Nos services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {item.label}
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                Découvrez les meilleures offres près de chez vous
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* OFFRES */}
      <section className="bg-emerald-50 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Offres du moment
        </h2>
        <p className="text-gray-600">
          Profitez des meilleures promotions proposées par nos partenaires.
        </p>
      </section>

    </div>
  );
}
