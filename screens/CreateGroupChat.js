import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/authContext";

const CreateGroupChat = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const [state] = useContext(AuthContext);

  const fetchUser = async () => {
    try {
      const { data } = state?.token
        ? await axios.get("/auth/get-all-users")
        : await axios.get("/auth/get-all-users-page");

      setUserInfo(data);
      setFilteredUsers(data); // Initialize filtered users
    } catch (error) {
      console.log(error);
    }
  };

  const searchUsers = (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredUsers(userInfo); // Reset to all users if search is empty
      return;
    }

    const filtered = userInfo.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleUserSelection = (user) => {
    if (selectedUsers.some((selectedUser) => selectedUser._id === user._id)) {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser._id !== user._id)
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const createGroupChat = async () => {
    try {
      const userIds = selectedUsers.map((user) => user._id);
      const { data } = state?.token
        ? await axios.post("/chat/group", {
            users: JSON.stringify(userIds),
            name: groupName,
          })
        : await axios.post("/pagechat/page-group", {
            users: JSON.stringify(userIds),
            name: groupName,
          });
      await AsyncStorage.setItem("chatId", data._id);
      navigation.navigate("Chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Group Chat</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name..."
        value={searchTerm}
        onChangeText={searchUsers}
      />

      {/* Display selected users */}
      <View style={styles.selectedUsersContainer}>
        {selectedUsers.length > 0 && (
          <Text style={styles.selectedUsersText}>
            Selected: {selectedUsers.map((user) => user.name).join(", ")}
          </Text>
        )}
      </View>

      {/* Group Name Input */}
      {selectedUsers.length > 1 && (
        <TextInput
          style={styles.groupNameInput}
          placeholder="Enter Group Name"
          value={groupName}
          onChangeText={setGroupName}
        />
      )}

      {/* User List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.userBtn,
              selectedUsers.some(
                (selectedUser) => selectedUser._id === item._id
              ) && styles.userBtnSelected,
            ]}
            onPress={() => toggleUserSelection(item)}
          >
            <View style={styles.userContent}>
              <Image
                source={{ uri: item.profilePicture }}
                style={styles.profilePicture}
              />
              <Text style={styles.userText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Create Group Button */}
      {selectedUsers.length > 1 && groupName && (
        <TouchableOpacity
          style={styles.createGroupBtn}
          onPress={createGroupChat}
        >
          <Text style={styles.createGroupText}>Create Group Chat</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CreateGroupChat;

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
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  selectedUsersContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  selectedUsersText: {
    fontSize: 16,
    color: "#333",
  },
  groupNameInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  userBtn: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "purple",
    borderRadius: 10,
  },
  userBtnSelected: {
    backgroundColor: "#b300b3",
  },
  userContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  userText: {
    color: "purple",
    fontSize: 18,
  },
  createGroupBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  createGroupText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
