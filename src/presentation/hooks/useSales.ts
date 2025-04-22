import { useState } from 'react';
import type { Sale } from '../../types/Sale';
import { SaleRepositoryImpl } from '../../domain/repositories/SaleRepository';
import { CreateSaleUseCase } from '../../domain/useCases/sale/CreateSaleUseCase';

const saleRepository = new SaleRepositoryImpl();
const createSaleUseCase = new CreateSaleUseCase(saleRepository);

export function useSales() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSale = async (sale: Sale) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createSaleUseCase.execute(sale);
      return result;
    } catch (err) {
      setError('Error al procesar la venta');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createSale
  };
}