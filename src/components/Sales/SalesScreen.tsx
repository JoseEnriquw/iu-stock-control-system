import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CartProvider } from '../Cart/CartContext';
import { ProductSearch } from './ProductSearch';
import { SaleCart } from './SaleCart';
import { PaymentModal } from './PaymentModal';

export function SalesScreen() {
  const { user } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <CartProvider>
      <div className="h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Nueva Venta</h1>
          <p className="text-sm text-gray-500">Vendedor: {user?.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProductSearch />
            <SaleCart onCheckout={() => setIsPaymentModalOpen(true)} />
          </div>
        </div>

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      </div>
    </CartProvider>
  );
}