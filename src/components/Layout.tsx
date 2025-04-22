import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Menu,
  Package, 
  ShoppingCart, 
  LayoutDashboard, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const showBackButton = location.pathname !== '/dashboard';

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      allowedRoles: ['admin', 'employee']
    },
    {
      name: 'Productos',
      path: '/productos',
      icon: Package,
      allowedRoles: ['admin', 'employee']
    },
    {
      name: 'Ventas',
      path: '/ventas',
      icon: ShoppingCart,
      allowedRoles: ['admin']
    }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-4'} border-b border-gray-200`}>
            {!isCollapsed && <h1 className="text-xl font-bold text-red-600">Sistema</h1>}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>

          <nav className="flex-1 py-4">
            {navigationItems.map((item) => (
              item.allowedRoles.includes(user?.role || '') && (
                <Link
                  key={item.path}
                  to={item.path}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center ${
                    isCollapsed ? 'justify-center' : 'px-4'
                  } py-2 text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-red-50 text-red-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${!isCollapsed && 'mr-3'}`} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )
            ))}
          </nav>

          <div className={`p-4 border-t border-gray-200 ${isCollapsed ? 'items-center' : ''}`}>
            {!isCollapsed ? (
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                  title="Cerrar Sesión"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={logout}
                className="w-full flex justify-center p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                title="Cerrar Sesión"
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="h-16 flex items-center justify-between px-4">
            <div className="flex items-center">
              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="flex items-center text-gray-500 hover:text-gray-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="ml-1">Volver</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}