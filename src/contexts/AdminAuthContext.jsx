import { createContext, useContext, useState, useEffect } from 'react';
import { getAdminSession, loginAdmin, logoutAdmin } from '../services/storage';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => getAdminSession());

  useEffect(() => {
    setSession(getAdminSession());
  }, []);

  const login = (username, password) => {
    const res = loginAdmin(username, password);
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
    <AdminAuthContext.Provider value={{ session, isAuthenticated: !!session, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  return context;
}

export default AdminAuthContext;

