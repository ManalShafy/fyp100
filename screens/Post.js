import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/authContext";
import React, { useState, useContext } from "react";
import { PostContext } from "../context/postContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const Post = ({ navigation }) => {
  //const [state, setState] = useContext(AuthContext);
  //const { token } = state;

  // global state
  const [posts, setPosts] = useContext(PostContext);
  const { token } = posts;
  // local State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // handle post data
  const handlePost = async () => {
    try {
      setLoading(true);
      // if (!title) {
      //   alert("Please add post title");
      // }
      // if (!description) {
      //   alert("Please add post description");
      // }

      const { data } = await axios.post("/post/create-post", {
        title,
        description,
      });
      setLoading(false);
      setPosts([...posts, data?.post]);
      alert(data?.message);
    } catch (error) {
      alert(error.response.data.message || error.message);
      // navigation.navigate("Home");
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headingCont}>
          <Text style={styles.heading}>Create a Post</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Add post title"
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Add post description"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>Create Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.container2}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
  },
  container2: {
    flex: 1,
    justifyContent: "flex-end",
  },
  headingCont: {
    alignItems: "center",
  },
  heading: {
    fontSize: 25,
    color: "#800080",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#e6e6fa",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },

  postBtn: {
    backgroundColor: "#800080",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  postBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
