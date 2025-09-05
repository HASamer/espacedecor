"use client";

import ProductCard from "@/components/productCard";
import SearchBar from "@/components/searchBar";
import { ITEMS } from "@/data/products";
import { useFilter } from "@/contexts/FilterContext";
import { useMemo } from "react";

export default function Home() {
  const { searchQuery, selectedCategory, priceRange } = useFilter();

  // Filter products based on search query, category, and price range
  const filteredProducts = useMemo(() => {
    return ITEMS.filter((item) => {
      // Search filter (name or description)
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        !selectedCategory || item.category === selectedCategory;

      // Price range filter
      const matchesPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <div className="container mx-auto px-4 py-2">
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar />
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.818-6.127-2.186C5.152 11.916 5.002 10.968 5 10c.002-.968.152-1.916.873-2.814C7.533 5.818 9.66 5 12 5s4.467.818 6.127 2.186C18.848 8.084 18.998 9.032 19 10c-.002.968-.152 1.916-.873 2.814A7.962 7.962 0 0112 15z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No products found
          </h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
}
