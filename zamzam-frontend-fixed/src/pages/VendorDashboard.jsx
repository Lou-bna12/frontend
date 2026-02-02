import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { orderStatusStyles } from "../utils/orderStatus";

export default function VendorDashboard() {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useCart();

  // 🔐 Protection fournisseur
  if (!user || user.role !== "fournisseur") {
    return <Navigate to="/connexion" />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Tableau de bord fournisseur
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">
          Aucune commande pour le moment.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">
                  Commande #{order.id}
                </span>
                <span className="text-sm text-gray-500">
                  {order.date}
                </span>
              </div>

              {/* Client */}
              <p className="text-sm mb-4">
                Client : <strong>{order.customer.name}</strong>
              </p>

              {/* ✅ BADGE STATUT */}
              <span
                className={`inline-block mb-2 text-sm px-3 py-1 rounded-full font-medium
                  ${orderStatusStyles[order.status] || "bg-gray-100 text-gray-700"}`}
              >
                {order.status}
              </span>

              {/* 🔽 SELECT STATUT */}
              <div className="mb-4">
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.id, e.target.value)
                  }
                  className="border rounded px-3 py-2 w-full sm:w-auto"
                >
                  <option>En attente</option>
                  <option>En préparation</option>
                  <option>En livraison</option>
                  <option>Livrée</option>
                </select>
              </div>

              {/* Produits */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      {parseInt(item.price) * item.quantity} DA
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 text-right font-bold text-emerald-600">
                Total : {order.total} DA
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
