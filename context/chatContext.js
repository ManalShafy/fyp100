import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const navigation = useNavigation();

  // tried user & @auth
  const fetchUserInfo = async () => {
    const userInfo = JSON.parse(await AsyncStorage.getItem("@auth"));

    setUser(userInfo);
    console.log(userInfo);

    if (!userInfo) navigation.navigate("Home");
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const ChatState = () => {
  return useContext(ChatContext);
};

export { ChatProvider, ChatState };
