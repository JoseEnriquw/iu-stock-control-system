import type { Sale, SaleResponse } from '../../../types/Sale';
import type { SaleRepository } from '../../repositories/SaleRepository';

export class CreateSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(sale: Sale): Promise<SaleResponse> {
    return this.saleRepository.createSale(sale);
  }
}