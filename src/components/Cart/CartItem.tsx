import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from './CartContext';
import type { ProductDto } from '../../types/Product';
import type { SaleDetail } from '../../types/Sale';

interface CartItemProps {
  item: SaleDetail & { product: ProductDto };
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId: item.productId, quantity: newQuantity }
    });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.productId });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
        <p className="text-sm text-gray-500">Precio: ${item.salePrice}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <span className="w-12 text-center">{item.quantity}</span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={handleRemove}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}