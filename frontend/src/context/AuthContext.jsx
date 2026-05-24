import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data if token exists on startup
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await apiService.getMe();
          if (response && response.data && response.data.user) {
            setUser(response.data.user);
          } else {
            // Invalid response structure
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error('Failed to load user session:', err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiService.login({ email, password });
      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, error: 'Malformed response from server' };
    } catch (err) {
      const errMsg = err.response && err.response.data && err.response.data.error 
        ? err.response.data.error 
        : 'Invalid credentials or connection error';
      return { success: false, error: errMsg };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await apiService.signup(userData);
      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, error: 'Malformed response from server' };
    } catch (err) {
      const errMsg = err.response && err.response.data && err.response.data.error 
        ? err.response.data.error 
        : 'Failed to register or connection error';
      return { success: false, error: errMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const refreshUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await apiService.getMe();
        if (response && response.data && response.data.user) {
          setUser(response.data.user);
          return response.data.user;
        }
      } catch (err) {
        console.error('Failed to refresh user session:', err);
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
