import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import MentorFooter from "../components/Menus/MentorFooter";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// const Messages = [
//   {
//     id: "1",
//     userName: "Jenny Doe",
//     userImg: require("../assets/users/user-3.jpg"),
//     messageTime: "4 mins ago",
//     messageText:
//       "Hey there, this is my test for a post of my social app in React Native.",
//   },
//   {
//     id: "2",
//     userName: "John Doe",
//     userImg: require("../assets/users/user-1.jpg"),
//     messageTime: "2 hours ago",
//     messageText:
//       "Hey there, this is my test for a post of my social app in React Native.",
//   },
//   {
//     id: "3",
//     userName: "Ken William",
//     userImg: require("../assets/users/user-4.jpg"),
//     messageTime: "1 hours ago",
//     messageText:
//       "Hey there, this is my test for a post of my social app in React Native.",
//   },
//   {
//     id: "4",
//     userName: "Selina Paul",
//     userImg: require("../assets/users/user-6.jpg"),
//     messageTime: "1 day ago",
//     messageText:
//       "Hey there, this is my test for a post of my social app in React Native.",
//   },
//   {
//     id: "5",
//     userName: "Christy Alex",
//     userImg: require("../assets/users/user-7.jpg"),
//     messageTime: "2 days ago",
//     messageText:
//       "Hey there, this is my test for a post of my social app in React Native.",
//   },
// ];

const Message = ({ navigation }) => {
  const [message, setMessages] = useState();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const { data } = await axios.get("/chat/chat");
    console.log(data);
    setMessages(data);
  };

  const chatId = async (id) => {
    await AsyncStorage.setItem("chatId", id);
    console.log(id);
    navigation.navigate("Chat");
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("@auth"));
    setUserInfo(data);
  };
  return (
    <View style={styles.Container}>
      {message && (
        <FlatList
          data={message}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => chatId(item._id)}
            >
              <View style={styles.userInfo}>
                <View style={styles.userImageWrapper}>
                  <FontAwesome5
                    style={styles.icon}
                    name="user-circle"
                    color={"rebeccapurple"}
                  />
                  {/* <Image style={styles.userImage} source={item.userImg} /> */}
                </View>
                <View style={styles.textSection}>
                  <View style={styles.userInfoText}>
                    <Text style={styles.userName}>
                      {item.users[0]._id != userInfo._id
                        ? item.users[1].name
                        : item.users[0].name}
                    </Text>
                    <Text style={styles.postTime}>{item.messageTime}</Text>
                  </View>
                  <Text style={styles.messageText}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <MentorFooter />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("CreateChat")}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 90,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 30,
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    // marginHorizontal: 30,
    marginBottom: 3,
    //alignSelf: "center",
    fontSize: 30,
    color: "#800080",
  },
  // view
  Container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  // touchable opacity

  card: {
    width: "100%",
  },

  //view

  userInfo: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  //view
  userImageWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },

  // image

  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  // view

  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  // view
  userInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5",
    marginTop: 5,
  },

  //Text
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    //fontFamily: "Lato-Regular",
  },

  //tetx4

  postTime: {
    fontSize: 12,
    color: "#666",
    //fontFamily: "Lato-Regular",
  },

  //TEXT

  messageText: {
    fontSize: 14,
    color: "#333333",
  },
});
