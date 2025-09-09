"use client";

import { use, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ITEMS } from "@/data/products";
import ProductCard from "@/components/productCard";
import { useCart } from "@/contexts/CartContext";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  // Find the current product
  const product = ITEMS.find((item) => item.id === id);

  // Get suggested products from the same category (excluding the current product)
  const suggestedProducts = useMemo(() => {
    if (!product) return [];

    return ITEMS.filter(
      (item) => item.category === product.category && item.id !== product.id
    ).slice(0, 4); // Limit to 4 suggestions
  }, [product]);

  // Handle responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerSlide(3); // Large screens: 3 items
      } else if (width >= 768) {
        setItemsPerSlide(2); // Medium screens: 2 items
      } else {
        setItemsPerSlide(1); // Small screens: 1 item
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total slides based on items per slide
  const totalSlides = Math.ceil(suggestedProducts.length / itemsPerSlide);

  // Auto-slide effect for suggested products
  useEffect(() => {
    if (suggestedProducts.length === 0 || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [suggestedProducts.length, totalSlides]);

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      // Optional: Show a success message or reset quantity
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product does not exist.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-900 border border-blue-900 font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-semibold text-green-700 mb-6">
              {product.price} DT
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-blue-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Dimensions</p>
                <p className="font-semibold text-gray-900">
                  {product.dimension}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-blue-900"
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
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <span className="inline-block bg-blue-100 border border-blue-900 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div>
            <div className="grid grid-cols-3 gap-4">
              <div className=" col-span-2 bg-white text-blue-900 py-1 rounded-lg transition-colors font-semibold text-lg hover:bg-white hover:text-blue-900 border border-blue-900">
                <div>
                  <label htmlFor="Quantity" className="sr-only">
                    {" "}
                    Quantity{" "}
                  </label>

                  <div className="flex items-center justify-center rounded-lg">
                    <button
                      type="button"
                      onClick={handleQuantityDecrease}
                      className="mx-auto text-gray-600 transition hover:opacity-75 disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>

                    <input
                      type="number"
                      id="Quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      className="h-10 w-18 border-transparent text-center text-xl [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />

                    <button
                      type="button"
                      onClick={handleQuantityIncrease}
                      className="mx-auto text-gray-600 transition hover:opacity-75"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleAddToCart}
                className=" bg-blue-900 text-white py-1 px-8 rounded-lg transition-colors font-semibold text-lg hover:bg-white hover:text-blue-900 border border-blue-900"
              >
                Add
              </button>
            </div>
          </div>

          {/* Additional product features */}
          <div className="border-t border-blue-950 pt-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Product Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                MDF materials
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Handcrafted with care
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Perfect for gifting
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Easy to maintain
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Suggested products */}
      {suggestedProducts.length > 0 && (
        <div className="border-t border-blue-950 pt-12">
          <h2 className="text-3xl font-bold text-blue-950 mb-8 text-center">
            You might also like
          </h2>
          <div className="relative">
            {/* Slider container */}
            <div 
              className="flex transition-transform duration-1500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)` }}
            >
              {suggestedProducts.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`flex-shrink-0 px-2 ${
                    itemsPerSlide === 1 ? 'w-full' : 
                    itemsPerSlide === 2 ? 'w-1/2' : 'w-1/3'
                  }`}
                >
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
            
            {/* Navigation dots */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide 
                        ? 'bg-blue-900' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Navigation arrows */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={() => setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
                  aria-label="Previous slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
                  aria-label="Next slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
