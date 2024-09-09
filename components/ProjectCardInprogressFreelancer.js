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
import EditProjectModal from "../components/EditProjectModel";
import { ProjectContext } from "../context/projectContext";

const ProjectCardInprogressFreelancer = ({ projects, myProjectScreen }) => {
  const [setProjects, getAllProjects] = useContext(ProjectContext);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [project, setProject] = useState({});
  const navigation = useNavigation();

  const handleDeletePrompt = (id) => {
    Alert.alert("Attention!", "Are you sure you want to delete this project?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel press"),
      },
      {
        text: "Delete",
        onPress: () => handleDeleteProject(id),
      },
    ]);
  };

  const handleDeleteProject = async (id) => {
    try {
      setLoading(true);
      console.log("Deleting project");
      const { data } = await axios.delete(`/project/delete-project/${id}`);
      setLoading(false);
      alert(data?.message);
      getAllProjects(); // Refresh the project list
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.message);
    }
  };

  //   const navigateToProjectDetails = (project) => {
  //     navigation.navigate("ProjectDetailsClient", { project });
  //   };

  return (
    <View>
      {myProjectScreen && (
        <EditProjectModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          project={project}
          setProject={setProject}
        />
      )}
      {projects?.map((project, i) => (
        <TouchableOpacity
          key={i}
          style={styles.card}
          //   onPress={() => navigateToProjectDetails(project)}
        >
          {myProjectScreen && (
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>
                <FontAwesome5
                  name="pen"
                  size={16}
                  color={"darkblue"}
                  onPress={() => {
                    setProject(project);
                    setModalVisible(true);
                  }}
                />
              </Text>
              <Text style={styles.actionText}>
                <FontAwesome5
                  name="trash"
                  size={16}
                  color={"red"}
                  onPress={() => handleDeletePrompt(project?._id)}
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
              {project?.name}
            </Text>
            <Text style={styles.dateText}>
              {moment(project?.createdAt).format("DD-MM-YYYY")}
            </Text>
          </View>
          <Text style={styles.title}>{project?.description}</Text>
          <Text style={styles.details}>
            <FontAwesome5 style={styles.icon} name="clock" color={"grey"} />{" "}
            Duration: {project?.duration}
          </Text>
          <Text style={styles.details}>
            <FontAwesome5
              style={styles.icon}
              name="dollar-sign"
              color={"green"}
            />{" "}
            Price: ${project?.price}
          </Text>
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
  dateText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});

export default ProjectCardInprogressFreelancer;
