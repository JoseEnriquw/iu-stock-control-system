import { useState } from 'react';
import type { ProductDto } from '../../types/Product';
import { ProductRepositoryImpl } from '../../domain/repositories/ProductRepository';
import { SearchProductsUseCase } from '../../domain/useCases/product/SearchProductsUseCase';

const productRepository = new ProductRepositoryImpl();
const searchProductsUseCase = new SearchProductsUseCase(productRepository);

export function useProducts() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = async (search?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await searchProductsUseCase.execute(search);
      setProducts(result);
    } catch (err) {
      setError('Error al buscar productos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    isLoading,
    error,
    searchProducts
  };
}