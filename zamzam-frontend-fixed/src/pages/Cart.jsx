import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    decreaseQuantity,
    createOrder,
  } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Votre panier est vide</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Votre panier
      </h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <h2 className="font-medium">{item.name}</h2>
            <p className="text-sm text-gray-500">
              {item.price} DA
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="px-2 py-1 border rounded"
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-sm"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          createOrder({
            name: "Client test",
            phone: "0000000000",
          })
        }
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Valider la commande
      </button>
    </div>
  );
}
