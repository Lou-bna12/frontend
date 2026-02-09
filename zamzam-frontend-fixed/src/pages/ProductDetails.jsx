import { useParams } from "react-router-dom";
import { mockProducts } from "../data/mockProducts";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = mockProducts.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return <p className="p-6">Produit introuvable</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">
        {product.name}
      </h1>
      <p className="text-gray-600 mb-4">
        {product.description}
      </p>
      <p className="text-xl font-bold mb-6">
        {product.price} DA
      </p>

      <button
        onClick={() => addToCart(product)}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
