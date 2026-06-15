import { useMemo, useState } from 'react';
import { adminApi } from '../services/adminApi';
import { AuthContext } from './auth-context';

const getStoredAdmin = () => {
  try {
    return JSON.parse(localStorage.getItem('adminUser')) || null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(getStoredAdmin);
  const [token, setToken] = useState(() => localStorage.getItem('adminToken'));

  const login = async (credentials) => {
    const response = await adminApi.login(credentials);
    const nextToken = response.data.token;
    const nextAdmin = response.data.admin;

    localStorage.setItem('adminToken', nextToken);
    localStorage.setItem('adminUser', JSON.stringify(nextAdmin));
    setToken(nextToken);
    setAdmin(nextAdmin);

    return nextAdmin;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
    setAdmin(null);
  };

  const value = useMemo(
    () => ({
      admin,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [admin, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
