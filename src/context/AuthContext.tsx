import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Simulated user data - In a real app, this would come from your backend
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin'
  },
  {
    id: '2',
    email: 'empleado@example.com',
    password: 'empleado123',
    name: 'Empleado',
    role: 'employee'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const { password: _, ...userWithoutPassword } = user;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}