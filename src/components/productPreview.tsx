'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useProductPreview } from '@/contexts/ProductPreviewContext';
import { ITEMS, Item } from '@/data/products';
import ProductCard from './productCard';

export default function ProductPreview() {
  const { selectedProduct, isPreviewOpen, closePreview } = useProductPreview();

  // Get suggested products from the same category (excluding the selected product)
  const suggestedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    
    return ITEMS.filter(item => 
      item.category === selectedProduct.category && 
      item.id !== selectedProduct.id
    ).slice(0, 4); // Limit to 4 suggestions
  }, [selectedProduct]);

  if (!isPreviewOpen || !selectedProduct) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closePreview}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Product details */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product image */}
              <div className="space-y-4">
                <div className="relative">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    width={500}
                    height={500}
                    className="w-full h-96 object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h1>
                  <p className="text-2xl font-semibold text-blue-600">
                    {selectedProduct.price} DT
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Dimensions</p>
                      <p className="font-medium text-gray-900">{selectedProduct.dimension}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6h.008v.008H6V6Z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {selectedProduct.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-4 pt-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Add to Cart
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Add to Wishlist
                  </button>
                </div>

                <div className="pt-4">
                  <a 
                    href={`/product/${selectedProduct.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
                  >
                    View full product details →
                  </a>
                </div>
              </div>
            </div>

            {/* Suggested products */}
            {suggestedProducts.length > 0 && (
              <div className="mt-12 border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  You might also like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {suggestedProducts.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}