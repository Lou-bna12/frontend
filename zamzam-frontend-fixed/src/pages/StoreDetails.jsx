import { useParams } from "react-router-dom";
import { mockStores } from "../data/mockStores";

export default function StoreDetails() {
  const { id } = useParams();
  const store = mockStores.find((s) => s.id === Number(id));

  if (!store) {
    return <p className="p-6">Magasin introuvable</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
      <p className="text-gray-600 mb-4">{store.description}</p>
      <p className="text-sm text-gray-500">📍 {store.city}</p>
    </div>
  );
}
