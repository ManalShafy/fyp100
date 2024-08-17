import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FooterMenu from "../../components/Menus/FooterMenu";

const leadPositionKeywords = [
  "lead",
  "manager",
  "director",
  "supervisor",
  "chief",
  "head",
  "senior",
  "principle",
];

const RegisterMentor = () => {
  const [skill, setSkills] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [yearsOfExperience, setExperience] = useState("");

  const handleRegister = async () => {
    // Check if the job position contains keywords for lead positions
    const isLeadPosition = leadPositionKeywords.some((keyword) =>
      jobPosition.toLowerCase().includes(keyword)
    );

    // Convert experience to a number
    const experienceYears = parseInt(yearsOfExperience);

    // Check if the user is applying for a lead position and has experience greater than 10 years
    if (isLeadPosition && experienceYears > 10) {
      try {
        const { data } = await axios.post("/mentor/mentor-register", {
          skill,
          jobPosition,
          yearsOfExperience,
        });
        alert(data && data.message);
        navigation.navigate("Home");
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      // Inform the user that they are not eligible to register as a mentor
      alert("You are not eligible to register as a mentor");
    }
  };

  const handleReset = () => {
    setSkills("");
    setJobPosition("");
    setExperience("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register as Mentor</Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Skills</Text>
        <TextInput
          style={styles.inputBox}
          value={skill}
          onChangeText={setSkills}
        />
        <Text style={{ fontWeight: "bold" }}>Job Position</Text>
        <TextInput
          style={styles.inputBox}
          value={jobPosition}
          onChangeText={setJobPosition}
        />
        <Text style={{ fontWeight: "bold" }}>Experience</Text>
        <TextInput
          style={styles.inputBox}
          value={yearsOfExperience}
          onChangeText={setExperience}
          keyboardType="numeric"
        />
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            disabled={!skill || !jobPosition || !yearsOfExperience}
            onPress={handleRegister}
            style={styles.btn}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleReset} style={styles.btn}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container2}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default RegisterMentor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container2: {
    flex: 1,
    justifyContent: "flex-end",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    width: 350,
    paddingLeft: 10,
    color: "gray",
    borderColor: "#800080",
    borderWidth: 2,
  },
  btn: {
    backgroundColor: "#800080",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "blue",
    fontWeight: "bold",
  },
});
