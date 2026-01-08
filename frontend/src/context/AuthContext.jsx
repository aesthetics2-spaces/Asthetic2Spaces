/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const [likedProperties, setLikedProperties] = useState([]);

  const login = ({ user, token }) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setLikedProperties([]);
    localStorage.clear();
  };

  const refreshLikes = async () => {
    if (!user?._id) return;

    const res = await axios.get(
      `https://asthetic2spaces-3.onrender.com/api/favorites/liked/${user._id}`
    );

    setLikedProperties(res.data.likedProperties.map(p => p._id));
  };

  useEffect(() => {
    refreshLikes();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        likedProperties,
        refreshLikes
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
