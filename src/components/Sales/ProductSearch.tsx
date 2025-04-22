import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useCart } from '../Cart/CartContext';
import { useProducts } from '../../presentation/hooks/useProducts';
import type { ProductDto } from '../../types/Product';

export function ProductSearch() {
  const [search, setSearch] = useState('');
  const { products, isLoading, error, searchProducts } = useProducts();
  const { dispatch } = useCart();

  const handleSearch = () => {
    searchProducts(search);
  };

  const handleAddToCart = (product: ProductDto) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id,
        quantity: 1,
        salePrice: product.unitPrice,
        product
      }
    });
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && (
        <div className="text-red-600 mb-4">{error}</div>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">${product.unitPrice}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 w-full px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
              >
                Agregar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}