import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Menus/FooterMenu";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/authContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";

const GroupMessage = ({ navigation }) => {
  const [message, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [state] = useContext(AuthContext);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   fetchChats();
  //   getUserInfo();
  // }, []);
  useEffect(() => {
    if (isFocused) {
      fetchChats();
      getUserInfo();
    }
    // fetchChats();
    // getUserInfo();
  }, [isFocused]);

  const fetchChats = async () => {
    const { data } = state?.token
      ? await axios.get("/chat/groupchat")
      : await axios.get("/pagechat/groupchat");
    setMessages(data);
  };

  const getUserInfo = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("@auth"));
    setUserInfo(data);
  };

  const chatId = async (id) => {
    await AsyncStorage.setItem("chatId", id);
    navigation.navigate("Chat");
  };

  const renderChatItem = ({ item }) => {
    const isUnseen =
      item.latestMessage &&
      userInfo &&
      !item.latestMessage.readBy.includes(userInfo.user._id);

    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => chatId(item._id)}
      >
        {item.isGroupChat ? (
          <Icon name="users" size={32} color="purple" />
        ) : (
          <Image
            source={{
              uri:
                item.users[0]._id !== userInfo.user._id
                  ? item.users[0].profilePicture
                  : item.users[1].profilePicture,
            }}
            style={styles.profileImage}
          />
        )}
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>
              {item.isGroupChat ? item.chatName : "Group Chat"}
            </Text>
            <Text style={styles.timeText}>
              {item.latestMessage
                ? new Date(item.latestMessage.createdAt).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )
                : ""}
            </Text>
          </View>
          <Text
            style={[
              styles.chatMessage,
              isUnseen && { fontWeight: "bold", color: "#800080" },
            ]}
            numberOfLines={1}
          >
            {item.latestMessage
              ? item.latestMessage.content
              : "No messages yet"}
          </Text>
        </View>
        {isUnseen && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>New</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {message.length > 0 ? (
        <FlatList
          data={message}
          keyExtractor={(item) => item._id}
          renderItem={renderChatItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <Text style={styles.noChatsText}>Create group chat</Text>
      )}
      <Footer />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("CreateGroupChat")}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#999",
    marginTop: 11,
  },
  chatMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginLeft: 10,
  },
  unreadBadge: {
    backgroundColor: "#800080",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 9,
    marginBottom: 9,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#800080",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
  },
  noChatsText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
