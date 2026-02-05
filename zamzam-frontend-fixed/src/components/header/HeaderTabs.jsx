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
            className={`flex flex-col items-center gap-1 transition
              ${
                active
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-400 hover:text-gray-700"
              }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
