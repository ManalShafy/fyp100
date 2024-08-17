import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditProjectModal = ({ modalVisible, setModalVisible, project }) => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle update project
  const updateProjectHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/project/update-project/${id}`, {
        name,
        duration,
        description,
        price,
      });
      setLoading(false);
      alert(data?.message);
      navigation.push("MyProjects");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Error updating project");
    }
  };

  // Initialize project data
  useEffect(() => {
    setName(project?.name || "");
    setDuration(project?.duration || "");
    setDescription(project?.description || "");
    setPrice(project?.price?.toString() || ""); // Ensure price is handled as a string for TextInput
  }, [project]);

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
            <Text style={styles.modalText}>Update Your Project</Text>

            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.inputBox}
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <Text style={styles.text}>Duration</Text>
            <TextInput
              style={styles.inputBox}
              value={duration}
              onChangeText={(text) => setDuration(text)}
            />

            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.inputBox}
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            <Text style={styles.text}>Price</Text>
            <TextInput
              style={styles.inputBox}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="numeric"
            />

            <View style={styles.btnContainer}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  updateProjectHandler(project && project._id),
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

export default EditProjectModal;
