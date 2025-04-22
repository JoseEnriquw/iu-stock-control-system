import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from '../../context/AuthContext';

interface CartSummaryProps {
  onCheckout: () => void;
  isLoading?: boolean;
}

export function CartSummary({ onCheckout, isLoading }: CartSummaryProps) {
  const { state } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState(1); // 1 = Efectivo por defecto

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen de la venta</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">${state.total.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          
          <div className="flex justify-between font-medium">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${state.total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          disabled={state.items.length === 0 || isLoading}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Procesando...' : 'Finalizar venta'}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Vendedor: {user?.name}
        </p>
      </div>
    </div>
  );
}