export interface PurchaseDetail {
  productId: number;
  quantity: number;
  costPrice: number;
  expirationDate: Date;
  batchNumber?: string;
}

export interface Purchase {
  supplierId: number;
  createdBy: string;
  purchaseDate: Date;
  purchaseDetails: PurchaseDetail[];
}

export interface PurchaseResponse {
  purchaseId: number;
  message: string;
}