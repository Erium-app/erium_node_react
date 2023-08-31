// src/context/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/AuthService.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const data = await AuthService.login(email, password);
      console.log(data)
      setUser(data.user);
      return data
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, name) => {
    try {
      const data = await AuthService.register(email, password, name);
      console.log(data)
      setUser(data.user);
      return data
    } catch (error) {
      throw error;
    }
  };

  const resetPasswordRequest = async (email) => {
    try {
      await AuthService.resetPasswordRequest(email);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    // Check if the user is already logged in (e.g., via localStorage)
    // Set the user state accordingly
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    resetPasswordRequest,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
