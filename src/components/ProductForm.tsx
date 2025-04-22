import React from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../types/Product';

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Product;
  isEditing?: boolean;
  onCancel: () => void;
}

export function ProductForm({ onSubmit, initialData, isEditing = false, onCancel }: ProductFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      purchasePrice: Number(formData.get('purchasePrice')),
      sellingPrice: Number(formData.get('sellingPrice')),
      quantity: Number(formData.get('quantity')),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={initialData?.name}
            required
            className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.1)] focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={initialData?.category}
            required
            className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.1)] focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">
            Precio de Compra
          </label>
          <input
            type="number"
            id="purchasePrice"
            name="purchasePrice"
            defaultValue={initialData?.purchasePrice}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.1)] focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">
            Precio de Venta
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            defaultValue={initialData?.sellingPrice}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.1)] focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Cantidad
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            defaultValue={initialData?.quantity}
            required
            min="0"
            className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.1)] focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </div>
    </form>
  );
}