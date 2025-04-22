import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus } from 'lucide-react';
import { ProductForm } from './ProductForm';
import { ProductList } from './ProductList';
import { ProductDetails } from './ProductDetails';
import { Modal } from './Modal';
import type { Product } from '../types/Product';

export function ProductManagement() {
  const { user } = useAuth();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = React.useState<Product | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleAddProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProducts([...products, newProduct]);
    setIsFormModalOpen(false);
  };

  const handleEditProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProduct) return;
    
    const updatedProduct: Product = {
      ...productData,
      id: editingProduct.id,
      createdAt: editingProduct.createdAt,
      updatedAt: new Date(),
    };

    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setIsFormModalOpen(false);
    setViewingProduct(updatedProduct);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
      setViewingProduct(null);
    }
  };

  const handleViewDetails = (product: Product) => {
    setViewingProduct(product);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingProduct(null);
  };

  if (viewingProduct) {
    return (
      <div>
        <ProductDetails
          product={viewingProduct}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestión de Productos
        </h1>
        <button
          onClick={() => setIsFormModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Agregar Producto
        </button>
      </div>
      
      <ProductList
        products={products}
        onViewDetails={handleViewDetails}
      />

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
      >
        <ProductForm
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          initialData={editingProduct}
          isEditing={!!editingProduct}
          onCancel={handleCloseFormModal}
        />
      </Modal>
    </div>
  );
}