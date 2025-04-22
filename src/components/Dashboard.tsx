import React from 'react';
import { Package, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Productos Card - Visible para todos */}
        <Link
          to="/productos"
          className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <Package className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Gestión de Productos
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Administra el inventario de productos
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Ventas Card - Solo visible para admin */}
        {user?.role === 'admin' && (
          <Link
            to="/ventas"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Gestión de Ventas
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Visualiza y administra las ventas
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}