import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../Cart/CartContext';
import { useSales } from '../../presentation/hooks/useSales';
import { usePaymentMethods } from '../../presentation/hooks/usePaymentMethods';
import { Modal } from '../Modal';
import type { Sale, SalePayment } from '../../types/Sale';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { user } = useAuth();
  const { state, dispatch } = useCart();
  const { isLoading, error, createSale } = useSales();
  const { paymentMethods, isLoading: isLoadingMethods, error: methodsError } = usePaymentMethods();
  const [payments, setPayments] = useState<SalePayment[]>([]);
  const [currentAmount, setCurrentAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<number>(1);
  const [reference, setReference] = useState('');

  const remainingAmount = state.total - payments.reduce((sum, p) => sum + p.amount, 0);

  const handleAddPayment = () => {
    const amount = Number(currentAmount);
    if (amount <= 0 || amount > remainingAmount) return;

    setPayments([
      ...payments,
      {
        paymentMethodId: selectedMethod,
        amount,
        reference: selectedMethod !== 1 ? reference : undefined
      }
    ]);
    setCurrentAmount('');
    setReference('');
  };

  const handleFinalizeSale = async () => {
    if (remainingAmount > 0) return;

    try {
      const sale: Sale = {
        shiftId: 1,
        saleDate: new Date(),
        saleDetails: state.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          salePrice: item.salePrice
        })),
        salePayments: payments,
        createdBy: user?.email || ''
      };

      await createSale(sale);
      dispatch({ type: 'CLEAR_CART' });
      onClose();
    } catch (error) {
      console.error('Error al procesar la venta:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Finalizar Venta">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Total a pagar: ${state.total.toFixed(2)}</h3>
          <p className="text-sm text-gray-500">Monto restante: ${remainingAmount.toFixed(2)}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {methodsError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {methodsError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Método de pago
            </label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              disabled={isLoadingMethods}
            >
              {paymentMethods.map(method => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monto
            </label>
            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              min="0"
              max={remainingAmount}
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>

          {selectedMethod !== 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Referencia
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="Número de referencia"
              />
            </div>
          )}

          <button
            onClick={handleAddPayment}
            disabled={!currentAmount || Number(currentAmount) <= 0 || Number(currentAmount) > remainingAmount}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Agregar Pago
          </button>
        </div>

        {payments.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Pagos registrados:</h4>
            <div className="space-y-2">
              {payments.map((payment, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{paymentMethods.find(m => m.id === payment.paymentMethodId)?.name}</span>
                  <span>${payment.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={handleFinalizeSale}
            disabled={remainingAmount > 0 || isLoading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Procesando...' : 'Finalizar Venta'}
          </button>
        </div>
      </div>
    </Modal>
  );
}