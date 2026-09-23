'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, products as defaultProducts } from '@/data/products';

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product | null>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = 'xtreme_admin_products';

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchServerProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.products));
          } catch {
            // Ignore
          }
          return;
        }
      }
    } catch (e) {
      console.error('Failed to fetch products from server:', e);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          queueMicrotask(() => {
            if (isMounted) setProducts(parsed);
          });
        }
      }
    } catch {
      // Ignore
    }

    queueMicrotask(() => {
      if (isMounted) {
        fetchServerProducts().finally(() => {
          if (isMounted) setIsLoading(false);
        });
      }
    });

    const handleFocus = () => fetchServerProducts();
    window.addEventListener('focus', handleFocus);
    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchServerProducts]);

  const addProduct = async (newProdData: Omit<Product, 'id'>): Promise<Product | null> => {
    const id = newProdData.slug || `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id
    };
    setProducts((prev) => [newProduct, ...prev]);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProdData)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.product) {
          setProducts((prev) => [data.product, ...prev.filter((p) => p.id !== id)]);
          return data.product;
        }
      }
    } catch (e) {
      console.error('Failed to save product to server:', e);
    }

    return newProduct;
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));

    try {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedFields })
      });
    } catch (e) {
      console.error('Failed to update product on server:', e);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.error('Failed to delete product on server:', e);
    }
  };

  const toggleFeatured = async (id: string) => {
    const prod = products.find((p) => p.id === id);
    if (!prod) return;
    const newFeatured = !prod.isFeatured;
    await updateProduct(id, { isFeatured: newFeatured });
  };

  const resetToDefaults = async () => {
    setProducts(defaultProducts);
    try {
      localStorage.removeItem(STORAGE_KEY);
      await fetch('/api/products?reset=true', { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to reset products on server:', e);
    }
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFeatured,
        resetToDefaults,
        getProductBySlug,
        refreshProducts: fetchServerProducts
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
