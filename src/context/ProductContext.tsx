'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products as defaultProducts } from '@/data/products';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
  resetToDefaults: () => void;
  getProductBySlug: (slug: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = 'xtreme_admin_products';

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  // Load persisted products from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          queueMicrotask(() => {
            setProducts(parsed);
          });
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
  }, []);

  // Save to localStorage on change
  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist products to localStorage', e);
    }
  };

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = newProdData.slug || `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id
    };
    saveProducts([newProduct, ...products]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, ...updatedFields } : p
    );
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const toggleFeatured = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    );
    saveProducts(updated);
  };

  const resetToDefaults = () => {
    saveProducts(defaultProducts);
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFeatured,
        resetToDefaults,
        getProductBySlug
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
