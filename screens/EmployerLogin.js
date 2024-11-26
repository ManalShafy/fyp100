import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthPageContext } from "../context/authPageContext";

const EmployerLogin = ({ navigation }) => {
  //global state
  const [statePage, setStatePage] = useContext(AuthPageContext);
  const [state, setState] = useContext(AuthContext);
  const [emailPage, setEmailPage] = useState("");
  const [passwordPage, setPasswordPage] = useState("");
  const handleSubmit = async () => {
    if (!emailPage || !passwordPage) {
      Alert.alert("Please Fill All Fields");
      return;
    }
    // If all validations pass, you can proceed with registering the account
    // Your registration logic goes here
    try {
      const { data } = await axios.post("/page/login-page", {
        email: emailPage,
        password: passwordPage,
      });
      // to acess page login
      setState({ token: "", user: null });
      await AsyncStorage.removeItem("@auth");
      // alert("Logout Successful");
      console.log("employee login data", data);
      setStatePage(data);
      await AsyncStorage.setItem("@authPage", JSON.stringify(data));
      alert(data && data.message);
      // navigation.navigate("ViewPostedJobs");
      navigation.navigate("JobClientHome");
      console.log("Login Data==> ", { emailPage, passwordPage });
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  //local stronage
  const getLocalStoragData = async () => {
    let data = await AsyncStorage.getItem("@authPage");
    console.log("Local Storage==>", data);
  };
  getLocalStoragData();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Employer Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={emailPage}
          onChangeText={setEmailPage}
          keyboardType="email-address"
        />
        <Text style={{ fontWeight: "bold" }}>Password</Text>
        <TextInput
          style={styles.inputBox}
          value={passwordPage}
          onChangeText={setPasswordPage}
          secureTextEntry
        />
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            disabled={!emailPage || !passwordPage}
            onPress={handleSubmit}
            style={styles.btn}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.linkText}>
          Not Registered? Please &nbsp;
          <Text
            style={styles.link}
            // put register organization page instead
            onPress={() => navigation.navigate("RegisterPage")}
          >
            REGISTER
          </Text>{" "}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
    borderColor: "purple",
    borderWidth: 2,
  },
  btn: {
    backgroundColor: "purple",
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

export default EmployerLogin;
