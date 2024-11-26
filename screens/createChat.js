import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createChat = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigation = useNavigation();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/auth/get-all-users");
      setUserInfo(data);
      setFilteredUsers(data); // Initialize filtered users with all users
    } catch (error) {
      console.log(error);
    }
  };

  const searchUsers = async (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredUsers(userInfo); // Reset to all users if search is empty
      return;
    }

    try {
      const { data } = await axios.get(`/auth/search-users?name=${term}`);
      setFilteredUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const userChat = async (id) => {
    try {
      const { data } = await axios.post("/chat/chat", { userId: id });
      await AsyncStorage.setItem("chatId", data._id);
      navigation.navigate("Chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Chat</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name..."
        value={searchTerm}
        onChangeText={searchUsers}
      />
      <ScrollView>
        {filteredUsers.map((user) => (
          <TouchableOpacity
            key={user._id}
            style={styles.userBtn}
            onPress={() => userChat(user._id)}
          >
            <View style={styles.userContent}>
              <Image
                source={{ uri: user.profilePicture }}
                style={styles.profilePicture}
              />
              <Text style={styles.userText}>{user.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default createChat;

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
  userBtn: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2, // Width of the border
    borderColor: "purple", // Color of the border
    borderRadius: 10, // Rounded corners (optional)
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
});
