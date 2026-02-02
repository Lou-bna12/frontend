
import { Link } from "react-router-dom";

export default function Vendors() {
  const vendors = [
    {
      id: 1,
      name: "Boucherie El Baraka",
      category: "Alimentation",
      city: "Alger",
    },
    {
      id: 2,
      name: "Restaurant Le Palmier",
      category: "Restaurant",
      city: "Oran",
    },
    {
      id: 3,
      name: "Garage Auto Plus",
      category: "Auto & services",
      city: "Constantine",
    },
    {
      id: 4,
      name: "Marché du Centre",
      category: "Courses",
      city: "Blida",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Titre */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Nos fournisseurs
        </h1>
        <p className="text-gray-600 mt-2">
          Découvrez les commerçants et partenaires disponibles sur ZamZam.
        </p>
      </div>

      {/* Grille fournisseurs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <Link
            key={vendor.id}
            to={`/fournisseurs/${vendor.id}`}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition block"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {vendor.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {vendor.category}
            </p>

            <p className="text-sm text-gray-400 mt-2">
              📍 {vendor.city}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
