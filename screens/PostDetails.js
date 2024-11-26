import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Make sure to import the icon library
import FooterMenu from "../components/Menus/FooterMenu"; // Ensure the path is correct
import axios from "axios"; // Import axios for API calls
import moment from "moment"; // Import moment for date formatting
import PostCard from "../components/PostCard";
import PostCardSingle from "../components/PostCardSingle";
import { AuthContext } from "../context/authContext";
import { useIsFocused } from "@react-navigation/native";

const PostDetails = ({ route, navigation }) => {
  const { postId } = route.params; // Get postId from route params
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  // const isFocused = useIsFocused();
  // const [state] = useContext(AuthContext);

  useEffect(() => {
    console.log("postdetail useeffect", postId);
    // const fetchPost = async () => {
    //   try {
    //     const response = await axios.get(`/post/get-post-byid/${postId}`); // Fetch post by ID
    //     setPosts(response.data.post);
    //   } catch (error) {
    //     console.error("Error fetching post:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/post/get-post-byid/${postId}`); // Fetch post by ID
        console.log(data);
        setPosts(data?.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLikePost = () => {
    // Add logic to like the post
    console.log("Liked the post");
  };

  // const handleComment = () => {
  //   // Navigate to Comments screen
  //   navigation.navigate("Comments", { postId: post._id });
  // };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#800080" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {posts && <PostCardSingle post={posts} />}
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  combinedDetailBox: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#800080",
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  commentBox: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  commentText: {
    fontSize: 16,
    color: "#333",
  },
  likeButton: {
    marginTop: 20,
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: "center",
  },
  likeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  commentButton: {
    marginTop: 10,
    backgroundColor: "#008080",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: "center",
  },
  commentButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PostDetails;
