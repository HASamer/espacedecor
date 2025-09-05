'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getPriceRange } from '@/data/products';

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const { min: minPrice, max: maxPrice } = getPriceRange();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  return (
    <FilterContext.Provider value={{ 
      searchQuery, 
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      priceRange,
      setPriceRange,
      minPrice,
      maxPrice
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
