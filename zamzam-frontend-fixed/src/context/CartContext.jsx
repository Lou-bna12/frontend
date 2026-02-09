import { createContext, useContext, useState } from "react";
import { useNotifications } from "./NotificationContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // 🔐 Sécurisation du hook
  const notifications = useNotifications();
  const addNotification = notifications?.addNotification;

  // ➕ Ajouter au panier
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    addNotification?.("🛒 Produit ajouté au panier");
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
    addNotification?.("🗑️ Produit supprimé du panier");
  };

  // 🧹 Vider panier
  const clearCart = () => {
    setCart([]);
  };

  // 📦 Créer commande
  const createOrder = (customer) => {
    const total = cart.reduce((sum, item) => {
      const price = Number(item.price) || 0;
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

    addNotification?.("📦 Nouvelle commande reçue");
  };

  // 🚚 Mise à jour statut
  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );

    addNotification?.(`🚚 Statut de commande mis à jour : ${status}`);
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
