import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Votre panier est vide</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Votre panier</h1>

      {cartItems.map((item) => (
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

          {/* 🔥 Compteur quantité */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="px-3 py-1 border rounded-lg"
            >
              −
            </button>

            <span className="font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="px-3 py-1 border rounded-lg"
            >
              +
            </button>
          </div>

          {/* Supprimer */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 text-sm"
          >
            Supprimer
          </button>
        </div>
      ))}

      {/* Total */}
      <div className="mt-8 text-right">
        <h2 className="text-lg font-bold">
          Total : {totalPrice} DA
        </h2>
      </div>
    </div>
  );
}
