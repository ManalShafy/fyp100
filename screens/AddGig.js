import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import FooterMenu from "../components/Menus/FooterMenu";
import { ProjectContext } from "../context/projectContext";
import { Picker } from "@react-native-picker/picker";

const AddGig = () => {
  const [project, setProjects] = useContext(ProjectContext);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const categoryOption = [
    "Backend",
    "Frontend",
    "Full Stack",
    "Design",
    "Video & Animation",
    "Writing",
    "Translation",
    "Data Entry",
  ];

  const handleRegister = async () => {
    // Validate price
    if (!price || parseFloat(price) <= 0) {
      alert("Price is required and should be greater than zero.");
      return;
    }
    if (isNaN(price)) {
      alert("Price should be a valid number.");
      return;
    }

    try {
      const { data } = await axios.post("/project/new-project", {
        name,
        duration,
        description,
        price,
        category,
      });
      console.log(data);
      setProjects([...project, data?.projects]);
      setName("");
      setDuration("");
      setDescription("");
      setPrice("");
      setCategory("");
      alert("Gig Added sucessfully");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const isFormValid = name && duration && description && price && category;

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Add a Project</Text>
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={setName}
          />
          <Text style={{ fontWeight: "bold" }}>Duration</Text>
          {/* <TextInput
            style={styles.inputBox}
            value={duration}
            onChangeText={setDuration}
          /> */}
          {/* <View style={styles.pickerContainer}> */}
          <Picker
            selectedValue={duration}
            onValueChange={(itemValue) => setDuration(itemValue)}
            style={styles.inputBox1}
          >
            <Picker.Item label="Select Duration" value="" />
            <Picker.Item label="< 1 week" value="< 1 week" />
            <Picker.Item label="1 week" value="1 week" />
            <Picker.Item label="2 weeks" value="2 weeks" />
            <Picker.Item label="1 month" value="1 month" />
            <Picker.Item label="> 1 month" value="> 1 month" />
          </Picker>
          {/* </View> */}

          <Text style={{ fontWeight: "bold" }}>Description</Text>
          <TextInput
            style={styles.inputBox}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={setDescription}
          />
          <Text style={{ fontWeight: "bold" }}>Price ($)</Text>
          <TextInput
            style={styles.inputBox}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <Text style={{ fontWeight: "bold" }}>Category</Text>
          <Picker
            selectedValue={category}
            style={styles.inputBox1}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            {categoryOption.map((category) => (
              <Picker.Item
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                value={category}
                key={category}
              />
            ))}
          </Picker>
          {/* <TextInput
            style={styles.inputBox}
            value={category}
            onChangeText={setCategory}
          /> */}
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              disabled={!isFormValid}
              onPress={handleRegister}
              style={styles.btn}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.container2}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default AddGig;

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
  inputBox1: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#e6e6fa",
    borderRadius: 20,
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
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#800080",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    height: 40,
    justifyContent: "center",
  },
  picker: {
    height: 40,
    width: 350,
    color: "gray",
  },
});
