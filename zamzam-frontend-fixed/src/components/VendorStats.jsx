import { ShoppingBag, Wallet, TrendingUp, Clock } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function VendorStats() {
  const { orders } = useCart();

  const totalOrders = orders.length;

  const revenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const averageBasket =
    totalOrders > 0 ? Math.round(revenue / totalOrders) : 0;

  const pendingOrders = orders.filter(
    (order) => order.status !== "Livrée"
  ).length;

  const stats = [
    {
      label: "Commandes",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-blue-600",
    },
    {
      label: "Revenu estimé",
      value: `${revenue} DA`,
      icon: Wallet,
      color: "text-emerald-600",
    },
    {
      label: "Panier moyen",
      value: `${averageBasket} DA`,
      icon: TrendingUp,
      color: "text-yellow-600",
    },
    {
      label: "À traiter",
      value: pendingOrders,
      icon: Clock,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                {stat.label}
              </p>
              <p className="text-2xl font-bold mt-1">
                {stat.value}
              </p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}