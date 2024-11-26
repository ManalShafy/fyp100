import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FooterMenu from "../components/Menus/FooterMenu";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import icon library

const PrepInterview = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Kickstart Your Prep with the Ultimate Interview Checklist!
      </Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("flashcards")}
      >
        <Icon name="book" size={30} color="#fff" />
        <Text style={styles.optionText}>Flashcards</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("quizSplash")}
      >
        <Icon name="question-circle" size={30} color="#fff" />
        <Text style={styles.optionText}>Take a Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("VideoPractice")}
      >
        <Icon name="video-camera" size={30} color="#fff" />
        <Text style={styles.optionText}>Practice Video</Text>
      </TouchableOpacity>

      {/* <View style={styles.containerEnd}>
        <FooterMenu />
      </View> */}
      <View style={styles.footerContainer}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default PrepInterview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  footerContainer: {
    width: "100%",
    // Add any styling specific to the footer here if needed
  },
  option: {
    backgroundColor: "#800080",
    width: "40%", // Adjust the size of the square
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  containerEnd: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});
