import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Clipboard from "expo-clipboard";

const ComplaintCell = () => {
  const [complaint, setComplaint] = useState("");
  const [chatId, setChatId] = useState("");
  const [trackingNumber, setTrackingNumber] = useState(""); // State to store the tracking number
  const [searchTrackingNumber, setSearchTrackingNumber] = useState(""); // For fetching details
  const [complaintDetails, setComplaintDetails] = useState(null); // Complaint details

  const handleSubmit = async () => {
    if (!complaint) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const chatId = await AsyncStorage.getItem("chatId");
      setChatId(chatId);
      const response = await axios.post("/complaintcell/create-complaints", {
        complaint,
        chatId,
      });

      const { trackingNumber } = response.data;
      setTrackingNumber(trackingNumber); // Save tracking number to state

      Alert.alert(
        "Success",
        `Complaint submitted. Tracking ID: ${trackingNumber}`
      );
      setComplaint(""); // Clear the input
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit complaint. Please try again.");
    }
  };

  const handleCopyTrackingID = () => {
    Clipboard.setString(trackingNumber); // Copy tracking ID to clipboard
    Alert.alert("Copied", "Tracking ID copied to clipboard!");
  };

  const handleFetchComplaint = async () => {
    if (!searchTrackingNumber) {
      Alert.alert("Error", "Please enter a tracking ID.");
      return;
    }

    try {
      const response = await axios.get(
        `/complaintcell/get-complaint/${searchTrackingNumber}`
      );
      setComplaintDetails(response.data.complaint); // Set fetched complaint details
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch complaint details. Try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Submit a Complaint</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your complaint"
          value={complaint}
          onChangeText={setComplaint}
          multiline
          numberOfLines={2}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Complaint</Text>
        </TouchableOpacity>

        {trackingNumber ? (
          <View style={styles.trackingContainer}>
            <Text style={styles.trackingText}>
              Your Tracking ID: {trackingNumber}
            </Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopyTrackingID}
            >
              <Text style={styles.copyButtonText}>Copy Tracking ID</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.separator} />

        <Text style={styles.title}>Track a Complaint</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your tracking ID"
          value={searchTrackingNumber}
          onChangeText={setSearchTrackingNumber}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={handleFetchComplaint}>
          <Text style={styles.buttonText}>Track Complaint Details</Text>
        </TouchableOpacity>

        {complaintDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Complaint Details</Text>
            <Text style={styles.detailsText}>
              Complaint: {complaintDetails.complaint}
            </Text>
            <Text style={styles.detailsText}>
              Status: {complaintDetails.status}
            </Text>
            <Text style={styles.detailsText}>
              Submitted At:{" "}
              {new Date(complaintDetails.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    //flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#800080",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  trackingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  trackingText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  copyButton: {
    backgroundColor: "#28A745",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    backgroundColor: "#ddd",
  },
  detailsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
});

export default ComplaintCell;
