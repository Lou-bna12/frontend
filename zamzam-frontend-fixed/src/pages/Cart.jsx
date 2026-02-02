import { useState } from "react";
import { useCart } from "../context/CartContext";


const { cart, addToCart, removeFromCart, decreaseQuantity, createOrder } = useCart();


export default function Cart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price);
    return sum + price * item.quantity;
  }, 0);

  const handleOrder = () => {
  if (!name || !phone || !address) {
    alert("Merci de remplir tous les champs");
    return;
  }

  createOrder({
    name,
    phone,
    address,
  });

  setSuccess(true);
};


  if (success) {
    return (
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-emerald-600">
          🎉 Commande confirmée !
        </h1>
        <p className="text-gray-600">
          Merci {name}, votre commande sera livrée prochainement.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Mon panier</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          {/* PRODUITS */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 border rounded"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => addToCart(item)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm ml-4"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-xl font-bold text-emerald-600">
              {total} DA
            </span>
          </div>

          {/* CHECKOUT */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-xl font-semibold">
              Informations de livraison
            </h2>

            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="tel"
              placeholder="Téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <textarea
              placeholder="Adresse de livraison"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <button
              onClick={handleOrder}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
            >
              Confirmer la commande
            </button>
          </div>
        </>
      )}
    </div>
  );
}
