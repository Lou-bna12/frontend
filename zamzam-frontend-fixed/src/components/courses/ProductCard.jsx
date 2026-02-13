import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
 console.log("addToCart =", addToCart);
  const finalPrice = product.promo
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative">
      
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {product.promo && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            -{product.discount}%
          </span>
        )}

        {!product.stock && (
          <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
            Rupture
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

        <div className="flex items-center justify-between">
          <div>
            {product.promo && (
              <span className="text-gray-400 line-through text-sm mr-2">
                {product.price} DA
              </span>
            )}
            <span className="text-green-600 font-bold text-lg">
              {finalPrice} DA
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={!product.stock}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              product.stock
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
