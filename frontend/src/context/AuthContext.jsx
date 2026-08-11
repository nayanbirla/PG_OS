import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

/**
 * AuthProvider manages authentication state across the app.
 * Stores tokens in localStorage for persistence across refreshes.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check for existing token and restore session
  useEffect(() => {
    const token = localStorage.getItem('pgos_access_token');
    const savedUser = localStorage.getItem('pgos_user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        // Corrupted data — clear it
        localStorage.removeItem('pgos_access_token');
        localStorage.removeItem('pgos_refresh_token');
        localStorage.removeItem('pgos_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem('pgos_access_token', accessToken);
    localStorage.setItem('pgos_refresh_token', refreshToken);
    localStorage.setItem('pgos_user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('pgos_access_token');
    localStorage.removeItem('pgos_refresh_token');
    localStorage.removeItem('pgos_user');
  }, []);

  const isAuthenticated = !!user;

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context.
 * Must be used within an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
