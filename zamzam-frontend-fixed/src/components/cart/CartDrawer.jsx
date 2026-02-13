import { useCart } from "../../context/CartContext";
import { X } from "lucide-react";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, totalPrice, addToCart, decreaseQuantity, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl p-6 flex flex-col">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Votre panier</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Panier vide</p>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="border-b pb-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.price} DA x {item.quantity}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 border rounded"
                    >
                      −
                    </button>

                    <button
                      onClick={() => addToCart(item)}
                      className="px-2 border rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm ml-2"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total</span>
                <span>{totalPrice} DA</span>
              </div>

              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Commander
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
