import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems } = useCart();

  console.log("PANIER ACTUEL :", cartItems);

  return (
    <div className="p-6">
      <h1>Test Panier</h1>
      <pre>{JSON.stringify(cartItems, null, 2)}</pre>
    </div>
  );
}
