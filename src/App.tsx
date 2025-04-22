import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ProductManagement } from './components/ProductManagement';
import { SalesScreen } from './components/Sales/SalesScreen';
import { Layout } from './components/Layout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <PrivateRoute>
                <ProductManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/ventas"
            element={
              <PrivateRoute>
                <SalesScreen />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}