import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import axios from "axios";

const ProjectDetailsBidder = ({ route }) => {
  const { project } = route.params;
  const [proposal, setProposal] = useState("");

  const handleSubmit = async () => {
    if (!proposal) {
      Alert.alert("Error", "Proposal cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `/proposal/new-proposal/${project._id}`,
        {
          proposal,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Alert.alert("Success", "Proposal submitted successfully!");
      setProposal(""); // Clear the input after successful submission
    } catch (error) {
      console.error("Failed to submit proposal", error);
      Alert.alert("Error", "Failed to submit proposal.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={100} // Adjust this offset according to your header height
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>Project Name</Text>
          <Text style={styles.title}>{project.name}</Text>
          <Text style={styles.description}>{project.description}</Text>
          <Text style={styles.detailTitle}>Duration</Text>
          <Text style={styles.description}>{project.duration}</Text>
          <Text style={styles.detailTitle}>Category</Text>
          <Text style={styles.description}>{project.category}</Text>
          {project.price && (
            <>
              <Text style={styles.detailTitle}>Price</Text>
              <Text style={styles.description}>${project.price}</Text>
            </>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your proposal"
            value={proposal}
            onChangeText={setProposal}
            multiline
          />

          {/* Updated Button to TouchableOpacity */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Proposal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  // description: {
  //   fontSize: 16,
  //   color: "#666",
  //   marginBottom: 20,
  // },
  inputContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    height: 100, // Increased height for multiline input
  },
  // detailBox: {
  //   backgroundColor: "#ffffff",
  //   padding: 15,
  //   borderRadius: 8,
  //   marginBottom: 20,
  // },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  detailBox: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#800080",
  },
  button: {
    backgroundColor: "#800080",
    padding: 15,
    borderRadius: 10,
    alignItems: "center", // Center the text horizontally
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ProjectDetailsBidder;
