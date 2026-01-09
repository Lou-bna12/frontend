import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Charger le panier depuis localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('marketplace_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        localStorage.removeItem('marketplace_cart');
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage
  useEffect(() => {
    localStorage.setItem('marketplace_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculer le nombre total d'articles
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Calculer le sous-total
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculer les frais de livraison
  const getShipping = () => {
    const subtotal = getSubtotal();
    return subtotal > 5000 ? 0 : 500; // Livraison gratuite > 5000 DA
  };

  // Calculer le total
  const getTotal = () => {
    return getSubtotal() + getShipping();
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    // Propriétés calculées
    cartCount: getCartCount(), // <-- IMPORTANT pour le header
    getCartCount, // <-- Fonction aussi
    getSubtotal,
    getShipping,
    getTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};