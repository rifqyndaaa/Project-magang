import { createContext, useContext, useState } from 'react';
import { getAdminSession, loginAdmin, registerAdmin, logoutAdmin } from '../services/storage';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => getAdminSession());

  const login = async (username, password) => {
    const res = await loginAdmin(username, password);
    if (res.success) {
      setSession(getAdminSession());
    }
    return res;
  };

  const register = async (name, username, password) => {
    const res = await registerAdmin(name, username, password);
    if (res.success) {
      setSession(getAdminSession());
    }
    return res;
  };

  const logout = () => {
    logoutAdmin();
    setSession(null);
  };

  return (
    <AdminAuthContext.Provider value={{ session, isAuthenticated: !!session, login, register, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  return context;
}

export default AdminAuthContext;

