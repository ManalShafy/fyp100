import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FooterMenu from "../components/Menus/FooterMenu";

const InterviewChecklistSplash = () => {
  const [designation, setDesignation] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // Track keyboard visibility
  const navigation = useNavigation();
  const categoryOption = ["Technical", "Behavioral"];
  const isButtonDisabled = !designation || !interviewType;
  const isFocused = useIsFocused();

  const reset = () => {
    setDesignation("");
    setInterviewType("");
  };

  useEffect(() => {
    if (isFocused) {
      reset();
    }
  }, [isFocused]);

  useEffect(() => {
    // Add keyboard event listeners
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    // Cleanup the listeners on unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>
          Kickstart Your Prep with the Ultimate Interview Checklist!
        </Text>
        <Image
          source={require("../../fypProject/assets/Exams-rafiki.png")}
          style={styles.img}
        />
        <View style={styles.containerP}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Designation"
            value={designation}
            onChangeText={setDesignation}
          />
          <Picker
            selectedValue={interviewType}
            style={styles.inputBox}
            onValueChange={(itemValue) => setInterviewType(itemValue)}
          >
            {categoryOption.map((interviewType) => (
              <Picker.Item
                label={
                  interviewType.charAt(0).toUpperCase() + interviewType.slice(1)
                }
                value={interviewType}
                key={interviewType}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity
            style={[styles.btn, isButtonDisabled && styles.btnDisabled]}
            onPress={() =>
              navigation.navigate("InterviewChecklist", {
                designation,
                interviewType,
              })
            }
            disabled={isButtonDisabled}
          >
            <Text style={styles.BtnText}>Generate Checklist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => navigation.navigate("PrepInterview")}
          >
            <Text style={styles.BtnText}>Interview Prep</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.container3}>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => navigation.navigate("Flashcards")}
          >
            <Text style={styles.BtnText}>Flashcards</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => navigation.navigate("QuizSplash")}
          >
            <Text style={styles.BtnText}>Take a Quiz</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      {/* Conditionally render FooterMenu based on keyboard visibility */}
      {!isKeyboardVisible && (
        <View style={styles.footerContainer}>
          <FooterMenu />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  containerP: {
    backgroundColor: "#800080",
    borderRadius: 20,
    width: "88%",
    height: "30%",
    alignItems: "center",
  },
  container2: {
    alignItems: "center",
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerContainer: {
    width: "100%",
    // Add any styling specific to the footer here if needed
  },
  btnDisabled: {
    backgroundColor: "gray",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 15,
  },
  inputBox: {
    backgroundColor: "white",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
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
