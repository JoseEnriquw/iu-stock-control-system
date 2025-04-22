import type { ProductDto } from '../../../types/Product';
import type { ProductRepository } from '../../repositories/ProductRepository';

export class SearchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(search?: string, page?: number, size?: number): Promise<ProductDto[]> {
    return this.productRepository.searchProducts(search, page, size);
  }
}