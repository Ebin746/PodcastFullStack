import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

// Create a context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user as null to avoid undefined issues
  const [isLoading, setIsLoading] = useState(true); // Set loading initially to true
  const fetchUser = async () => {
    try {
        setIsLoading(true)
      const { data } = await axiosInstance.get("/user");
      console.log("data", data); // Debugging line
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user:", error); // Log error for debugging
      setUser(null);
    }finally{
        setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchUser(); // Call fetchUser only once on component mount
  }, [])

  


  // Login function
  const login = async (credentials) => {
    try {
      const { data } = await axiosInstance.post("/login", credentials);
      console.log(data);
      setUser(data.user); // Assuming the backend returns { user: userData }
    } catch (error) {
      setUser(null); // If login fails, set user to null
      console.error("Login failed", error);
      throw error;
    }
  };

  // Signup function
  const signup = async (credentials) => {
    try {
      const { data } = await axiosInstance.post("/signup", credentials);
      console.log(data)
      setUser(data.user); // Assuming the backend returns { user: userData }
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
      setUser(null); // After logout, reset the user state
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout,setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
