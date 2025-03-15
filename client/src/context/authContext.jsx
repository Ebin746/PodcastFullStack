import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch User from JWT stored in localStorage
  const fetchUser = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user);
    } catch (error) {
      console.error("Fetching user failed", error);
      setUser(null);
      localStorage.removeItem("token"); // Remove invalid token
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user on app load
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const { data } = await axiosInstance.post("/login", credentials);
      localStorage.setItem("token", data.token); // Store JWT in localStorage
      setUser(data.user);
    } catch (error) {
      setUser(null);
      console.error("Login failed", error);
      throw error;
    }
  };

  // Signup function
  const signup = async (credentials) => {
    try {
      const { data } = await axiosInstance.post("/signup", credentials);
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
