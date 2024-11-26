import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Modal,
  TouchableHighlight,
} from "react-native";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
import PostCard from "../components/PostCard";
// import InstagramIcon from "../assets/Instagram_icon.png.webp"; // Import the local Instagram icon
import { MaterialIcons } from "@expo/vector-icons"; // For the edit and more-vert icon
import UserProfile from "./UserProfile";

const UserProfileSearch = ({ navigation, route }) => {
  const [state] = useContext(AuthContext);
  //   const { user, currentUserId } = state;
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [totalPosts, setTotalPosts] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [friendsCount, setFriendsCount] = useState(0);
  const [instagramProfile, setInstagramProfile] = useState("");
  const [skills, setSkills] = useState([]);
  const [professionalBackground, setProfessionalBackground] = useState({});
  const [educationalDetails, setEducationalDetails] = useState({});
  //   const [isMentor, setIsMentor] = useState(false); // State to track mentor status
  //   const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const { userId } = route.params;

  useEffect(() => {
    fetchUserDetails();
    getUserPosts();
    fetchRatings();
    fetchFriendsCount();
    fetchUser();
    // checkMentorStatus(); // Check if user is a mentor
  }, []);

  // Check if the user is a mentor
  //   const checkMentorStatus = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get("/mentor/get-mentor");
  //       console.log("Mentor Response:", response.data);

  //       // Check mentor existence and update state
  //       if (response.data.success && response.data.mentor) {
  //         setIsMentor(true);
  //       } else {
  //         setIsMentor(false);
  //       }
  //     } catch (error) {
  //       console.error("Error checking mentor status:", error);
  //       setIsMentor(false); // Default to false on error
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(`/user/user-details-id/${userId}`);
      setUserDetails(data);
      console.log("userdeets", userDetails);
      setInstagramProfile(data.socialMediaProfiles.instagram || "");
      setSkills(data.skills || []);
      setProfessionalBackground(data.professionalBackground || {});
      setEducationalDetails(data.educationalDetails || {});
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/auth/user-profile/${userId}`);
      console.log("userdeetsuserdata", data.user.profilePicture);
      setUsers(data.user);
      //   console.log("userdeetsuser", user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/post/get-post-id/${userId}`);
      setLoading(false);
      setPosts(data?.userPosts || []);
      setTotalPosts(data?.userPosts.length || 0);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert("Error fetching posts");
    }
  };

  // Fetch ratings for the current user
  const fetchRatings = async () => {
    try {
      const { data } = await axios.get(`/rating/get-ratings/${userId}`);
      console.log("Ratings Response:", data);
      setAverageRating(data.averageRating);
      const userRatingData = data.ratings
        .find
        // (r) => r.raterId._id === currentUserId
        ();
      setUserRating(userRatingData ? userRatingData.rating : null);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      //   Alert.alert("Failed to load ratings");
    }
  };

  const fetchFriendsCount = async () => {
    try {
      const friendsRes = await axios.get(`/user/friends-id/${userId}`);
      console.log("Friends Response:", friendsRes.data); // Log the response
      setFriendsCount(friendsRes?.data?.friends?.length || 0); // Count friends based on the length of the array
    } catch (error) {
      console.error("Error fetching friends count:", error);
    }
  };

  const openInstagramProfile = () => {
    const url = instagramProfile.startsWith("http")
      ? instagramProfile
      : `https://${instagramProfile}`;
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL:", err);
      Alert.alert("Error", "Unable to open Instagram profile");
    });
  };

  // Handle the three-dot menu click (show modal with options)
  //   const handleMenuClick = () => {
  //     setModalVisible(true); // Show options modal
  //   };

  // Handle the option selection
  //   const handleOptionSelect = (option) => {
  //     setModalVisible(false); // Close modal
  //     if (option === "mentorDashboard") {
  //       // Navigate to Mentor Dashboard if user is a mentor
  //       navigation.navigate("Mentor");
  //     } else if (option === "registerMentor") {
  //       // Navigate to Register as Mentor if user is not a mentor
  //       navigation.navigate("RegisterMentor");
  //     }
  //   };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          {/* Three-dot menu button */}
          {/* <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="person" size={24} color="gray" />
          </TouchableOpacity> */}

          {/* Edit icon at top right */}
          {/* <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate("Account")}
          >
            <MaterialIcons name="edit" size={24} color="gray" />
          </TouchableOpacity> */}

          {/* User profile picture */}
          {/* <Image
            source={{ uri: user.profilePicture }}
            style={styles.profileImage}
          /> */}
          {users && console.log("profile", users.profilePicture)}
          {users && (
            <Image
              source={{ uri: users.profilePicture }}
              style={styles.profileImage}
            />
          )}
          {users && <Text style={styles.sectionHeading}>{users.name}</Text>}

          <View style={styles.userStats}>
            <View style={styles.userStat}>
              <Text style={styles.userStatText}>{totalPosts}</Text>
              <Text style={styles.userStatHeading}>Posts</Text>
            </View>
            <View style={styles.userStat}>
              <Text style={styles.userStatText}>
                {averageRating.toFixed(2)}
              </Text>
              <Text style={styles.userStatHeading}>Rating</Text>
            </View>
            <View style={styles.userStat}>
              <Text style={styles.userStatText}>{friendsCount}</Text>
              <Text style={styles.userStatHeading}>Friends</Text>
            </View>
          </View>

          {/* Instagram profile link */}
          <TouchableOpacity
            onPress={openInstagramProfile}
            style={styles.instagramContainer}
          >
            {/* <Image source={InstagramIcon} style={styles.instagramIcon} /> */}
          </TouchableOpacity>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))
            ) : (
              <Text>No skills added yet.</Text>
            )}
          </View>
        </View>

        {/* Professional Background Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Professional Background</Text>
          <Text style={styles.infoText}>
            Company: {professionalBackground.company || "N/A"}
          </Text>
          <Text style={styles.infoText}>
            Position: {professionalBackground.position || "N/A"}
          </Text>
          <Text style={styles.infoText}>
            Years of Experience:{" "}
            {professionalBackground.yearsOfExperience || "N/A"}
          </Text>
        </View>

        {/* Educational Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Educational Details</Text>
          <Text style={styles.infoText}>
            Degree: {educationalDetails.degree || "N/A"}
          </Text>
          <Text style={styles.infoText}>
            Institution: {educationalDetails.institution || "N/A"}
          </Text>
          <Text style={styles.infoText}>
            Year of Graduation: {educationalDetails.yearOfGraduation || "N/A"}
          </Text>
        </View>

        {/* User's Posts */}
        <Text style={styles.heading}>Posts</Text>
        <PostCard posts={posts} />
      </ScrollView>

      {/* Footer Menu */}
      <FooterMenu />

      {/* Modal for three-dot options */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      > */}
      {/* <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableHighlight
              onPress={() =>
                handleOptionSelect(
                  isMentor ? "mentorDashboard" : "registerMentor"
                )
              }
            >
              <Text style={styles.modalOption}>
                {isMentor ? "Mentor Dashboard" : "Register as Mentor"}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setModalVisible(false)}>
              <Text style={styles.modalOption}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  editIcon: {
    position: "absolute",
    top: 10,
    right: 40,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  userStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    width: "100%",
  },
  userStat: {
    alignItems: "center",
  },
  userStatText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userStatHeading: {
    fontSize: 14,
    color: "gray",
  },
  instagramContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  instagramIcon: {
    width: 20,
    height: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillChip: {
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 16,
    margin: 5,
  },
  skillText: {
    fontSize: 14,
    color: "gray",
  },
  infoText: {
    fontSize: 14,
    color: "gray",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 10,
  },
});

export default UserProfileSearch;
