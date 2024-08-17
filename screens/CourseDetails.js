import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import FooterMenu from "../components/Menus/FooterMenu"; // Ensure the path is correct

const CourseDetails = ({ route, navigation }) => {
  const { course } = route.params;

  const handleRegister = () => {
    // Add registration logic here
    console.log("Register for the course");
  };

  return (
    <View style={styles.fullScreen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.combinedDetailBox}>
          <Text style={styles.title}>{course.title}</Text>
          {course.imageUri && (
            <Image source={{ uri: course.imageUri }} style={styles.image} />
          )}
          <Text style={styles.detailTitle}>Description</Text>
          <Text style={styles.description}>{course.description}</Text>
          <Text style={styles.detailTitle}>Duration</Text>
          <Text style={styles.description}>{course.duration}</Text>
          <Text style={styles.detailTitle}>Type</Text>
          <Text style={styles.description}>{course.type}</Text>
          {course.type === "paid" && (
            <>
              <Text style={styles.detailTitle}>Price</Text>
              <Text style={styles.description}>${course.amount}</Text>
            </>
          )}
          {course.updatedBy && (
            <>
              <Text style={styles.detailTitle}>Mentor</Text>
              <Text style={styles.description}>{course.updatedBy.name}</Text>
            </>
          )}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Register Course</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#f0f0f0",
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
  registerButton: {
    marginTop: 20,
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: "center",
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CourseDetails;
