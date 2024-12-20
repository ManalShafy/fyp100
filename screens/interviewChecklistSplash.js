import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import FooterMenu from "../components/Menus/FooterMenu";
import { useNavigation } from "@react-navigation/native";

const InterviewChecklistSplash = () => {
  const [designation, setDesignation] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [checklist, setChecklist] = useState(null);
  const navigation = useNavigation();

  // const handleSubmit = async () => {
  //   try {
  //     console.log(designation, interviewType);
  //     const response = await axios.post(
  //       "/interviewChecklist/generate-interview-checklist",
  //       { designation: designation, interview_type: interviewType }
  //     );
  //     console.log(response.data);
  //     setChecklist(response.data);
  //   } catch (error) {
  //     console.error(error.response?.data || error.message);
  //   }
  // };

  // const handleGenerateNew = () => {
  //   // Clear all fields and checklist
  //   setDesignation("");
  //   setInterviewType("");
  //   setChecklist(null);
  // };

  // const renderChecklist = () => {
  //   if (typeof checklist === "string") {
  //     return <Text>{checklist}</Text>;
  //   } else if (typeof checklist === "object" && checklist !== null) {
  //     return Object.keys(checklist).map((key) => (
  //       <View key={key} style={styles.resultItem}>
  //         <Text style={styles.resultKey}>{key}:</Text>
  //         <Text style={styles.resultValue}>{checklist[key]}</Text>
  //       </View>
  //     ));
  //   }
  //   return null;
  // };

  return (
    <View style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.container}> */}
      <Text style={styles.title}>Interview Checklist</Text>
      <Image
        source={require("../../fypProject/assets/Exams-rafiki.png")}
        style={styles.img}
      />
      <TextInput
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
      />
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
      </View>

      {/* <TouchableOpacity style={styles.btn} onPress={handleGenerateNew}>
            <Text style={styles.BtnText}>Generate New</Text>
          </TouchableOpacity>
        
        {checklist ? (
          <ScrollView style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Checklist:</Text>
            {renderChecklist()}
          </ScrollView>
        ) : null}
      </ScrollView> */}

      <View style={styles.container3}>
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
      </View>
      <View style={styles.containerEnd}>
        <TouchableOpacity
          style={styles.btn2}
          onPress={() => navigation.navigate("VideoPractice")}
        >
          <Text style={styles.BtnText}>Practice Video</Text>
        </TouchableOpacity>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerEnd: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
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
    height: 500,
    maxHeight: 500, // Adjust the height as per your requirement
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
    margin: 10,
  },
  BtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  img: {
    height: 250,
    width: 250,
  },
});

export default InterviewChecklistSplash;
