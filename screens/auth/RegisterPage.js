import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import FooterMenu from "../../components/Menus/FooterMenu";
import { Picker } from "@react-native-picker/picker";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  //no same name website or email

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setProfileImage(pickerResult.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("industry", industry);
      formData.append("companySize", companySize);
      formData.append("website", website);
      formData.append("email", email);
      formData.append("password", password);

      if (profileImage) {
        const uri = profileImage;
        const type = "image/jpg"; // Adjust according to image type (jpg/png)
        const name = uri.split("/").pop();
        formData.append("profilePicture", {
          uri,
          name,
          type,
        });
      }

      const { data } = await axios.post("/page/register-page", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setDescription("");
      setIndustry("");
      setCompanySize("");
      setWebsite("");
      setEmail("");
      setPassword("");
      setProfileImage(null);

      alert(data && data.message);
      // Navigate to a relevant screen after success (e.g., Home)
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleReset = () => {
    setName("");
    setDescription("");
    setIndustry("");
    setCompanySize("");
    setWebsite("");
    setEmail("");
    setPassword("");
    setProfileImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Register as Page</Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Name</Text>
        <TextInput
          style={styles.inputBox}
          value={name}
          onChangeText={setName}
        />

        <Text style={{ fontWeight: "bold" }}>Description</Text>
        <TextInput
          style={styles.inputBox}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={{ fontWeight: "bold" }}>Industry</Text>
        <TextInput
          style={styles.inputBox}
          value={industry}
          onChangeText={setIndustry}
        />

        {/* <Text style={{ fontWeight: "bold" }}>Company Size</Text>
        <TextInput
          style={styles.inputBox}
          value={companySize}
          onChangeText={setCompanySize}
          keyboardType="numeric"
        /> */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={companySize}
            onValueChange={(itemValue) => setCompanySize(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select size" value="" />
            <Picker.Item label="0-1 employees" value="0-1 employees" />
            <Picker.Item label="2-10 employees" value="2-10 employees" />
            <Picker.Item label="11-50 employees" value="11-50 employees" />
            <Picker.Item label="51-200 employees" value="51-200 employees" />
            <Picker.Item label="201-500 employees" value="201-500 employees" />
            <Picker.Item
              label="501-1,000 employees"
              value="501-1,000 employees"
            />
            <Picker.Item
              label="1,001-5,000 employees"
              value="1,001-5,000 employees"
            />
            <Picker.Item
              label="5,001-10,000 employees"
              value="5,001-10,000 employees"
            />
            <Picker.Item label="10,000+ employees" value="10,000+ employees" />
          </Picker>
        </View>

        <Text style={{ fontWeight: "bold" }}>Website</Text>
        <TextInput
          style={styles.inputBox}
          value={website}
          onChangeText={setWebsite}
        />

        <Text style={{ fontWeight: "bold" }}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={{ fontWeight: "bold" }}>Password</Text>
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={{ fontWeight: "bold" }}>Profile Picture</Text>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.imagePreview} />
          ) : (
            <Text>Select Profile Picture</Text>
          )}
        </TouchableOpacity>

        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            disabled={
              !name ||
              !description ||
              !industry ||
              !companySize ||
              !website ||
              !email ||
              !password
            }
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
    </ScrollView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 20,
  },
  container2: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
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
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    height: 100,
    width: 350,
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
