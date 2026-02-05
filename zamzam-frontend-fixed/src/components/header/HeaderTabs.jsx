import StoreIcon from "./icons/StoreIcon";
import ProductIcon from "./icons/ProductIcon";
import DeliveryIcon from "./icons/DeliveryIcon";

const tabs = [
  { id: "stores", label: "Magasins", Icon: StoreIcon },
  { id: "products", label: "Produits", Icon: ProductIcon },
  { id: "delivery", label: "Livraison", Icon: DeliveryIcon },
];

export default function HeaderTabs({ activeTab, onChange }) {
  return (
    <div className="flex justify-center gap-10 mt-4">
      {tabs.map(({ id, label, Icon }) => {
        const active = activeTab === id;

        return (
          <button
  key={id}
  onClick={() => onChange(id)}
  className={`
    flex flex-col items-center gap-1 px-4 py-2 rounded-xl
    transition-all duration-200
    ${
      active
        ? "bg-white shadow-md scale-105"
        : "bg-gray-50 hover:shadow-lg hover:-translate-y-1"
    }
  `}
>
  <Icon
    className={`w-7 h-7 ${
      id === "stores"
        ? "text-green-600"
        : id === "products"
        ? "text-orange-500"
        : "text-blue-500"
    }`}
  />
  <span className="text-sm font-medium text-gray-700">
    {label}
  </span>
</button>
        );
      })}
    </div>
  );
} 