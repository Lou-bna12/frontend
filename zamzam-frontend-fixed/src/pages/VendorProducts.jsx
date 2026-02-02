import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import VendorLayout from "../layouts/VendorLayout";

export default function VendorProducts() {
  const { products, addProduct, removeProduct } = useProducts();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleAdd = () => {
    if (!name || !price || !stock) return;

    addProduct({
      name,
      price: parseInt(price),
      stock: parseInt(stock),
    });

    setName("");
    setPrice("");
    setStock("");
  };

  return (
    <VendorLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Mes produits</h1>

        {/* AJOUT */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="font-semibold">Ajouter un produit</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Nom du produit"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Prix (DA)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          <button
            onClick={handleAdd}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Ajouter
          </button>
        </div>

        {/* LISTE */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Produit</th>
                <th className="px-6 py-3 text-left">Prix</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Statut</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-6 py-3">{p.name}</td>
                  <td className="px-6 py-3">{p.price} DA</td>
                  <td className="px-6 py-3">{p.stock}</td>
                  <td className="px-6 py-3">{p.status}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => removeProduct(p.id)}
                      className="text-red-500 text-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </VendorLayout>
  );
}
