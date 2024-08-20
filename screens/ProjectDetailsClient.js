import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import FooterMenu from "../components/Menus/FooterMenu"; // Ensure the path is correct

const ProjectDetailsClient = ({ route }) => {
  const { project } = route.params;
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const { data } = await axios.get(
          `/project/get-proposals-project/${project._id}`
        );
        setProposals(data.proposals);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch proposals");
      }
    };

    fetchProposals();
  }, [project]);

  //   const selectFreelancer = async (proposalId) => {
  //     try {
  //       await axios.post(
  //         `/project/select-freelancer/${project._id}/${proposalId}`
  //       );
  //       alert("Freelancer selected successfully!");
  //       // Optionally, you can refresh the project details or proposals list
  //     } catch (error) {
  //       console.log(error);
  //       alert("Failed to select freelancer");
  //     }
  //   };

  const selectFreelancer = async (proposalId) => {
    try {
      await axios.post(
        `/project/select-freelancer/${project._id}/${proposalId}`
      );
      alert("Freelancer selected successfully!");
      // Optionally, you can refresh the project details or proposals list
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "Freelancer Selected"
      ) {
        alert("Freelancer already selected");
      } else {
        console.log(error);
        alert("Failed to select freelancer");
      }
    }
  };

  const renderProposal = ({ item }) => (
    <View style={styles.proposalCard}>
      <Text style={styles.proposalTitle}>
        Freelancer Name: {item.freelancerName || "Unknown"}
      </Text>
      <Text style={styles.proposalTitle}>Proposal:</Text>
      <Text style={styles.proposalDetail}>{item.proposal}</Text>
      <Text style={styles.proposalTitle}>Similarity Score:</Text>
      <Text style={styles.proposalDetail}>{item.similarityScore}</Text>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => selectFreelancer(item._id)}
      >
        <Text style={styles.selectButtonText}>Select Freelancer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.fullScreen}>
      <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.sectionTitle}>Proposals</Text>
          <FlatList
            data={proposals}
            renderItem={renderProposal}
            keyExtractor={(item) => item._id}
          />
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
  proposalCard: {
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
  proposalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  proposalDetail: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  selectButton: {
    marginTop: 10,
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  selectButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProjectDetailsClient;
