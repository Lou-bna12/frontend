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
        <h2 className="text-2xl font-bold">Votre panier est vide</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mon Panier</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.price} DA</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>

            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 text-right text-xl font-bold">
        Total : {totalPrice} DA
      </div>
    </div>
  );
}
