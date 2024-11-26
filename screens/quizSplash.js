import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FooterMenu from "../components/Menus/FooterMenu";
import { Picker } from "@react-native-picker/picker";

const quizSplash = () => {
  const [designation, setDesignation] = useState();
  const [difficulty, setDifficulty] = useState();
  const navigation = useNavigation();
  const categoryOption = ["Easy", "Medium", "Difficult"];
  const isFocused = useIsFocused();

  const reset = () => {
    // Clear all fields and checklist
    setDesignation("");
    setDifficulty("");
  };

  useEffect(() => {
    if (isFocused) {
      reset();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Quiz</Text> */}
      <Image
        source={require("../../fypProject/assets/Exams-rafiki.png")}
        style={styles.img}
      />

      <View style={styles.container3}>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Designation for Quiz"
          value={designation}
          onChangeText={setDesignation}
        />
        <Picker
          selectedValue={difficulty}
          style={styles.inputBox}
          onValueChange={(itemValue) => setDifficulty(itemValue)}
        >
          {categoryOption.map((difficulty) => (
            <Picker.Item
              label={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              value={difficulty}
              key={difficulty}
            />
          ))}
        </Picker>
        {/* <TextInput
          style={styles.inputBox}
          placeholder="Enter Difficulty level"
          value={difficulty}
          onChangeText={setDifficulty}
        /> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("quiz", {
              designation: designation,
              difficulty: difficulty,
            })
          }
          disabled={!designation || !difficulty}
        >
          <Text style={styles.BtnText}> Let's get Started</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default quizSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },

  container3: {
    width: "90%",
    height: "28%",
    // marginTop: 20,
    backgroundColor: "#800080",
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: 300,
  },

  inputBox: {
    backgroundColor: "white",
    // backgroundColor: "#e6e6fa",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 40,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },

  btn: {
    backgroundColor: "#800080",
    width: 300,
    marginTop: 80,
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
  img: {
    height: 330,
    width: 220,
  },
});
