import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MentorFooter = () => {
  const [state, setState] = useState(false);
  const isFocused = useIsFocused();
  const FetchMentor = async () => {
    // setLoading(true);
    try {
      const data = JSON.parse(await AsyncStorage.getItem("@mentor"));
      setState(data);
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    FetchMentor();
  }, []);

  //hooks
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          style={[
            styles.iconStyle,
            route.name === "Home" && { color: "rebeccapurple" },
          ]}
        />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <FontAwesome5
          name="user-friends"
          style={[
            styles.iconStyle,
            route.name === "About" && { color: "rebeccapurple" },
          ]}
        />
        <Text style={{ marginLeft: 10 }}>Network</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <FontAwesome5
          name="plus-circle"
          style={[
            { marginLeft: 20 },
            styles.iconStyle,
            route.name === "Post" && { color: "rebeccapurple" },
          ]}
        />
        <Text style={{ marginLeft: 20 }}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          !isFocused ? navigation.navigate("Courses") : "";
          // state && navigation.navigate("Courses");
        }}
      >
        <FontAwesome5
          name="chalkboard-teacher"
          style={[
            styles.iconStyle,
            route.name === "Courses" && { color: "rebeccapurple" },
          ]}
        />
        <Text style={styles.text}>Courses </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => navigation.navigate("ProjectBoard")}>
        <FontAwesome5
          name="briefcase"
          style={[
            styles.iconStyle,
            route.name === "ProjectBoard" && { color: "rebeccapurple" },
          ]}
        />
        <Text>Project Board</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.navigate("Message")}>
        <FontAwesome6
          name="message"
          style={[
            styles.iconStyle,
            route.name === "Message" && { color: "rebeccapurple" },
          ]}
        />
        <Text>Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MentorFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  iconStyle: {
    margin: 20,
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
    color: "#800080",
  },
  text: {
    marginLeft: 15,
  },
});
