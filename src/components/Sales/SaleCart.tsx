import React from 'react';
import { useCart } from '../Cart/CartContext';
import { CartItem } from '../Cart/CartItem';
import { CartSummary } from '../Cart/CartSummary';

interface SaleCartProps {
  onCheckout: () => void;
}

export function SaleCart({ onCheckout }: SaleCartProps) {
  const { state } = useCart();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Carrito de Venta</h2>
        
        <div className="divide-y divide-gray-200">
          {state.items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
          
          {state.items.length === 0 && (
            <p className="py-4 text-gray-500 text-center">
              No hay productos en el carrito
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 p-6">
        <CartSummary onCheckout={onCheckout} />
      </div>
    </div>
  );
}