import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Track if a search is in progress
  const navigation = useNavigation();

  const searchUsers = async (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredUsers([]);
      setIsSearching(false); // Stop searching if the term is empty
      return;
    }

    setIsSearching(true); // Start searching
    try {
      const { data } = await axios.get(`/auth/search-users?name=${term}`);
      setFilteredUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserPress = (userId) => {
    navigation.navigate("UserProfileSearch", { userId }); // Navigate and pass the user ID
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Users</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name..."
        value={searchTerm}
        onChangeText={searchUsers}
      />
      <ScrollView>
        {isSearching && filteredUsers.length === 0 && (
          <Text style={styles.noResultsText}>No users found.</Text>
        )}
        {filteredUsers.map((user) => (
          <TouchableOpacity
            key={user._id}
            style={styles.userBtn}
            onPress={() => handleUserPress(user._id)} // Pass the user's ID
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

export default SearchScreen;

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
    borderWidth: 2,
    borderColor: "purple",
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
  noResultsText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
    marginTop: 20,
  },
});
