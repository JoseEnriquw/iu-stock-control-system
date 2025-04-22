import type { ProductDto } from '../../types/Product';
import { api } from '../../config/api';

export interface ProductRepository {
  searchProducts(search?: string, page?: number, size?: number): Promise<ProductDto[]>;
  getProductById(id: number): Promise<ProductDto>;
  getProductBySku(sku: string): Promise<ProductDto>;
}

export class ProductRepositoryImpl implements ProductRepository {
  async searchProducts(search?: string, page: number = 1, size: number = 10): Promise<ProductDto[]> {
    const response = await api.get('/api/v1/Product', {
      params: { search, page, size }
    });
    return response.data.items;
  }

  async getProductById(id: number): Promise<ProductDto> {
    const response = await api.get(`/api/v1/Product/${id}`);
    return response.data;
  }

  async getProductBySku(sku: string): Promise<ProductDto> {
    const response = await api.get(`/api/v1/Product/sku/${sku}`);
    return response.data;
  }
}