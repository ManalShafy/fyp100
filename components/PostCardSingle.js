// import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import moment from "moment";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";
// import EditModal from "./EditModal";

// const PostCard = ({ posts, myPostScreen }) => {
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [post, setPost] = useState({});
//   const navigation = useNavigation();
//   //handle delete prompt
//   const handleDeletePropmt = (id) => {
//     Alert.alert("Attention!", "Are You Sure Want to delete this post?", [
//       {
//         text: "Cancel",
//         onPress: () => {
//           console.log("cancel press");
//         },
//       },
//       {
//         text: "Delete",
//         // onPress: () => console.log("handle deelte"),//comment
//         onPress: () => handleDeletePost(id),
//       },
//     ]);
//   };

//   //delete post data
//   const handleDeletePost = async (id) => {
//     try {
//       setLoading(true);
//       console.log("handle deelte");
//       const { data } = await axios.delete(`/post/delete-post/${id}`);
//       setLoading(false);
//       alert(data?.message);
//       navigation.push("Myposts");
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//       alert(error);
//     }
//   };
//   return (
//     <View>
//       {myPostScreen && (
//         <EditModal
//           modalVisible={modalVisible}
//           setModalVisible={setModalVisible}
//           post={post}
//         />
//       )}
//       {/* <Text style={styles.heading}>Total Posts {posts?.length}</Text> */}
//       {posts?.map((post, i) => (
//         <View style={styles.card} key={i}>
//           {myPostScreen && (
//             <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
//               <Text style={{ marginHorizontal: 20, marginBottom: -5 }}>
//                 <FontAwesome5
//                   name="pen"
//                   size={16}
//                   color={"darkblue"}
//                   onPress={() => {
//                     setPost(post), setModalVisible(true);
//                   }}
//                 />
//               </Text>
//               <Text>
//                 <FontAwesome5
//                   name="trash"
//                   size={16}
//                   color={"red"}
//                   onPress={() => handleDeletePropmt(post?._id)}
//                 />
//               </Text>
//             </View>
//           )}
//           <View style={styles.footer}>
//             <Text style={styles.footTxt}>
//               <FontAwesome5
//                 style={styles.icon}
//                 name="user-circle"
//                 color={"rebeccapurple"}
//               />{" "}
//               {post?.postedBy?.name}
//             </Text>
//             <Text style={{ marginTop: 10 }}>
//               {moment(post?.createdAt).format("DD-MM-YYYY")}
//             </Text>
//           </View>
//           <Text style={styles.title}>{post?.title}</Text>
//           <Text>{post?.description}</Text>
//           <View style={styles.interactView}>
//             <Pressable>
//               <AntDesign style={styles.icon2} name="like2" size={24} />
//               <Text>Like</Text>
//             </Pressable>
//             <Pressable>
//               <FontAwesome style={styles.icon2} name="comment-o" size={22} />
//               <Text>Comment</Text>
//             </Pressable>
//             <Pressable>
//               <FontAwesome style={styles.icon2} name="send-o" size={24} />
//               <Text>Share</Text>
//             </Pressable>
//           </View>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default PostCard;

// const styles = StyleSheet.create({
//   heading: {
//     color: "green",
//     textAlign: "center",
//   },
//   card: {
//     width: "97%",
//     backgroundColor: "#ffffff",
//     borderWidth: 0.2,
//     borderColor: "gray",
//     padding: 20,
//     borderRadius: 5,
//     marginVertical: 10,
//   },
//   title: {
//     marginTop: 10,
//     fontWeight: "bold",
//     paddingBottom: 10,
//     //borderBottomWidth: 0.3,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//     alignContent: "center",
//     gap: 10,
//     //textAlignVertical: "top",
//   },
//   footTxt: {
//     fontSize: 18,
//   },
//   icon: {
//     marginHorizontal: 30,
//     marginBottom: 3,
//     //alignSelf: "center",
//     fontSize: 30,
//     color: "#800080",
//   },
//   icon2: {
//     textAlign: "center",
//     color: "#800080",
//   },
//   icon2Txt: {
//     textAlign: "center",
//     fontSize: 12,
//     marginTop: 2,
//   },
//   interactView: {
//     borderTopWidth: 0.3,
//     borderTopColor: "grey",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-around",
//     marginTop: 15,
//     paddingTop: 10,
//   },
// });

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCardSingle = ({ post, myPostScreen, currentUserId }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //   const [post, setPost] = useState();
  const [userLikes, setUserLikes] = useState({});
  const [userProfilePictures, setUserProfilePictures] = useState();
  const navigation = useNavigation();

  // useEffect(() => {
  //   const initialLikes = {};
  //   const pictures = {};

  //   const fetchProfilePictures = async () => {
  //     for (const post of posts) {
  //       try {
  //         const { data } = await axios.get(`/auth/user-profile-picture/${post._id}`);
  //         if (data.success) {
  //           pictures[post._id] = data.profilePicture;
  //         }
  //       } catch (error) {
  //         console.error("Error fetching profile picture:", error);
  //       }
  //     }
  //     setUserProfilePictures(pictures);
  //   };

  //   fetchProfilePictures();

  //   posts.forEach(post => {
  //     initialLikes[post._id] = {
  //       count: post.likes.length,
  //       userHasLiked: post.likes.some(like => like.userId === currentUserId),
  //     };
  //   });

  //   setUserLikes(initialLikes);
  // }, [posts, currentUserId]);
  useEffect(() => {
    const initialLikes = {};
    const pictures = {};

    console.log("check posts", post);

    const fetchProfilePictures = async () => {
      for (const post of post) {
        try {
          const { data } = await axios.get(
            `/auth/user-profile-picture/${post._id}`
          );

          if (data.success) {
            pictures[post._id] = data.profilePicture;
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      }
      setUserProfilePictures(pictures);
    };

    // fetchProfilePictures();

    // post.forEach((post) => {
    //   // Check if the current user has liked this post
    //   const userHasLiked = post.likes.some(
    //     (likes) => likes.postedBy === currentUserId
    //   );

    //   initialLikes[post._id] = {
    //     count: post.likes.length,
    //     userHasLiked: userHasLiked, // This ensures we only set true if the current user has liked it
    //   };
    // });

    setUserLikes(initialLikes);
  }, [post, currentUserId]);

  //   const handleDeletePrompt = (id) => {
  //     Alert.alert("Attention!", "Are you sure you want to delete this post?", [
  //       { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
  //       { text: "Delete", onPress: () => handleDeletePost(id) },
  //     ]);
  //   };

  //   const handleDeletePost = async (id) => {
  //     try {
  //       setLoading(true);
  //       const { data } = await axios.delete(`post/delete-post/${id}`);
  //       setLoading(false);
  //       alert(data?.message);
  //       navigation.push("About");
  //     } catch (error) {
  //       setLoading(false);
  //       alert(error.response?.data?.message || "Error deleting post");
  //     }
  //   };

  const handleLikePost = async (postId) => {
    try {
      const { data } = await axios.put("/post/like", { postId });
      setUserLikes((prev) => ({
        ...prev,
        [postId]: {
          count: data.likes.length,
          userHasLiked: true,
        },
      }));
    } catch (error) {
      alert("Error liking post");
    }
  };

  const handleUnlikePost = async (postId) => {
    try {
      const { data } = await axios.put("/post/unlike", { postId });
      setUserLikes((prev) => ({
        ...prev,
        [postId]: {
          count: data.likes.length,
          userHasLiked: false,
        },
      }));
    } catch (error) {
      alert("Error unliking post");
    }
  };
  //   const handlePostPress = (selectedpostId) => {
  //     // Navigate to PostDetails screen with the selectedPost details
  //     navigation.navigate("PostDetails", { postId: selectedpostId });
  //   };

  return (
    <View>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {/* {posts?.map((post) => (
          <View style={styles.card} key={post._id}>
            {myPostScreen && (
              <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Text style={{ marginHorizontal: 20, marginBottom: -5 }}>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={"darkblue"}
                    onPress={() => {
                      setPost(post);
                      setModalVisible(true);
                    }}
                  />
                </Text>
                <Text>
                  <MaterialIcons
                    name="delete"
                    size={20}
                    color={"red"}
                    onPress={() => handleDeletePrompt(post?._id)}
                  />
                </Text>
              </View>
            )}
            <View style={styles.header}>
              {userProfilePictures[post._id] ? (
                <Image
                  source={{ uri: userProfilePictures[post._id] }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profileImagePlaceholder} />
              )}
              <View>
                <Text style={styles.username}>{post?.postedBy?.name}</Text>
                <Text style={styles.date}>
                  {moment(post?.createdAt).format("DD-MM-YYYY")}
                </Text>
              </View>
            </View>
            <Text style={styles.title}>{post?.title}</Text>
            <Text>{post?.description}</Text>
            {post?.image && (
              <Image
                source={{ uri: post.image }}
                style={styles.postImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.interactView}>
              <Pressable
                onPress={() =>
                  userLikes[post?._id]?.userHasLiked
                    ? handleUnlikePost(post?._id)
                    : handleLikePost(post?._id)
                }
              >
                <MaterialIcons
                  style={styles.icon}
                  name={
                    userLikes[post?._id]?.userHasLiked
                      ? "thumb-up"
                      : "thumb-up-off-alt"
                  }
                  size={24}
                  color={userLikes[post?._id]?.userHasLiked ? "#800080" : "gray"}
                />
                <Text style={styles.iconLabel}>
                  {userLikes[post?._id]?.count || 0} Likes
                </Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate("Comments", { postId: post._id })
                }
              >
                <MaterialIcons
                  style={styles.icon}
                  name="comment"
                  size={24}
                  color="gray"
                />
                <Text style={styles.iconLabel}>Comment</Text>
              </Pressable>
              <Pressable>
                <MaterialIcons
                  style={styles.icon}
                  name="share"
                  size={24}
                  color="gray"
                />
                <Text style={styles.iconLabel}>Share</Text>
              </Pressable>
            </View>
          </View>
        ))} */}
      {/* {post */}
      <View
        //   key={post._id}
        //   onPress={() => handlePostPress(post._id)}
        style={styles.card}
      >
        {myPostScreen && (
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={{ marginHorizontal: 20, marginBottom: -5 }}>
              <MaterialIcons
                name="edit"
                size={20}
                color={"darkblue"}
                onPress={() => {
                  setPost(post);
                  setModalVisible(true);
                }}
              />
            </Text>
            <Text>
              <MaterialIcons
                name="delete"
                size={20}
                color={"red"}
                onPress={() => handleDeletePrompt(post?._id)}
              />
            </Text>
          </View>
        )}
        <View style={styles.header}>
          {console.log("check posts", post)}
          {/* {userProfilePictures[post._id] ? (
            <Image
              source={{ uri: userProfilePictures[post._id] }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder} />
          )} */}
          <View>
            <Text style={styles.username}>{post?.postedBy?.name}</Text>
            <Text style={styles.date}>
              {moment(post?.createdAt).format("DD-MM-YYYY")}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{post?.title}</Text>
        <Text>{post?.description}</Text>
        {post?.image && (
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.interactView}>
          <Pressable
            onPress={() =>
              userLikes[post?._id]?.userHasLiked
                ? handleUnlikePost(post?._id)
                : handleLikePost(post?._id)
            }
          >
            <MaterialIcons
              style={styles.icon}
              name={
                userLikes[post?._id]?.userHasLiked
                  ? "thumb-up"
                  : "thumb-up-off-alt"
              }
              size={24}
              color={userLikes[post?._id]?.userHasLiked ? "#800080" : "gray"}
            />
            <Text style={styles.iconLabel}>
              {userLikes[post?._id]?.count || 0} Likes
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("Comments", { postId: post._id })
            }
          >
            <MaterialIcons
              style={styles.icon}
              name="comment"
              size={24}
              color="gray"
            />
            <Text style={styles.iconLabel}>Comment</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("MessagePosts", { postId: post._id })
            }
          >
            <MaterialIcons
              style={styles.icon}
              name="share"
              size={24}
              color="gray"
            />
            <Text style={styles.iconLabel}>Share</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PostCardSingle;

const styles = StyleSheet.create({
  card: {
    width: "97%",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "gray",
    fontSize: 12,
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
    paddingBottom: 10,
    fontSize: 16,
  },
  postImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  interactView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  icon: {
    textAlign: "center",
  },
  iconLabel: {
    textAlign: "center",
    color: "gray",
  },
});
