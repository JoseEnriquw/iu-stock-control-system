export interface Product {
  id: string;
  name: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}