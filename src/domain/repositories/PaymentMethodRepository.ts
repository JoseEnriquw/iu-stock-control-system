import { api } from '../../config/api';
import type { PaymentMethod } from '../../types/PaymentMethod';

export interface PaymentMethodRepository {
  fetchPaymentMethods(): Promise<PaymentMethod[]>;
}

export class PaymentMethodRepositoryImpl implements PaymentMethodRepository {
  async fetchPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await api.get('/api/v1/PaymentMethod');
    return response.data;
  }
}