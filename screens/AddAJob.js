import React, { useState, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { JobContext } from "../context/jobContext";
import axios from "axios";
import FooterMenu from "../components/Menus/FooterMenu";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";

const AddAJob = () => {
  const [job, setJob] = useContext(JobContext);
  // const [job, setJob] = useState();
  const [title, setTitle] = useState("");
  const [descriptionFile, setDescriptionFile] = useState(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [videoRequired, setVideoRequired] = useState("No");

  const statusType = ["Open", "Closed"];
  const videoRequiredOption = ["Yes", "No"];

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    console.log("DocumentPicker result:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri, name, mimeType } = result.assets[0];
      setDescriptionFile({ uri, name, type: mimeType });
      console.log("Picked file:", { uri, name, type: mimeType });
    }
  };

  const handleRegister = async () => {
    try {
      console.log("Form data before submission:", {
        title,
        description,
        descriptionFile,
        status,
        videoRequired,
      });

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("videoRequired", videoRequired);
      if (descriptionFile) {
        formData.append("descriptionFile", {
          uri: descriptionFile.uri,
          name: descriptionFile.name,
          type: descriptionFile.type,
        });
        console.log("Form data with file:", formData);
      }

      const { data } = await axios.post("/job/create-job", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(data && data.message);
      setJob([...job, data?.job]);
      setTitle("");
      setDescriptionFile(null);
      setDescription("");
      setStatus("Open");
      setVideoRequired("No");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const isFormValid = title && description;

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Add a Job</Text>
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Title</Text>
          <TextInput
            style={styles.inputBox}
            value={title}
            onChangeText={setTitle}
          />
          <Text style={{ fontWeight: "bold" }}>Description File</Text>
          <Button title="Pick a PDF" onPress={pickDocument} />
          {descriptionFile && (
            <Text style={{ marginVertical: 10 }}>{descriptionFile.name}</Text>
          )}
          <Text style={{ fontWeight: "bold" }}>Description</Text>
          <TextInput
            style={styles.inputBoxMultiline}
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={6}
          />
          <Text style={{ fontWeight: "bold" }}>Status</Text>
          <Picker
            selectedValue={status}
            style={styles.inputBox1}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            {statusType.map((status) => (
              <Picker.Item
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                value={status}
                key={status}
              />
            ))}
          </Picker>
          <Text style={{ fontWeight: "bold" }}>Video Submission Required</Text>
          <Picker
            selectedValue={videoRequired}
            style={styles.inputBox1}
            onValueChange={(itemValue) => setVideoRequired(itemValue)}
          >
            {videoRequiredOption.map((videoRequired) => (
              <Picker.Item
                label={
                  videoRequired.charAt(0).toUpperCase() + videoRequired.slice(1)
                }
                value={videoRequired}
                key={videoRequired}
              />
            ))}
          </Picker>
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

export default AddAJob;

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
  inputBoxMultiline: {
    minHeight: 100,
    maxHeight: 150,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: 350,
    paddingLeft: 10,
    color: "gray",
    borderColor: "#800080",
    borderWidth: 2,
    textAlignVertical: "top",
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
});
