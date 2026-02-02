import { useCart } from "../context/CartContext";

export default function Orders() {
  const { orders } = useCart();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Mes commandes
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
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">
                  Commande #{order.id}
                </span>
                <span className="text-sm text-gray-500">
                  {order.date}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
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
