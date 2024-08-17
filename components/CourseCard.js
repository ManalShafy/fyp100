import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CourseCard = ({ course, navigation }) => {
  const handlePress = (selectedCourse) => {
    // Navigate to CourseDetails screen with the selectedCourse details
    navigation.navigate("CourseDetails", { course: selectedCourse });
  };

  return (
    <View>
      {course?.map((course, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handlePress(course)}
          style={styles.card}
        >
          <Text style={styles.title}>{course?.title}</Text>
          <Text style={styles.duration}>{course?.duration}</Text>
          <Text style={styles.type}>{course?.type}</Text>
          {course?.type === "paid" && (
            <Text style={styles.amount}>${course?.amount}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white", // A pastel lilac color (lighter variant)
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  duration: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});
