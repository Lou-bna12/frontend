export default function CategoryBar() {
  const categories = [
    "Toutes les catégories",
    "Offres groupées",
    "Deal du jour",
    "Courses",
    "Restaurants",
    "Auto & moto",
    "Maison",
    "Mode",
  ];

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex items-center gap-6 h-12 overflow-x-auto text-sm font-medium text-gray-700">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`whitespace-nowrap cursor-pointer hover:text-emerald-600 ${
                cat === "Offres groupées"
                  ? "text-emerald-600 font-semibold"
                  : ""
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
