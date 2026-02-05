export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-sm w-[420px]">
      <input
        type="text"
        placeholder="Rechercher un produit, un magasin ou une ville"
        className="flex-1 text-sm outline-none"
      />
      <button className="ml-2 bg-green-600 text-white p-2 rounded-full">
        🔍
      </button>
    </div>
  );
}
