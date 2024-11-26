import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//context
const AuthContext = createContext();

//provider
const AuthProvider = ({ children }) => {
  //global state
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  let token = state && state.token;

  //default axios
  // axios.defaults.baseURL = "http://192.168.1.7:8081/api/v1";
  axios.defaults.baseURL = "http://192.168.1.5:8000/api/v1";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // initial loca storage
  useEffect(() => {
    const loadLoacalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);

      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLoacalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
