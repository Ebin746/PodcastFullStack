import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUser = async () => {
    const token = localStorage.getItem("token"); 

    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user);
    } catch (error) {
      console.error("Fetching user failed", error);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
        const token = localStorage.getItem("token"); 
    if (token) {
          fetchUser();
    }
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await axiosInstance.post("/login", credentials);
      localStorage.setItem("token", data.token); 
      setUser(data.user);
    } catch (error) {
      setUser(null);
      console.error("Login failed", error);
      throw error;
    }
  };

  const signup = async (credentials) => {
    try {
      const { data } = await axiosInstance.post("/signup", credentials);
      console.log(data);
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };
  const logout = () => {
    localStorage.removeItem("token"); 
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
