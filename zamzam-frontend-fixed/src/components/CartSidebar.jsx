import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, increaseQty, decreaseQty, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
        
        {/* HEADER FIXE */}
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Mon panier</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* CONTENU SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Votre panier est vide
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.price} DA
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 bg-green-600 text-white rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER FIXE */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t">
            <div className="flex justify-between font-bold mb-4">
              <span>Total :</span>
              <span>{totalPrice} DA</span>
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Passer au paiement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
