import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For the filter icon
import axios from "axios";
import { AuthContext } from "../context/authContext";
import UserProfileCard from "../components/UserProfileCard";
import FooterMenu from "../components/Menus/FooterMenu";

const Network = () => {
  const [users, setUsers] = useState([]); // Users after applying filter
  const [recommendedUsers, setRecommendedUsers] = useState([]); // For displaying recommended users
  const [loading, setLoading] = useState(true); // Loading state for users
  const [state] = useContext(AuthContext); // User context state
  const [isFilterModalVisible, setFilterModalVisible] = useState(false); // For toggling filter modal
  const [filters, setFilters] = useState({
    skills: [],
    professionalBackground: { company: "", position: "", yearsOfExperience: 0 },
    educationalDetails: { degree: "", institution: "", yearOfGraduation: 0 },
  });
  const [originalUserList, setOriginalUserList] = useState([]); // Store original user list before applying filters

  const currentUserId = state.user?._id;

  // Fetch users and recommended users on load
  useEffect(async () => {
    if (currentUserId) {
      console.log("Current User ID:", currentUserId);

      // Fetch users excluding friends
      await axios
        .get("/auth/exclude-friends")
        .then((response) => {
          console.log("Users fetched successfully:", response.data);
          setUsers(response.data);
          setOriginalUserList(response.data); // Store the original unfiltered list
        })
        .catch((error) => {
          console.error(
            "Error fetching users:",
            error.response || error.message
          );
        });

      // Fetch recommended users based on similarity
      axios
        .post("/user/similar_users", { userId: currentUserId })
        .then((response) => {
          const userIds = response.data.similar_users;

          if (userIds.length > 0) {
            axios
              .post("/user/details", { userIds })
              .then((userDetailsResponse) => {
                setRecommendedUsers(userDetailsResponse.data);
                setLoading(false);
              })
              .catch((error) => {
                console.error(error);
                setLoading(false);
              });
          } else {
            setRecommendedUsers([]);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      console.error("Current user ID is not available.");
      setLoading(false);
    }
  }, [currentUserId]);

  // Handle adding a friend
  const handleAddFriend = (userId, updateButtonState) => {
    axios
      .put("/user/addFriend", { friendId: userId })
      .then(() => {
        console.log("Friend added successfully");
        updateButtonState(true, "Friend added successfully!");
      })
      .catch((error) => {
        console.error("Error adding friend:", error);
        updateButtonState(false, "Failed to add friend.");
      });
  };

  // Apply filters and fetch filtered users
  // Apply filters and fetch filtered users
  const applyFilters = () => {
    console.log("Applying filters:", filters);
    setFilterModalVisible(false);

    // Send filter request to the new API that returns only user IDs
    axios
      .post("/user/filter", filters)
      .then((response) => {
        console.log("Filtered users fetched successfully:", response.data);

        const filteredUserIds = response.data;

        // If there are filtered user IDs, fetch their details
        if (filteredUserIds.length > 0) {
          axios
            .post("/user/details", { userIds: filteredUserIds })
            .then((userDetailsResponse) => {
              setUsers(userDetailsResponse.data); // Update displayed users
            })
            .catch((error) => {
              console.error("Error fetching user details:", error);
              // If user details fetch fails, fall back to original user list
              setUsers(originalUserList);
            });
        } else {
          // If no users match the filters, show the original list
          console.log("No users found with the applied filters");
          setUsers(originalUserList);
        }
      })
      .catch((error) => {
        console.error(
          "Error applying filters:",
          error.response || error.message
        );
        // If there's an error applying filters, show the original list
        setUsers(originalUserList);
      });
  };

  // Clear filters and show original unfiltered user list
  const clearFilters = () => {
    setFilters({
      skills: [],
      professionalBackground: {
        company: "",
        position: "",
        yearsOfExperience: 0,
      },
      educationalDetails: { degree: "", institution: "", yearOfGraduation: 0 },
    });
    setUsers(originalUserList); // Reset to the original user list (exclude-friends)
  };

  // Show loading indicator if data is still loading
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Explore Users</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <MaterialIcons name="filter-list" size={20} color="white" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Display filtered users */}
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserProfileCard user={item} onAddFriend={handleAddFriend} />
        )}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.heading}>Recommended Users</Text>
      <FlatList
        data={recommendedUsers}
        renderItem={({ item }) => (
          <UserProfileCard user={item} onAddFriend={handleAddFriend} />
        )}
        horizontal
        keyExtractor={(item) => item._id}
      />

      {/* Footer Menu */}
      <View>
        <FooterMenu />
      </View>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Apply Filters</Text>

            {/* Skills */}
            <TextInput
              style={styles.input}
              placeholder="Enter skills (comma-separated)"
              onChangeText={(text) =>
                setFilters((prev) => ({
                  ...prev,
                  skills: text.split(",").map((skill) => skill.trim()),
                }))
              }
            />

            {/* Professional Background */}
            <TextInput
              style={styles.input}
              placeholder="Company"
              onChangeText={(text) =>
                setFilters((prev) => ({
                  ...prev,
                  professionalBackground: {
                    ...prev.professionalBackground,
                    company: text,
                  },
                }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Position"
              onChangeText={(text) =>
                setFilters((prev) => ({
                  ...prev,
                  professionalBackground: {
                    ...prev.professionalBackground,
                    position: text,
                  },
                }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Years of Experience"
              keyboardType="numeric"
              onChangeText={(text) =>
                setFilters((prev) => ({
                  ...prev,
                  professionalBackground: {
                    ...prev.professionalBackground,
                    yearsOfExperience: Number(text),
                  },
                }))
              }
            />

            {/* Educational Details */}
            <TextInput
              style={styles.input}
              placeholder="Degree"
              onChangeText={(text) =>
                setFilters((prev) => ({
                  ...prev,
                  educationalDetails: {
                    ...prev.educationalDetails,
                    degree: text,
                  },
                }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Institution"
              onChangeText={(text) =>
                setFilters((prev) => ({
                  ...prev,
                  educationalDetails: {
                    ...prev.educationalDetails,
                    institution: text,
                  },
                }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Year of Graduation"
              keyboardType="numeric"
              onChangeText={(text) =>
                setFilters((prev) => ({
                  ...prev,
                  educationalDetails: {
                    ...prev.educationalDetails,
                    yearOfGraduation: Number(text),
                  },
                }))
              }
            />

            <TouchableOpacity style={styles.modalButton} onPress={applyFilters}>
              <Text style={styles.modalButtonText}>Apply Filters</Text>
            </TouchableOpacity>

            {/* Clear Filter Button */}
            <TouchableOpacity
              style={[styles.modalButton, styles.clearButton]}
              onPress={clearFilters}
            >
              <Text style={styles.modalButtonText}>Clear Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.closeButton]}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15, // Added margin top for spacing
    marginBottom: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  filterButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  filterButtonText: {
    marginLeft: 5,
    color: "white",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: "100%",
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: "purple",
    padding: 10,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: "#999",
  },
  closeButton: {
    backgroundColor: "purple",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Network;
