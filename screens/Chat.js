import { Alert, LogBox, TouchableOpacity } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

import { StyleSheet, Text, View, Button } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { GiftedChat, Avatar, Bubble, Send } from "react-native-gifted-chat";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from "expo-document-picker";
import { Linking } from "react-native";
import * as FileSystem from "expo-file-system";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../context/authContext";
const ENDPOINT = "http://localhost:8000";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [chatID, setchatID] = useState([]);
  const [loading, setloading] = useState(false);
  const [newMessage, setnewMessage] = useState();
  // const toast = useToast()
  const [socketConnected, setsocketConnected] = useState(false);
  const [typing, settyping] = useState(false);
  const [istyping, setistyping] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);

  console.log("print check");

  useEffect(() => {
    if (isFocused) {
      console.log("usseffect 1st");
    }
  }, [isFocused]);

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
    // console.log(userInfo);
    //navigation.navigate("Chat");
    console.log(cId);
    setchatID(cId);
  };

  // useEffect(() => {
  //   console.log("check1");
  //   socket = io(ENDPOINT);
  //   console.log("check2");
  //   socket.emit("setup", userInfo);
  //   socket.on("connected", () => {
  //     setsocketConnected(true);
  //     console.log("CONNTECTED TO CONNECTED");
  //   });
  //   socket.on("typing", () => setistyping(true));
  //   socket.on("stop typing", () => setistyping(false));
  // }, []);

  useEffect(() => {
    console.log("chehc use effect");
    allMessages();
    getUserInfo();
    chatIdF();
    markMessagesAsRead();
    // selectedChatCompare = selectedChat;
  }, []);
  const markMessagesAsRead = async () => {
    const chatId = await AsyncStorage.getItem("chatId");
    try {
      const response = await axios.put(`/chat/mark-read/${chatId}`);

      if (response.data.success) {
        console.log(`Marked ${response.data.updatedCount} messages as read.`);
      } else {
        console.log("Failed to mark messages as read.");
      }
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  // useEffect(() => {
  //   socket.on("message recieved", (newMessageReceived) => {
  //     if (!chatID || chatID != newMessageReceived.chat._id) {
  //     } else {
  //       const formattedMessage = {
  //         _id: newMessageReceived.id,
  //         text: newMessageReceived.content,
  //         createdAt: new Date(newMessageReceived.createdAt),
  //         user: {
  //           _id: newMessageReceived.userId,
  //           name: newMessageReceived.userName,
  //           avatar: newMessageReceived.userAvatar,
  //         },
  //       };
  //       setMessages((prevMessages) => [formattedMessage, ...prevMessages]);
  //     }
  //   });
  // });

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

      // const formattedMessage = {
      //   _id: data._id,
      //   text: data.content,
      //   createdAt: new Date(data.createdAt),
      //   user: {
      //     _id: data.userId,
      //     name: data.userName,
      //   },
      // };
      const formattedMessage = {
        _id: data._id,
        text: (
          <Text
            onPress={() => {
              navigation.navigate("PostDetails", {
                postId: "66fac37ce713de89018055d0",
              });
            }}
            style={{ color: "red" }}
          >
            Celebrating Women in STEM
          </Text>
        ),
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
  // const handleFilePicker = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: "*/*",
  //       copyToCacheDirectory: true,
  //     });

  //     if (result.type === "success") {
  //       console.log("Selected file:", result);
  //       // Call the sendMessage function with the file data.
  //       sendAttachmentMessage(result);
  //     }
  //   } catch (err) {
  //     console.error("Error picking file:", err);
  //   }
  // };

  const handleFilePicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    console.log("DocumentPicker result:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri, name, mimeType } = result.assets[0];
      sendAttachmentMessage({ uri, name, type: mimeType });
      console.log("Picked file:", { uri, name, type: mimeType });
    }
  };

  const sendAttachmentMessage = async (file) => {
    const cId = await AsyncStorage.getItem("chatId");

    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream",
    });
    formData.append("chatId", cId);

    try {
      const chatid = await AsyncStorage.getItem("chatId");
      const response = await axios.post(
        `/message/attachment/${chatid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const message = {
        chatId: chatID,
        file: file.uri,
      };

      setMessages((prevMessages) => [message, ...prevMessages]);
    } catch (error) {
      console.error("Error sending file message:", error);
    }
  };

  const checkForGroupchat = async () => {
    const chatid = await AsyncStorage.getItem("chatId");
    const gcdata = await axios.get(`/chat/isGroupChat/${chatid}`);
  };

  const downloadFile = async (fileUrl) => {
    if (!fileUrl) {
      Alert.alert("Error", "No file URL provided");
      return;
    }

    const fileName = fileUrl.split("/").pop(); // Extract the file name from the URL
    const tempFileUri = `${FileSystem.documentDirectory}${fileName}`; // Local path to save the file temporarily

    try {
      console.log("Starting download...");
      console.log("File URL:", fileUrl);

      // Step 1: Download the file temporarily
      const { uri: tempUri } = await FileSystem.downloadAsync(
        fileUrl,
        tempFileUri
      );

      console.log("File downloaded to temp location:", tempUri);

      // Step 2: Request permission to access a folder
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        Alert.alert(
          "Permission Denied",
          "Cannot save file without permissions."
        );
        return;
      }

      // Step 3: Create the file in the selected folder
      const newFileUri =
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          "application/pdf"
        );

      console.log("New file created at:", newFileUri);

      // Step 4: Write the content of the temporary file to the new file
      const fileContent = await FileSystem.readAsStringAsync(tempUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await FileSystem.writeAsStringAsync(newFileUri, fileContent, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("File saved to:", newFileUri);
      Alert.alert("Download Successful", `File saved to: ${newFileUri}`);
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Download Failed", error.message);
    }
  };

  //downloading but no file on phone
  // const downloadFile = async (fileUrl) => {
  //   // Validate URL
  //   if (
  //     !fileUrl ||
  //     (!fileUrl.startsWith("http://") && !fileUrl.startsWith("https://"))
  //   ) {
  //     Alert.alert(
  //       "Invalid URL",
  //       "Please provide a valid URL starting with http or https"
  //     );
  //     console.error("Invalid URL provided:", fileUrl);
  //     return;
  //   }

  //   try {
  //     console.log("Starting download...");
  //     console.log("File URL:", fileUrl);

  //     // Download the file to the app's default document directory
  //     const { uri } = await FileSystem.downloadAsync(
  //       fileUrl,
  //       `${FileSystem.documentDirectory}${fileUrl.split("/").pop()}`
  //     );

  //     console.log("File downloaded to:", uri);
  //     Alert.alert("Download Successful", `File saved to: ${uri}`);
  //   } catch (error) {
  //     console.error("Download error:", error);
  //     Alert.alert("Download Failed", error.message);
  //   }
  // };
  const allMessages = async () => {
    const id = await AsyncStorage.getItem("chatId");

    // const { data } =

    const { data } = state?.token
      ? await axios.get("/message/" + id)
      : await axios.get("/pagemessage/" + id);
    console.log("page data", data);

    const formattedMessages =
      data &&
      data.map((msg) => ({
        _id: msg._id,
        // text: (
        //   <Text
        //     onPress={() => {
        //       navigation.navigate("PostDetails", {
        //         postId: "66fac37ce713de89018055d0",
        //       });
        //     }}
        //     style={{ color: "red" }}
        //   >
        //     Celebrating Women in STEM
        //   </Text>
        // ),
        // text: msg.content.includes("<Text")
        //   ? msg.content.replace(/['"]/g, "")
        //   : `"${msg.content}"`, // Remove quotes for <text>, keep otherwis
        text: msg.post ? (
          <Text
            onPress={() => {
              // Navigate with the postId from the string
              navigation.navigate("PostDetails", {
                postId: msg.post,
              });
            }}
            style={{ color: "red" }}
          >
            {msg.content}
          </Text>
        ) : (
          msg.content
        ),

        // file: msg.file
        //   ? "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        //   : null,
        file: msg.file,

        // { msg.file ? file: msg.file : null }

        // msg.post ? (
        //   <Text
        //     onPress={() => {
        //       // Navigate with the postId from the string
        //       navigation.navigate("PostDetails", {
        //         postId: msg.post,
        //       });
        //     }}
        //     style={{ color: "red" }}
        //   >
        //     {msg.content}
        //   </Text>
        // ) : (
        //   msg.content
        // ),

        //messsage.content
        createdAt: new Date(msg.createdAt),
        user: {
          _id: msg.sender._id,
          name: msg.sender.name,
        },
      }));

    setMessages(formattedMessages.reverse());
  };

  // const renderBubble = (props) => {
  //   return (
  //     <Bubble
  //       {...props}
  //       wrapperStyle={{
  //         right: {
  //           backgroundColor: "rebeccapurple",
  //         },
  //       }}
  //       textStyle={{
  //         right: {
  //           color: "#fff",
  //         },
  //       }}
  //     />
  //   );
  // };

  const renderBubble = (props) => {
    const { currentMessage } = props;
    console.log("currentMessage", currentMessage);

    if (currentMessage.file) {
      return (
        <View
          style={{
            backgroundColor: "#e6f7ff",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text>{currentMessage.text}</Text>
          {currentMessage.file && (
            <Text
              style={{
                color: "#555",
                marginVertical: 5,
                fontStyle: "italic",
              }}
            >
              {`File: ${currentMessage.file}`}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => downloadFile(currentMessage.file)}
            style={{
              backgroundColor: "#007bff",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>Download File</Text>
          </TouchableOpacity>
        </View>
      );
    }

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
  // most recent working onsend
  // const onSend = useCallback(async (messages = []) => {
  //   console.log("send message check");
  //   const messageToSend = messages[0];
  //   console.log(messageToSend);
  //   console.log("check3");

  //   // if (messageToSend && messageToSend.text) {
  //   //   socket.emit("stop typing", chatID);
  //   try {
  //     console.log("message check123", messageToSend.text);

  //     setnewMessage("");
  //     const cId = await AsyncStorage.getItem("chatId");
  //     console.log("chatid", cId);
  //     // const { data } = state?.token
  //     // ? await axios.get("/message/" + id)

  //     const { data } = state?.token
  //       ? await axios.post("/message/", {
  //           content: messageToSend.text,
  //           chatId: cId,
  //         })
  //       : await axios.post("/pagemessage/", {
  //           content: messageToSend.text,
  //           chatId: cId,
  //         });
  //     // const data = await axios.post("/message/", {
  //     //   content: messageToSend.text,
  //     //   chatId: cId,
  //     // });

  //     console.log("2242", data.content);
  //     console.log("2241", data);

  //     // const formattedMessage = {
  //     //   _id: data._id,
  //     //   text: data.content,
  //     //   createdAt: new Date(data.createdAt),
  //     //   user: {
  //     //     _id: data.userId,
  //     //     name: data.userName,
  //     //   },
  //     // };
  //     console.log("psotsww", data.chat.content);
  //     const formattedMessages = {
  //       _id: data._id,
  //       // text: (
  //       //   <Text
  //       //     onPress={() => {
  //       //       navigation.navigate("PostDetails", {
  //       //         postId: "66fac37ce713de89018055d0",
  //       //       });
  //       //     }}
  //       //     style={{ color: "red" }}
  //       //   >
  //       //     Celebrating Women in STEM
  //       //   </Text>
  //       // ),
  //       // text: msg.content.includes("<Text")
  //       //   ? msg.content.replace(/['"]/g, "")
  //       //   : `"${msg.content}"`, // Remove quotes for <text>, keep otherwis

  //       text: data.chat?.post ? (
  //         <Text
  //           onPress={() => {
  //             // Navigate with the postId from the string
  //             navigation.navigate("PostDetails", {
  //               postId: msg.post,
  //             });
  //           }}
  //           style={{ color: "red" }}
  //         >
  //           {data.content}
  //         </Text>
  //       ) : (
  //         data.content
  //       ),

  //       //messsage.content
  //       createdAt: new Date(data.chat.createdAt),
  //       user: {
  //         _id: data.sender._id,
  //         name: data.sender.name,
  //       },
  //     };

  //     console.log("form", formattedMessages);

  //     // socket.emit("new message", data);
  //     // setMessages((previousMessages) =>
  //     //   GiftedChat.append(previousMessages, formattedMessages)
  //     // );
  //     setMessages((prevMessages) => [formattedMessages, ...prevMessages]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const onSend = useCallback(async (messages = []) => {
    console.log("send message check");
    const messageToSend = messages[0];
    console.log(messageToSend);
    console.log("check3");

    try {
      console.log("message check123", messageToSend.text);

      setnewMessage(""); // Reset message input after sending
      const cId = await AsyncStorage.getItem("chatId");
      console.log("chatid", cId);

      // Assuming you have your axios setup here
      const { data } = state?.token
        ? await axios.post("/message/", {
            content: messageToSend.text,
            chatId: cId,
          })
        : await axios.post("/pagemessage/", {
            content: messageToSend.text,
            chatId: cId,
          });

      console.log("data", data);

      // Function to detect and linkify URLs
      const linkifyText = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(" ").map((word, index) => {
          if (word.match(urlRegex)) {
            return (
              <Text
                key={index}
                style={{ color: "blue" }}
                onPress={() => Linking.openURL(word)}
              >
                {word}{" "}
              </Text>
            );
          }
          return word + " ";
        });
      };

      // Format the message
      const formattedMessages = {
        _id: data._id,
        text: data.chat?.post ? (
          <Text
            onPress={() => {
              navigation.navigate("PostDetails", {
                postId: data.chat?.post, // Post ID from the data
              });
            }}
            style={{ color: "red" }}
          >
            {data.content}
          </Text>
        ) : (
          linkifyText(data.content) // Call linkifyText to make URLs clickable
        ),
        createdAt: new Date(data.chat.createdAt),
        user: {
          _id: data.sender._id,
          name: data.sender.name,
        },
      };

      console.log("formattedMessages", formattedMessages);

      setMessages((prevMessages) => [formattedMessages, ...prevMessages]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  //working render
  // const renderSend = (props) => {
  //   return (
  //     <Send {...props}>
  //       <View>
  //         {/* <View style={styles.containerIB}> */}
  //         <MaterialCommunityIcons
  //           name="send-circle"
  //           style={{ marginBottom: 5, marginRight: 5 }}
  //           size={32}
  //           color="purple"
  //         />
  //         {/* <Icon
  //           type="font-awesome"
  //           name="paperclip"
  //           style={{
  //             marginBottom: 10,
  //             marginRight: 10,
  //             transform: [{ rotateY: "180deg" }],
  //           }}
  //           size={25}
  //           color="blue"
  //           tvParallaxProperties={undefined}
  //         /> */}
  //       </View>
  //     </Send>
  //   );
  // };

  // const renderSend = (props) => (
  //   <View style={{ flexDirection: "row", alignItems: "center" }}>
  //     <MaterialCommunityIcons
  //       name="paperclip"
  //       size={32}
  //       color="purple"
  //       style={{ marginHorizontal: 5 }}
  //       onPress={handleFilePicker}
  //     />
  //     <Send {...props}>
  //       <MaterialCommunityIcons
  //         name="send-circle"
  //         size={32}
  //         color="purple"
  //         style={{ marginBottom: 5, marginRight: 5 }}
  //       />
  //     </Send>
  //   </View>
  // );
  const renderSend = (props) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <MaterialCommunityIcons
        name="paperclip"
        size={32}
        color="purple"
        style={{ marginHorizontal: 5 }}
        onPress={handleFilePicker}
      />
      <Send {...props}>
        <MaterialCommunityIcons
          name="send-circle"
          size={32}
          color="purple"
          style={{ marginBottom: 5, marginRight: 5 }}
        />
      </Send>
    </View>
  );

  const getUserInfo = async () => {
    // const { data } = state?.token
    //   ? await axios.get("/message/" + id)
    const data = state?.token
      ? JSON.parse(await AsyncStorage.getItem("@auth"))
      : JSON.parse(await AsyncStorage.getItem("@authPage"));
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
            _id:
              userInfo && state?.token
                ? userInfo.user._id
                : userInfo.page.admin,
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
  // containerIB: {
  //   flex: 1,
  // },
});
export default Chat;
