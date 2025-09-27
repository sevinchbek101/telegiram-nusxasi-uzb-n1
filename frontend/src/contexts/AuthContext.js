import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (mock localStorage check)
    const savedUser = localStorage.getItem('telegram_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      // Mock authentication - in real app, this would call backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Mock successful login
      const userData = { ...mockUser, ...credentials };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('telegram_user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithQR = async () => {
    setIsLoading(true);
    try {
      // Mock QR login
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = mockUser;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('telegram_user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'QR login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('telegram_user');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    loginWithQR,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};