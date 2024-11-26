import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import FooterMenu from "../../components/Menus/FooterMenu";
import { PostContext } from "../../context/postContext";
import PostCard from "../../components/PostCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
const Home = () => {
  //global satate
  //const [state] = useContext(AuthContext);

  const navigation = useNavigation();
  const [posts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [state] = useContext(AuthContext);

  const checkAuthentication = () => {
    if (!state?.token) {
      state;
      console.log("useeffect check");
      // If the token is null, navigate to the login screen
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    if (isFocused) {
      checkAuthentication();
    }
  }, [getAllPosts, isFocused]);
  // check for token or else take to login screen

  // useEffect(() => {
  //   checkAuthentication(state, navigation);
  // }, [state?.token, navigation]);
  //refresh controll
  useEffect(() => {
    fetchFriendsPosts();
  }, []);

  // Function to fetch posts from friends
  const fetchFriendsPosts = async () => {
    try {
      const response = await axios.get("/post/friends-posts");
      if (response.data.success) {
        setPosts(response.data.friendsPosts);
      } else {
        console.error("Failed to fetch posts:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching friends' posts:", error);
    }
  };

  // Function to handle refresh action
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFriendsPosts().finally(() => setRefreshing(false));
  }, []);

  const currentUserId = state?._id;

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ marginLeft: 10 }}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.postContainer}>
          <PostCard posts={posts} currentUserId={currentUserId} />
        </View>
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  postContainer: {
    width: "100%",
    paddingHorizontal: 3,
  },
});
export default Home;
