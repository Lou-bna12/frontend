import { useState } from "react";
import { categories, products } from "../data/courses.mock";
import CategoriesBar from "../components/courses/CategoriesBar";
import ProductCard from "../components/courses/ProductCard";

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Courses</h1>

      <CategoriesBar
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
