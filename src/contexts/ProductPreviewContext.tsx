'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Item } from '@/data/products';

interface ProductPreviewContextType {
  selectedProduct: Item | null;
  isPreviewOpen: boolean;
  openPreview: (product: Item) => void;
  closePreview: () => void;
}

const ProductPreviewContext = createContext<ProductPreviewContextType | undefined>(undefined);

export function ProductPreviewProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openPreview = (product: Item) => {
    setSelectedProduct(product);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedProduct(null);
  };

  return (
    <ProductPreviewContext.Provider value={{ 
      selectedProduct,
      isPreviewOpen,
      openPreview,
      closePreview
    }}>
      {children}
    </ProductPreviewContext.Provider>
  );
}

export function useProductPreview() {
  const context = useContext(ProductPreviewContext);
  if (context === undefined) {
    throw new Error('useProductPreview must be used within a ProductPreviewProvider');
  }
  return context;
}
