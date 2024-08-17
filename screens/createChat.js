import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createChat = () => {
  const [userInfo, setUserInfo] = useState();
  const navigation = useNavigation();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/auth/get-all-users");
      setUserInfo(data);
      console.log(data);
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
      console.log(id);
      console.log("check nav");
      navigation.navigate("Chat");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Chat</Text>
      {userInfo &&
        userInfo.users.map((user) => (
          <TouchableOpacity
            key={user._id}
            style={styles.userBtn}
            onPress={() => userChat(user._id)}
          >
            <Text style={styles.userText}>{user.name}</Text>
          </TouchableOpacity>
        ))}
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
  userBtn: {
    backgroundColor: "#800080",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  userText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
