export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="font-medium text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.price} DA</p>
      <button className="w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition">
        Ajouter
      </button>
    </div>
  );
}
