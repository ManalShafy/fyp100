import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
import PostCard from "../components/PostCard";

const About = ({ navigation }) => {
  //global state
  const [state] = useContext(AuthContext);
  const { user } = state;
  //local state
  const name = user?.name;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //get user post
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-post");
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  //initial
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: 540 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://cdn2.f-cdn.com/contestentries/1440473/30778261/5bdd02db9ff4c_thumb900.jpg",
            }}
            style={{ height: 200, width: 200, borderRadius: 100 }}
          />
        </View>
        <View>
          <Text style={styles.Name}>{name}</Text>
        </View>
        <TouchableOpacity
          style={styles.updateProfileBtn}
          onPress={() => navigation.navigate("Account")}
        >
          <Text style={styles.updateProfileBtnText}>Update Profile</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>My Posts</Text>
        <PostCard posts={posts} myPostScreen={true} />
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  warningtext: {
    color: "red",
    fontSize: 13,
    textAlign: "center",
  },
  Name: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    color: "black",
  },
  updateProfileBtn: {
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 5,
  },
  updateProfileBtnText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
});

export default About;
