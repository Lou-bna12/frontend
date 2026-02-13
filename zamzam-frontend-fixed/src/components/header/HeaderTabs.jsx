import { useNavigate } from "react-router-dom";
import StoreIcon from "./icons/StoreIcon";
import ProductIcon from "./icons/ProductIcon";
import { Store, Package, ChefHat } from "lucide-react";

const tabs = [
  {
    id: "stores",
    label: "Magasins",
    Icon: StoreIcon,
    MobileIcon: Store,
    color: "green",
    path: "/",              // 👈 accueil magasins
  },
  {
    id: "products",
    label: "Courses",
    Icon: ProductIcon,
    MobileIcon: Package,
    color: "orange",
    path: "/courses",       // 👈 PAGE COURSES
  },
  {
    id: "delivery",
    label: "Restaurants",
    Icon: ChefHat,
    MobileIcon: ChefHat,
    color: "blue",
    path: "/restaurants",   // 👈 PAGE RESTAURANTS
  },
];

const colorClasses = {
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
    gradient: "from-green-500 to-green-300",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
    gradient: "from-orange-500 to-orange-300",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-500 to-blue-300",
  },
};

export default function HeaderTabs({ activeTab, onChange }) {
  const navigate = useNavigate();

  const handleClick = (tab) => {
    onChange(tab.id);       // style actif
    navigate(tab.path);    // navigation réelle
  };

  return (
    <div className="border-t">
      {/* Desktop */}
      <div className="hidden md:flex justify-center gap-8 py-4">
        {tabs.map((tab) => {
          const { id, label, Icon, color } = tab;
          const active = activeTab === id;
          const c = colorClasses[color];

          return (
            <button
              key={id}
              onClick={() => handleClick(tab)}
              className={`flex flex-col items-center gap-2 px-4 py-3 rounded-2xl transition-all
                ${
                  active
                    ? "bg-white shadow-lg scale-105 -translate-y-1"
                    : "bg-gray-50 hover:shadow-md"
                }
              `}
            >
              <div
                className={`p-3 rounded-xl border ${
                  active
                    ? `${c.bg} ${c.border}`
                    : "bg-gray-100 border-gray-200"
                }`}
              >
                <Icon className={`w-6 h-6 ${active ? c.text : "text-gray-400"}`} />
              </div>

              <span className={`text-xs font-semibold ${active ? c.text : "text-gray-500"}`}>
                {label}
              </span>

              {active && (
                <div className={`w-10 h-1 rounded-full bg-gradient-to-r ${c.gradient}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex justify-between px-2 py-3">
        {tabs.map((tab) => {
          const { id, label, MobileIcon, color } = tab;
          const active = activeTab === id;
          const c = colorClasses[color];

          return (
            <button
              key={id}
              onClick={() => handleClick(tab)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl flex-1
                ${active ? `${c.text} ${c.bg}` : "text-gray-500 hover:bg-gray-50"}
              `}
            >
              <MobileIcon className={`w-5 h-5 ${active ? c.text : "text-gray-400"}`} />
              <span className="text-xs font-medium">{label}</span>

              {active && (
                <div className={`w-6 h-1 rounded-full bg-gradient-to-r ${c.gradient}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
