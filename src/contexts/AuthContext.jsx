import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - replace with actual API call
    // For demo purposes, we'll check email domains
    let role = "user";
    let name = "Demo User";
    
    if (email.includes("admin")) {
      role = "admin";
      name = "Admin User";
    }

    const mockUser = {
      id: "1",
      email,
      name,
      role,
    };

    const mockToken = "mock-jwt-token-" + Date.now();

    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", mockToken);
    setUser(mockUser);

    // Role-based redirect
    if (role === "admin") {
      navigate("/admin/banks");
    } else {
      navigate("/user/accounts");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isUser: user?.role === "user",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
