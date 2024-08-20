import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Context
const AuthPageContext = createContext();

// Provider
const AuthPageProvider = ({ children }) => {
  // Global state
  const [state, setState] = useState({
    page: null,
    pageToken: "",
  });

  let pageToken = state && state.pageToken;

  // Default axios configuration
  axios.defaults.baseURL = "http://192.168.1.54:8000/api/v1";
  axios.defaults.headers.common["PageAuthorization"] = `Bearer ${pageToken}`;

  // Initialize local storage
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@authPage");
      let loginData = JSON.parse(data);

      setState({
        ...state,
        page: loginData?.page,
        pageToken: loginData?.pageToken,
      });
    };
    loadLocalStorageData();
  }, []);

  return (
    <AuthPageContext.Provider value={[state, setState]}>
      {children}
    </AuthPageContext.Provider>
  );
};

export { AuthPageContext, AuthPageProvider };
