import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // ➕ Ajouter au panier (gère les quantités)
  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ➖ Diminuer quantité
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 🗑️ Supprimer produit
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧹 Vider panier
  const clearCart = () => {
    setCart([]);
  };

  // 📦 Créer une commande
  const createOrder = (customer) => {
    const total = cart.reduce((sum, item) => {
      const price = parseInt(item.price);
      return sum + price * item.quantity;
    }, 0);

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      customer,
      items: cart,
      total,
      status: "En attente",
    };

    setOrders((prev) => [...prev, newOrder]);
    clearCart();
  };

  // 🚚 Mettre à jour le statut (côté fournisseur)
  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        createOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
