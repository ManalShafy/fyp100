import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Context
const AuthPageContext = createContext();

// Provider
const AuthPageProvider = ({ children }) => {
  // Global state
  const [statePage, setStatePage] = useState({
    page: null,
    pageToken: "",
  });

  let pageToken = statePage && statePage.token;

  // Default axios configuration
  axios.defaults.baseURL = "http://192.168.1.14:8000/api/v1";
  axios.defaults.headers.common["Authorization"] = `Bearer ${pageToken}`;
  // axios.defaults.headers.common["PageAuthorization"] = `Bearer ${pageToken}`;

  // Initialize local storage
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@authPage");
      let loginData = JSON.parse(data);

      setStatePage({
        ...statePage,
        page: loginData?.page,
        pageToken: loginData?.pageToken,
      });
    };
    loadLocalStorageData();
  }, []);

  return (
    <AuthPageContext.Provider value={[statePage, setStatePage]}>
      {children}
    </AuthPageContext.Provider>
  );
};

export { AuthPageContext, AuthPageProvider };
