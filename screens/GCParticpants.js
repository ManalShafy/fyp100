import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/authContext";

const GCPartcipants = () => {
  const [groupChatUsers, setGroupChatUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin check
  const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);
  const { user } = state;

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("/auth/get-all-users");
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  // Fetch users in the current group chat and check if current user is admin
  const fetchGroupChatUsers = async () => {
    try {
      const chatId = await AsyncStorage.getItem("chatId");
      if (!chatId) return;

      // const { data } = await axios.get(`/chat/get-group-users/${chatId}`);
      const { data } = state?.token
        ? await axios.get(`/chat/get-group-users/${chatId}`)
        : await axios.get(`/pagechat/get-group-users/${chatId}`);

      // const dataadmin = await axios.get("/pagechat/getadminpage");
      // console.log("admin data", dataadmin.data);
      // console.log("admin data2", dataadmin.data.admin._id);
      // const { data: adminData } = await axios.get("/pagechat/getadminpage");
      // console.log("admin data", adminData);

      console.log("gc data", data);
      setGroupChatUsers(data.users);

      // Check if the current user is the group admin
      //   const currentUser = await AsyncStorage.getItem("userId"); // Assume userId is stored in AsyncStorage
      if (!state?.token) {
        state;
        const dataadmin = await axios.get("/pagechat/getadminpage");
        console.log("admin data", dataadmin.data);
        console.log("admin data2", dataadmin.data.admin._id);
        const adminCheck =
          data.groupAdmin && data.groupAdmin._id === dataadmin.data.admin._id;
        setIsAdmin(adminCheck); // Update the admin state
      } else {
        const adminCheck = data.groupAdmin && data.groupAdmin._id === user._id;
        setIsAdmin(adminCheck); // Update the admin state
      }
    } catch (error) {
      console.error("Error fetching group chat users:", error);
    }
  };

  // Add a user to the group chat
  const addParticipant = async (userId) => {
    if (!isAdmin) return; // Prevent adding if not admin
    try {
      const chatId = await AsyncStorage.getItem("chatId");
      if (!chatId) return;
      await axios.put(`/chat/groupadd/${chatId}`, { userId });
      fetchGroupChatUsers(); // Refresh the list after adding
    } catch (error) {
      console.error("Error adding participant:", error);
    }
  };

  // Remove a user from the group chat
  const removeParticipant = async (userId) => {
    if (!isAdmin) return; // Prevent removing if not admin
    try {
      const chatId = await AsyncStorage.getItem("chatId");
      if (!chatId) return;
      await axios.put(`/chat/groupremove/${chatId}`, { userId });
      fetchGroupChatUsers(); // Refresh the list after removing
    } catch (error) {
      console.error("Error removing participant:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchGroupChatUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Group Chat Participants</Text>

      <Text style={styles.subtitle}>Current Participants</Text>
      <ScrollView style={styles.scrollView}>
        {groupChatUsers.length > 0 ? (
          groupChatUsers.map((user) => (
            <View key={user._id} style={styles.userContainer}>
              <Text style={styles.userText}>{user.name}</Text>
              {isAdmin && ( // Show remove button only if user is admin
                <TouchableOpacity
                  style={[styles.button, styles.removeButton]}
                  onPress={() => removeParticipant(user._id)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noUsersText}>No users in this group chat</Text>
        )}

        {isAdmin && ( // Show add participants section only if user is admin
          <>
            <Text style={styles.subtitle}>Add Participants</Text>
            {allUsers
              .filter((user) => !groupChatUsers.find((u) => u._id === user._id)) // Filter out users already in the chat
              .map((user) => (
                <View key={user._id} style={styles.userContainer}>
                  <Text style={styles.userText}>{user.name}</Text>
                  <TouchableOpacity
                    style={[styles.button, styles.addButton]}
                    onPress={() => addParticipant(user._id)}
                  >
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default GCPartcipants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginVertical: 10,
  },
  scrollView: {
    marginBottom: 20, // Add margin for spacing
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  userText: {
    fontSize: 18,
    color: "#333",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#4CAF50",
  },
  removeButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  noUsersText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
  },
});
