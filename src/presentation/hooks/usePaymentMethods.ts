import { useState, useEffect } from 'react';
import { PaymentMethodRepositoryImpl } from '../../domain/repositories/PaymentMethodRepository';
import { FetchPaymentMethodsUseCase } from '../../domain/useCases/paymentMethod/FetchPaymentMethodsUseCase';
import type { PaymentMethod } from '../../types/PaymentMethod';

const paymentMethodRepository = new PaymentMethodRepositoryImpl();
const fetchPaymentMethodsUseCase = new FetchPaymentMethodsUseCase(paymentMethodRepository);

export function usePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPaymentMethods = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const methods = await fetchPaymentMethodsUseCase.execute();
      setPaymentMethods(methods);
    } catch (err) {
      setError('Error al cargar los métodos de pago');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  return { paymentMethods, isLoading, error };
}