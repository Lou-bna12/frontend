import { useCart } from "../context/CartContext";
import { orderStatusStyles } from "../utils/orderStatus";

export default function VendorOrdersTable() {
  const { orders, updateOrderStatus } = useCart();

  if (orders.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm text-gray-500">
        Aucune commande pour le moment.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left px-6 py-4">Commande</th>
            <th className="text-left px-6 py-4">Client</th>
            <th className="text-left px-6 py-4">Date</th>
            <th className="text-left px-6 py-4">Total</th>
            <th className="text-left px-6 py-4">Statut</th>
            <th className="text-left px-6 py-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium">
                #{order.id}
              </td>

              <td className="px-6 py-4">
                {order.customer.name}
              </td>

              <td className="px-6 py-4 text-gray-500">
                {order.date}
              </td>

              <td className="px-6 py-4 font-semibold text-emerald-600">
                {order.total} DA
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                    ${orderStatusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </td>

              <td className="px-6 py-4">
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option>En attente</option>
                  <option>En préparation</option>
                  <option>En livraison</option>
                  <option>Livrée</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
