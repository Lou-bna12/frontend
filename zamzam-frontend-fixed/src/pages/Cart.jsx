import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Mon panier
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">
          Votre panier est vide.
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {item.price}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 hover:underline text-sm"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
