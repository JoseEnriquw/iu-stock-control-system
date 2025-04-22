import type { Sale, SaleResponse } from '../../types/Sale';
import { api } from '../../config/api';

export interface SaleRepository {
  createSale(sale: Sale): Promise<SaleResponse>;
}

export class SaleRepositoryImpl implements SaleRepository {
  async createSale(sale: Sale): Promise<SaleResponse> {
    const response = await api.post('/api/v1/Sale', sale);
    return response.data;
  }
}