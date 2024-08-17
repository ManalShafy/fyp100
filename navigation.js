import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AuthContext, AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/Menus/ScreenMenu";
import { PostProvider } from "./context/postContext";
import { ChatProvider } from "./context/chatContext";
import { JobProvider } from "./context/jobContext";
import { AuthPageProvider } from "./context/authPageContext";
import { ProjectProvider } from "./context/projectContext";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <AuthPageProvider>
        <PostProvider>
          <ChatProvider>
            <ProjectProvider>
              <JobProvider>
                <ScreenMenu />
              </JobProvider>
            </ProjectProvider>
          </ChatProvider>
        </PostProvider>
      </AuthPageProvider>
    </AuthProvider>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
