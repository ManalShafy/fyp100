import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const JobDetailsEmployer = ({ route }) => {
  const { job } = route.params;
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const { data } = await axios.get(`/job/applicants/${job._id}`);
        setApplicants(data.applicants);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch applicants");
      }
    };

    fetchApplicants();
  }, [job]);

  const renderApplicant = ({ item }) => (
    <View style={styles.applicantCard}>
      <Text style={styles.applicantName}>Name: {item.name}</Text>
      <Text style={styles.applicantDetail}>
        Performance Score: {item.performanceScore}
      </Text>
      <Text style={styles.applicantDetail}>
        Similarity Score: {item.similarityScore}
      </Text>
      {item.resumeUrl && (
        <TouchableOpacity onPress={() => handleOpenPdf(item.resumeUrl)}>
          <Text style={styles.pdfText}>
            <FontAwesome5 name="file-pdf" size={14} color={"grey"} /> View
            Resume
          </Text>
        </TouchableOpacity>
      )}
      {item.videoUrl && (
        <TouchableOpacity onPress={() => handlePlayVideo(item.videoUrl)}>
          <Text style={styles.pdfText}>
            <FontAwesome5 name="video" size={14} color={"grey"} /> Watch Video
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const handleOpenPdf = (url) => {
    Linking.openURL(url).catch(() => alert("Failed to open URL"));
  };

  const handlePlayVideo = (url) => {
    Linking.openURL(url).catch(() => alert("Failed to open URL"));
  };

  return (
    <View style={styles.fullScreen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.detailBox}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.description}>{job.description}</Text>
          <Text style={styles.detailTitle}>Video Required</Text>
          <Text style={styles.description}>
            {job.videoRequired ? "Yes" : "No"}
          </Text>
          <Text style={styles.detailTitle}>Status</Text>
          <Text style={styles.description}>{job.status}</Text>
        </View>
        <Text style={styles.sectionTitle}>Applicants</Text>
        <FlatList
          data={applicants}
          renderItem={renderApplicant}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
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
  detailBox: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#800080",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  applicantCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  applicantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  applicantDetail: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  pdfText: {
    color: "blue",
    marginTop: 10,
  },
});

export default JobDetailsEmployer;
