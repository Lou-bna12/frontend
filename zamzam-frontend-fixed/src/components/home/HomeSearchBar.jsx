export default function HomeSearchBar() {
  return (
    <div className="mt-6 mb-10 flex justify-center">
      <div className="w-full max-w-3xl flex items-center gap-2 bg-white
                      border rounded-full px-4 py-2 shadow-sm">
        <input
          type="text"
          placeholder="Rechercher un produit, un magasin ou une ville"
          className="flex-1 outline-none text-sm"
        />
        <button
          className="bg-green-600 text-white rounded-full px-5 py-2
                     text-sm font-medium hover:bg-green-700 transition"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
}
