export interface SaleDetail {
  productId: number;
  quantity: number;
  salePrice: number;
}

export interface SalePayment {
  paymentMethodId: number;
  amount: number;
  reference?: string;
}

export interface Sale {
  shiftId: number;
  saleDate: Date;
  saleDetails: SaleDetail[];
  salePayments: SalePayment[];
  createdBy: string;
}

export interface SaleResponse {
  id: number;
  message: string;
}