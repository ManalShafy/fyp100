import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

import { StyleSheet, Text, View, Button } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GiftedChat, Avatar, Bubble, Send } from "react-native-gifted-chat";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:8000";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [chatID, setchatID] = useState([]);
  const [loading, setloading] = useState(false);
  const [newMessage, setnewMessage] = useState();
  // const toast = useToast()
  const [socketConnected, setsocketConnected] = useState(false);
  const [typing, settyping] = useState(false);
  const [istyping, setistyping] = useState(false);

  // useEffect(() => {
  //   allMessages();
  //   getUserInfo();
  //   // setMessages([
  //   //   {
  //   //     _id: 1,
  //   //     text: "Hello developer",
  //   //     createdAt: new Date(),
  //   //     user: {
  //   //       _id: 2,
  //   //       name: "React Native",
  //   //       avatar: "https://placeimg.com/140/140/any",
  //   //     },
  //   //   },
  //   //   {
  //   //     _id: 2,
  //   //     text: "Hello world",
  //   //     createdAt: new Date(),
  //   //     user: {
  //   //       _id: 1,
  //   //       name: "React Native",
  //   //       avatar: "https://placeimg.com/140/140/any",
  //   //     },
  //   //   },
  //   // ]);
  // }, []);

  const chatIdF = async () => {
    const cId = await AsyncStorage.getItem("chatId");
    console.log("check15");
    console.log(userInfo);
    //navigation.navigate("Chat");
    console.log(cId);
    setchatID(cId);
  };

  useEffect(() => {
    console.log("check1");
    socket = io(ENDPOINT);
    console.log("check2");
    socket.emit("setup", userInfo);
    socket.on("connected", () => {
      setsocketConnected(true);
      console.log("CONNTECTED TO CONNECTED");
    });
    socket.on("typing", () => setistyping(true));
    socket.on("stop typing", () => setistyping(false));
  }, []);

  useEffect(() => {
    allMessages();
    getUserInfo();
    chatIdF();
    // selectedChatCompare = selectedChat;
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageReceived) => {
      if (!chatID || chatID != newMessageReceived.chat._id) {
      } else {
        const formattedMessage = {
          _id: newMessageReceived.id,
          text: newMessageReceived.content,
          createdAt: new Date(newMessageReceived.createdAt),
          user: {
            _id: newMessageReceived.userId,
            name: newMessageReceived.userName,
            avatar: newMessageReceived.userAvatar,
          },
        };
        setMessages((prevMessages) => [formattedMessage, ...prevMessages]);
      }
    });
  });

  const sendMessage = async (messages = []) => {
    console.log("send message check");
    const messageToSend = messages[0];
    console.log(messageToSend, "chehck3");

    // if (messageToSend && messageToSend.text) {
    //   socket.emit("stop typing", chatID);
    try {
      setnewMessage("");
      const { data } = await axios.post("/", {
        content: messageToSend.text,
        chatId: chatID,
      });

      console.log(data);

      const formattedMessage = {
        _id: data._id,
        text: data.content,
        createdAt: new Date(data.createdAt),
        user: {
          _id: data.userId,
          name: data.userName,
        },
      };

      socket.emit("new message", data);
      setMessages((prevMessages) => [formattedMessage, ...prevMessages]);
    } catch (error) {
      console.log(error);
    }
    //}
  };

  const allMessages = async () => {
    const id = await AsyncStorage.getItem("chatId");
    const { data } = await axios.get("/message/" + id);
    console.log(data);

    const formattedMessages = data.map((msg) => ({
      _id: msg._id,
      text: msg.content,
      createdAt: new Date(msg.createdAt),
      user: {
        _id: msg.userId,
        name: msg.userName,
      },
    }));

    setMessages(formattedMessages.reverse());
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "rebeccapurple",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const onSend = useCallback(async (messages = []) => {
    console.log("send message check");
    const messageToSend = messages[0];
    console.log(messageToSend);
    console.log("check3");

    // if (messageToSend && messageToSend.text) {
    //   socket.emit("stop typing", chatID);
    try {
      console.log(messageToSend.text);

      setnewMessage("");
      const cId = await AsyncStorage.getItem("chatId");
      console.log(cId);
      const { data } = await axios.post("/message/", {
        content: messageToSend.text,
        chatId: cId,
      });

      console.log(data);

      const formattedMessage = {
        _id: data._id,
        text: data.content,
        createdAt: new Date(data.createdAt),
        user: {
          _id: data.userId,
          name: data.userName,
        },
      };

      socket.emit("new message", data);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      //setMessages((prevMessages) => [formattedMessage, ...prevMessages]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="purple"
          />
        </View>
      </Send>
    );
  };

  const getUserInfo = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("@auth"));
    console.log("check11");
    console.log(data);

    setUserInfo(data);
  };
  return (
    <>
      {messages && userInfo && (
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userInfo._id,
          }}
          renderBubble={renderBubble}
          scrollToBottom
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottomComponent={scrollToBottomComponent}
          renderUsernameOnMessage={true}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Chat;
