import React, { useState } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av"; // Correct import
import axios from "axios";
import FooterMenu from "../components/Menus/FooterMenu";

const VideoPractice = () => {
  const [video, setVideo] = useState(null);
  const [performanceScore, setPerformanceScore] = useState(null);
  const [loading, setLoading] = useState(false);

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

    if (!result.canceled) {
      setVideo(result.assets[0].uri); // Update to use correct property
    }
  };

  const uploadVideo = async () => {
    if (!video) {
      alert("Please select a video first");
      return;
    }

    const formData = new FormData();
    formData.append("video", {
      uri: video,
      name: "upload.mp4",
      type: "video/mp4",
    });

    try {
      setLoading(true);
      const response = await axios.post("/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPerformanceScore(response.data.video.performanceScore);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading video:", error.message);
      setLoading(false);
      alert("Failed to upload video");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interview Checklist</Text>
      <TouchableOpacity style={styles.btn} onPress={pickVideo}>
        <Text style={styles.BtnText}>Pick a video</Text>
      </TouchableOpacity>
      {video && (
        <Video
          source={{ uri: video }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
        />
      )}
      <TouchableOpacity
        style={styles.btn}
        onPress={uploadVideo}
        disabled={loading}
      >
        <Text style={styles.BtnText}>Upload video</Text>
      </TouchableOpacity>
      {loading && <Text>Uploading...</Text>}
      {performanceScore !== null && (
        <Text>Performance Score: {performanceScore}</Text>
      )}
      <View style={styles.containerEnd}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  video: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  btn: {
    backgroundColor: "#800080",
    width: 300,
    marginTop: 15,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  BtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerEnd: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default VideoPractice;
