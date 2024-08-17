import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";

const EditJobModal = ({ modalVisible, setModalVisible, job }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionFile, setDescriptionFile] = useState(null);
  const [status, setStatus] = useState("Active");
  const [videoRequired, setVideoRequired] = useState("No");
  const [loading, setLoading] = useState(false);

  const statusOptions = ["Open", "Close"];
  const videoOptions = ["Yes", "No"];

  // const pickDocument = async () => {
  //   let result = await DocumentPicker.getDocumentAsync({
  //     type: "application/pdf",
  //   });
  //   if (!result.canceled && result.assets && result.assets.length > 0) {
  //     const { uri, name, mimeType } = result.assets[0];
  //     setDescriptionFile({ uri, name, type: mimeType });
  //   }
  // };
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

  const updateJobHandler = async (id) => {
    try {
      setLoading(true);

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
      }

      const { data } = await axios.put(`/job/update-job/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      Alert.alert("Success", data?.message);
      navigation.push("ViewPostedJobs");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    if (job) {
      setTitle(job.title || "");
      setDescription(job.description || "");
      setStatus(job.status || "Active");
      setVideoRequired(job.videoRequired || "No");
    }
  }, [job]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Job</Text>
            <Text style={styles.text}>Title</Text>
            <TextInput
              style={styles.inputBox}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.inputBoxMultiline}
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              numberOfLines={4}
            />
            <Text style={styles.text}>Description File</Text>
            <Button title="Pick a PDF" onPress={pickDocument} />
            {descriptionFile && (
              <Text style={{ marginVertical: 10 }}>{descriptionFile.name}</Text>
            )}
            <Text style={styles.text}>Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={status}
                style={styles.picker}
                onValueChange={(itemValue) => setStatus(itemValue)}
              >
                {statusOptions.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} />
                ))}
              </Picker>
            </View>
            <Text style={styles.text}>Video Required</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={videoRequired}
                style={styles.picker}
                onValueChange={(itemValue) => setVideoRequired(itemValue)}
              >
                {videoOptions.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} />
                ))}
              </Picker>
            </View>
            <View style={styles.btnContainer}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  updateJobHandler(job && job._id);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>
                  {loading ? "Please Wait" : "Update"}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    marginBottom: 20,
    paddingTop: 10,
    textAlignVertical: "top",
    backgroundColor: "#e6e6fa",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  inputBoxMultiline: {
    minHeight: 100,
    maxHeight: 150,
    marginBottom: 20,
    backgroundColor: "#e6e6fa",
    borderRadius: 10,
    paddingLeft: 10,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderColor: "#800080",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#e6e6fa",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  btnContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#800080",
    elevation: 2,
    width: 100,
    margin: 10,
  },
  buttonClose: {
    backgroundColor: "grey",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditJobModal;
