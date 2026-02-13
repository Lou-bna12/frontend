export default function CategoriesBar({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition
            ${
              selected === cat
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
