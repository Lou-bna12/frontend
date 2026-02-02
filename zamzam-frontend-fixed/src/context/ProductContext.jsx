import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Pommes",
      price: 150,
      stock: 50,
      status: "Actif",
    },
    {
      id: 2,
      name: "Viande rouge",
      price: 2200,
      stock: 20,
      status: "Actif",
    },
  ]);

  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      { ...product, id: Date.now(), status: "Actif" },
    ]);
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
