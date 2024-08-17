import React, { useContext, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditJobModal from "./EditJobModal";
import { JobContext } from "../context/jobContext";

const JobCard = ({ jobs, myJobScreen }) => {
  const [setJobs, getAllJob] = useContext(JobContext);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [job, setJob] = useState({});
  const navigation = useNavigation();

  const handleDeletePrompt = (id) => {
    Alert.alert("Attention!", "Are you sure you want to delete this job?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel press"),
      },
      {
        text: "Delete",
        onPress: () => handleDeleteJob(id),
      },
    ]);
  };

  const handleDeleteJob = async (id) => {
    try {
      setLoading(true);
      console.log("Deleting job");
      const { data } = await axios.delete(`/job/delete-job/${id}`);
      setLoading(false);
      alert(data?.message);
      getAllJob(); // Refresh the job list
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.message);
    }
  };

  const handleOpenPdf = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
      alert("Failed to open the document");
    }
  };

  const navigateToJobDetails = (job) => {
    navigation.navigate("JobDetailsEmployer", { job });
  };

  return (
    <View>
      {myJobScreen && (
        <EditJobModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          job={job}
          setJob={setJob}
        />
      )}
      {jobs?.map((job, i) => (
        <TouchableOpacity
          key={i}
          style={styles.card}
          onPress={() => navigateToJobDetails(job)}
        >
          {myJobScreen && (
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>
                <FontAwesome5
                  name="pen"
                  size={16}
                  color={"darkblue"}
                  onPress={() => {
                    setJob(job);
                    setModalVisible(true);
                  }}
                />
              </Text>
              <Text style={styles.actionText}>
                <FontAwesome5
                  name="trash"
                  size={16}
                  color={"red"}
                  onPress={() => handleDeletePrompt(job?._id)}
                />
              </Text>
            </View>
          )}
          <View style={styles.footer}>
            <Text style={styles.footTxt}>
              <FontAwesome5
                style={styles.icon}
                name="briefcase"
                color={"rebeccapurple"}
              />{" "}
              {job?.title}
            </Text>
            <Text style={styles.dateText}>
              {moment(job?.createdAt).format("DD-MM-YYYY")}
            </Text>
          </View>
          <Text style={styles.title}>{job?.description}</Text>
          <Text style={styles.details}>
            <FontAwesome5
              style={styles.icon}
              name="video"
              color={job?.videoRequired ? "green" : "red"}
            />{" "}
            Video Required: {job?.videoRequired ? "Yes" : "No"}
          </Text>
          <Text style={styles.details}>
            <FontAwesome5
              style={styles.icon}
              name="tag"
              color={job?.status === "active" ? "blue" : "grey"}
            />{" "}
            Status: {job?.status}
          </Text>
          {job?.descriptionFileUrl && (
            <Pressable onPress={() => handleOpenPdf(job?.descriptionFileUrl)}>
              <Text style={styles.pdfText}>
                <FontAwesome5 name="file-pdf" size={14} color={"grey"} /> View
                PDF
              </Text>
            </Pressable>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionText: {
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  footTxt: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    marginVertical: 10,
    color: "#333",
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  pdfText: {
    color: "blue",
    marginTop: 10,
  },
  dateText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});

export default JobCard;
