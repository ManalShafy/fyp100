import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentScreen = ({ route }) => {
  const { postId } = route.params;
  const [comments, setComments] = useState([]);
  const [commentersPictures, setCommentersPictures] = useState({});
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchCommentsAndPictures = async () => {
      try {
        const commentsResponse = await axios.get(`/post/comments/${postId}`);
        setComments(commentsResponse.data);

        const picturesResponse = await axios.get(
          `/auth/post/commenters-profile-pictures/${postId}`
        );
        const picturesData = picturesResponse.data.commenters.reduce(
          (acc, commenter) => {
            acc[commenter.userId] = commenter.profilePicture;
            return acc;
          },
          {}
        );
        setCommentersPictures(picturesData);
      } catch (error) {
        console.error("Error fetching comments or profile pictures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsAndPictures();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const { data: updatedComments } = await axios.put(`/post/comment`, {
        postId,
        text: newComment,
      });

      setComments(updatedComments);
      setNewComment("");
    } catch (error) {
      // console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#800080" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {comments.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No comments</Text>
        </View>
      )}
      <FlatList
        data={comments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Image
              source={{ uri: commentersPictures[item.postedBy._id] }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.username}>{item.postedBy.name}:</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <Pressable onPress={handleAddComment} style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
  },
  username: {
    fontWeight: "bold",
    color: "#800080",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#800080",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
  },
  commentText: {
    marginTop: 3,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  emptyText: {
    fontSize: 18,
    color: "#777",
  },
});
