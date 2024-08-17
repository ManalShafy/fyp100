import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AuthContext, AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/Menus/ScreenMenu";
import { PostProvider } from "./context/postContext";
import { ChatProvider } from "./context/chatContext";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <ChatProvider>
          <ScreenMenu />
        </ChatProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
