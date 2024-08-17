import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const JobDetailsApplicant = ({ route }) => {
  const { job } = route.params;
  const [name, setName] = useState("");
  const [resume, setResume] = useState(null);
  const [video, setVideo] = useState(null);

  //   const pickDocument = async () => {
  //     let result = await DocumentPicker.getDocumentAsync({
  //       type: "application/pdf",
  //     });

  //     if (result.type === "success") {
  //       console.log("Picked document:", result); // Debugging log
  //       setResume({
  //         uri: result.uri,
  //         name: result.name,
  //         type: "application/pdf",
  //       });
  //     } else {
  //       Alert.alert("Error", "Failed to pick the document.");
  //     }
  //   };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    console.log("DocumentPicker result:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri, name, mimeType } = result.assets[0];
      setResume({ uri, name, type: mimeType });
      console.log("Picked file:", { uri, name, type: mimeType });
    } else {
      Alert.alert("Error", "Failed to pick the document.");
    }
  };

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 60, // 1 minute
    });

    console.log("ImagePicker result:", result); // Debugging log

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      setVideo({
        uri: uri,
        name: uri.split("/").pop(),
        type: "video/mp4", // assuming mp4, adjust based on actual file type
      });
      console.log("Picked video:", {
        uri,
        name: uri.split("/").pop(),
        type: "video/mp4",
      });
    } else {
      Alert.alert("Error", "Failed to pick the video.");
    }
  };

  //   const pickVideo = async () => {
  //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("Sorry, we need camera roll permissions to make this work!");
  //       return;
  //     }

  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  //       allowsEditing: true,
  //       quality: 1,
  //       videoMaxDuration: 60, // 1 minute
  //     });

  //     if (!result.canceled) {
  //       console.log("Picked video:", result); // Debugging log
  //       setVideo({
  //         uri: result.uri,
  //         name: result.uri.split("/").pop(),
  //         type: "video/mp4", // assuming mp4, adjust based on actual file type
  //       });
  //     } else {
  //       Alert.alert("Error", "Failed to pick the video.");
  //     }
  //   };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("jobId", job._id);
    if (resume) {
      formData.append("resume", {
        uri: resume.uri,
        name: resume.name,
        type: resume.type,
      });
    } else {
      console.log("No resume selected");
    }
    if (video) {
      formData.append("video", {
        uri: video.uri,
        name: video.name,
        type: video.type,
      });
    } else {
      console.log("No video selected");
    }
    console.log("form data", formData);

    try {
      await axios.post(`applicant/upload-applicant/${job._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 300000, // 5 minut
      });
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Failed to submit application", error);
      alert("Failed to submit application");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.description}>{job.description}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity onPress={pickDocument}>
          <Text style={styles.uploadButton}>Upload Resume (PDF)</Text>
        </TouchableOpacity>

        {job.videoRequired && (
          <TouchableOpacity onPress={pickVideo}>
            <Text style={styles.uploadButton}>Upload Video</Text>
          </TouchableOpacity>
        )}

        <Button title="Submit Application" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
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
  },
  uploadButton: {
    color: "#800080",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default JobDetailsApplicant;
