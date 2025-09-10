import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'asha_worker' | 'health_officer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  village?: string;
  district?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for demo
const mockUsers = {
  'asha@example.com': {
    id: '1',
    name: 'Priya Sharma',
    email: 'asha@example.com',
    role: 'asha_worker' as UserRole,
    village: 'Jorhat',
    district: 'Jorhat',
    phone: '+91 9876543210'
  },
  'officer@example.com': {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    email: 'officer@example.com',
    role: 'health_officer' as UserRole,
    district: 'Jorhat',
    phone: '+91 9876543211'
  },
  'admin@example.com': {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin' as UserRole,
    phone: '+91 9876543212'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('health_monitor_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email as keyof typeof mockUsers];
    if (mockUser && mockUser.role === role) {
      setUser(mockUser);
      localStorage.setItem('health_monitor_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('health_monitor_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};