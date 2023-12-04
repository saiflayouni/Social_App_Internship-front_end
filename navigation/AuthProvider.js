import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import LoadingComponent from "../components/LoadingComponent";
import {
  storeAuthToken,
  getAuthToken,
  removeAuthToken,
} from "./authTokenStorage";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  var foundUser = "";
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8060", // Set your API base URL here
    timeout: 5000, // Adjust this as needed
  });

  /*
  /api/users/me
  const checkAuthFromStorage = async () => {
    try {
      const token = await getAuthToken();
      if (token) {
        setUser({}); // Mettez à jour l'utilisateur en fonction du token si nécessaire
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'authentification depuis le stockage du token",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthFromStorage();
  }, []);
*/
  /*

  const login = async (email, password) => {
    try {
      // Make a POST request to your login endpoint

      const response = await axiosInstance.post("/api/auth/", {
        email,
        password,
      });

      console.log("ths is here", response.data.status);
      console.log("ths is here two", response.data);
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };*/
  const login = async (email, password) => {
    console.log(
      "*******************************************************************************"
    );
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      console.log("THIS IS RESSSPONSEEEEEE");
      const authToken = response.data.message;
      console.log("Erreur de l'API :", response.data.message);
      console.log("userrr ", email);
      console.log(password);

      await storeAuthToken(authToken);
      //console.log("authoken", authToken);
      setUser(response.data.user);
      //const foundUser = response.data.user;
      foundUser = response.data.user;
      // SetfoundUser(response.data.user);
      console.log("foundUser", foundUser);
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        // L'inscription a réussi
        return true;
      } else {
        // L'inscription a échoué
        return false;
      }
    } catch (error) {
      console.error(error);
      throw error; // Lancez l'erreur pour gérer les échecs d'inscription
    }
  };

  const logout = async () => {
    try {
      // Supprimer le token du stockage
      await removeAuthToken();

      // Effacer l'utilisateur de l'état
      setUser(null);

      // Rediriger vers l'écran de connexion
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
