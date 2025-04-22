import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../types/Product';

interface ProductDetailsProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductDetails({ product, onEdit, onDelete }: ProductDetailsProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Categoría</h4>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.category}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Cantidad</h4>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.quantity}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Precio de Compra</h4>
            <p className="mt-1 text-lg font-medium text-gray-900">
              ${product.purchasePrice.toFixed(2)}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Precio de Venta</h4>
            <p className="mt-1 text-lg font-medium text-gray-900">
              ${product.sellingPrice.toFixed(2)}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Margen de Ganancia</h4>
            <p className="mt-1 text-lg font-medium text-green-600">
              ${(product.sellingPrice - product.purchasePrice).toFixed(2)}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Ganancia Total Potencial</h4>
            <p className="mt-1 text-lg font-medium text-green-600">
              ${((product.sellingPrice - product.purchasePrice) * product.quantity).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Fecha de Creación</h4>
              <p className="mt-1 text-sm text-gray-900">{formatDate(product.createdAt)}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Última Actualización</h4>
              <p className="mt-1 text-sm text-gray-900">{formatDate(product.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onEdit(product)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Pencil className="h-5 w-5 mr-2" />
            Editar
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}