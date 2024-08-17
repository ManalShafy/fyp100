import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const interviewChecklist = () => {
  const route = useRoute();
  const { designation, interviewType } = route.params;
  const [checklist, setChecklist] = useState();
  const navigation = useNavigation();

  const fetchResponse = async () => {
    setDesignation("");
    setInterviewType("");
    setChecklist(null);
    try {
      console.log(designation, interviewType);
      const response = await axios.post(
        "/interviewChecklist/generate-interview-checklist",
        { designation: designation, interview_type: interviewType }
      );
      console.log(response.data);
      setChecklist(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  const handleGenerateNew = () => {
    // Clear all fields and checklist
    setDesignation("");
    setInterviewType("");
    setChecklist(null);
  };

  const renderChecklist = () => {
    if (typeof checklist === "string") {
      return <Text>{checklist}</Text>;
    } else if (typeof checklist === "object" && checklist !== null) {
      return Object.keys(checklist).map((key) => (
        <View key={key} style={styles.resultItem}>
          <Text style={styles.resultKey}>{key}:</Text>
          <Text style={styles.resultValue}>{checklist[key]}</Text>
        </View>
      ));
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Interview Checklist</Text>
        {/* <TextInput
          style={styles.inputBox}
          placeholder="Enter Designation"
          value={designation}
          onChangeText={setDesignation}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Type of Interview"
          value={interviewType}
          onChangeText={setInterviewType}
        /> */}
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate("interviewChecklist", {
                designation: designation,
                interviewType: interviewType,
              })
            }
          >
            <Text style={styles.BtnText}>Generate Checklist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("interviewChecklistSplash")}
          >
            <Text style={styles.BtnText}>Generate New</Text>
          </TouchableOpacity>
        </View>
        {checklist ? (
          <ScrollView style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Checklist:</Text>
            {renderChecklist()}
          </ScrollView>
        ) : null}
      </ScrollView>

      {/* <View style={styles.container3}>
        <TouchableOpacity
          style={styles.btn2}
          onPress={() => navigation.navigate("flashcards")}
        >
          <Text style={styles.BtnText}>Flashcards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn2}
          onPress={() => navigation.navigate("quizSplash")}
        >
          <Text style={styles.BtnText}>Take a Quiz</Text>
        </TouchableOpacity>
      </View> */}

      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  container2: {
    alignItems: "center",
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputBox: {
    backgroundColor: "#e6e6fa",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  resultContainer: {
    marginTop: 16,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    padding: 16,
    margin: 16,
    width: "93%",
    maxHeight: 500, // Fixed max height
    height: "auto", // Adjust the height as per your requirement
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resultItem: {
    marginBottom: 8,
  },
  resultKey: {
    fontWeight: "bold",
  },
  resultValue: {
    marginLeft: 8,
    fontSize: 20,
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
  btn2: {
    backgroundColor: "#800080",
    width: 140,
    marginTop: 30,
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
});

export default interviewChecklist;
