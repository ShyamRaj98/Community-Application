import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api"; // ✅ use your axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🔐 Login
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // 📝 Register
  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook (use this everywhere instead of useContext directly)
export const useAuth = () => useContext(AuthContext);
