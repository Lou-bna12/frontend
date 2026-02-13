import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded-xl">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-lg mb-3" />

      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="font-bold mt-2">{product.price} DA</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
