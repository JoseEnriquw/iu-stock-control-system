import type { PaymentMethod } from '../../../types/PaymentMethod';
import type { PaymentMethodRepository } from '../../repositories/PaymentMethodRepository';

export class FetchPaymentMethodsUseCase {
  constructor(private paymentMethodRepository: PaymentMethodRepository) {}

  async execute(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.fetchPaymentMethods();
  }
}