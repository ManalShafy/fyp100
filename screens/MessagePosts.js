import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from "../components/Menus/FooterMenu";
import { AuthContext } from "../context/authContext";
import { useIsFocused } from "@react-navigation/native";

const MessagePosts = ({ navigation, route }) => {
  const [message, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [state] = useContext(AuthContext);
  const isFocused = useIsFocused();
  const { postId } = route.params;

  useEffect(() => {
    if (isFocused) {
      fetchChats();
      getUserInfo();
    }
    // fetchChats();
    // getUserInfo();
  }, [isFocused]);

  const fetchChats = async () => {
    const { data } = await axios.get("/chat/chat");
    setMessages(data);
  };

  const getUserInfo = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("@auth"));
    setUserInfo(data);
    console.log("getUserInfo", data);
  };

  const fetchPostMessage = async (id) => {
    const data = await axios.post("message/message-post", { id });
  };
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/post/get-post-byid/${postId}`); // Fetch post by ID
      setPosts(data?.post);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  // const chatId = async (id) => {
  //   await AsyncStorage.setItem("chatId", id);
  //   navigation.navigate("Chat");
  // };
  const chatId = async (chatId) => {
    try {
      //   await AsyncStorage.setItem("chatId", chatId); // Use chatId to match the function parameter
      //   console.log(chatId);

      const data = await axios.post("message/message-post", { postId, chatId });

      if (data) {
        // Ensure data is received successfully
        await AsyncStorage.setItem("chatId", chatId); // Use chatId to match the function parameter
        console.log(chatId);
        navigation.navigate("Chat");
      }
    } catch (error) {
      console.error("Error setting chatId or posting message:", error); // Catch any errors and log them
    }
  };
  const renderChatItem = ({ item }) => {
    // Ensure userInfo is loaded before checking
    const isUnseen =
      item.latestMessage &&
      userInfo &&
      !item.latestMessage.readBy.includes(userInfo.user._id);

    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => chatId(item._id)}
      >
        {userInfo != null &&
          (item.isGroupChat === false ? (
            <Image
              source={{
                uri:
                  item.users[0]._id !== userInfo.user._id
                    ? item.users[0].profilePicture
                    : item.users[1].profilePicture,
              }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          ) : (
            <Icon name="users" size={32} color="purple" />
          ))}

        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>
              {item.isGroupChat === false
                ? item.users[0]._id !== userInfo.user._id
                  ? item.users[0].name
                  : item.users[1].name
                : item.chatName}
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

  // const renderChatItem = ({ item }) => {
  //   const isUnseen =
  //     item.latestMessage && item.latestMessage.readBy.length === 0;

  //   return (
  //     <TouchableOpacity
  //       style={styles.chatCard}
  //       onPress={() => chatId(item._id)}
  //     >
  //       {/* <Image
  //         source={{
  //           uri:
  //             item.isGroupChat === false ? (
  //               item.users[0]._id !== userInfo.user._id ? (
  //                 item.users[0].profilePicture
  //               ) : (
  //                 item.users[1].profilePicture
  //               )
  //             ) : (
  //               <Icon name="users" size={32} color="purple" />
  //             ), // Placeholder for group icon
  //         }}
  //         style={styles.profileImage}
  //       /> */}
  //       {/* Display profile picture or group icon */}
  //       {userInfo != null &&
  //         (item.isGroupChat === false ? (
  //           <Image
  //             source={{
  //               uri:
  //                 item.users[0]._id !== userInfo.user._id
  //                   ? item.users[0].profilePicture
  //                   : item.users[1].profilePicture,
  //             }}
  //             style={{ width: 50, height: 50, borderRadius: 25 }}
  //           />
  //         ) : (
  //           <Icon name="users" size={32} color="purple" />
  //         ))}

  //       <View style={styles.chatInfo}>
  //         <View style={styles.chatHeader}>
  //           <Text style={styles.chatName}>
  //             {item.isGroupChat === false
  //               ? item.users[0]._id !== userInfo.user._id
  //                 ? item.users[0].name
  //                 : item.users[1].name
  //               : item.chatName}
  //           </Text>
  //           <Text style={styles.timeText}>
  //             {item.latestMessage
  //               ? new Date(item.latestMessage.createdAt).toLocaleTimeString(
  //                   [],
  //                   { hour: "2-digit", minute: "2-digit" }
  //                 )
  //               : ""}
  //           </Text>
  //         </View>
  //         <Text
  //           style={[
  //             styles.chatMessage,
  //             isUnseen && { fontWeight: "bold", color: "#800080" },
  //           ]}
  //           numberOfLines={1}
  //         >
  //           {item.latestMessage
  //             ? item.latestMessage.content
  //             : "No messages yet"}
  //         </Text>
  //       </View>

  //       {isUnseen && (
  //         <View style={styles.unreadBadge}>
  //           <Text style={styles.unreadText}>New</Text>
  //         </View>
  //       )}
  //     </TouchableOpacity>
  //   );
  // };

  // return (
  //   <View style={styles.container}>
  //     { message && (<FlatList
  //       data={message}
  //       keyExtractor={(item) => item._id}
  //       renderItem={renderChatItem}
  //       ItemSeparatorComponent={() => <View style={styles.separator} />}
  //     />
  //     <Footer />
  //     <TouchableOpacity
  //       style={styles.floatingButton}
  //       onPress={() => navigation.navigate("CreateChat")}
  //     >)}
  //       <Text style={styles.buttonText}>+</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
  return (
    <View style={styles.container}>
      {message && userInfo && (
        <>
          <FlatList
            data={message}
            keyExtractor={(item) => item._id}
            renderItem={renderChatItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          <Footer />
        </>
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("CreateChat")}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessagePosts;

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
});
