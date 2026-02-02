import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useCart } from "../context/CartContext";

export default function VendorCharts() {
  const { orders } = useCart();

  // 🧠 Préparer les données par date
  const dataMap = {};

  orders.forEach((order) => {
    const date = order.date.split(" ")[0]; // ex: 12/09/2025

    if (!dataMap[date]) {
      dataMap[date] = {
        date,
        commandes: 0,
        revenu: 0,
      };
    }

    dataMap[date].commandes += 1;
    dataMap[date].revenu += order.total;
  });

  const data = Object.values(dataMap);

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm text-gray-500">
        Aucune donnée à afficher pour le moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      
      {/* 📦 COMMANDES */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-4">
          Commandes par jour
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="commandes" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 💰 REVENUS */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-4">
          Revenu estimé par jour
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenu"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
