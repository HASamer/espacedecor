"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { useFilter } from "@/contexts/FilterContext";
import { getCategories, getPriceRange } from "@/data/products";

export default function SideBar() {
  const { isOpen, closeSidebar } = useSidebar();
  const { 
    selectedCategory, 
    setSelectedCategory, 
    priceRange, 
    setPriceRange 
  } = useFilter();
  
  const categories = getCategories();
  const { min: minPrice, max: maxPrice } = getPriceRange();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 opacity-65 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-screen flex-col justify-between border-e border-gray-100 bg-white">
          <div className="px-4 py-6">
            {/* Close button */}
            <div className="flex justify-between items-center mb-6 border-b pb-3 border-blue-900 -mx-4 px-4">
              <span className="grid h-10 w-32 place-content-center rounded-lg text-xl">
                <div >
              <h1 className="text-center text-blue-900 font-bold ">
                EspaceDecor
              </h1>
            </div>
              </span>
              <button
                onClick={closeSidebar}
                className="p-2 hover:bg-gray-100 text-blue-900 hover:text-red-500 border hover:border-red-500 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Filters */}
            <div className="space-y-6">
              {/* Categories Filter */}
              <div>
                <h3 className="text-md font-medium text-blue-950 mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-md font-medium text-blue-950 mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label htmlFor="minPrice" className="block text-xs text-gray-500 mb-1">Min Price</label>
                      <input
                        id="minPrice"
                        name="minPrice"
                        type="number"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, parseInt(e.target.value) || minPrice)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="maxPrice" className="block text-xs text-gray-500 mb-1">Max Price</label>
                      <input
                        id="maxPrice"
                        name="maxPrice"
                        type="number"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, parseInt(e.target.value) || maxPrice)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  {/* Price Range Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                      className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                      className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs mt-8 text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setPriceRange([minPrice, maxPrice]);
                }}
                className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/** 
          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <a
              href="#"
              className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
            >
              <img
                alt=""
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="size-10 rounded-full object-cover"
              />

              <div>
                <p className="text-xs">
                  <strong className="block font-medium">Eric Frusciante</strong>

                  <span> eric@frusciante.com </span>
                </p>
              </div>
            </a>
          </div>
          */}
        </div>
      </div>
    </>
  );
}
