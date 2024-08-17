import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from "axios"
const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Validate Name
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    // if (!name || !email || !cnic || !password) {
    //     return Alert.alert("Error", "All fields are required!");
    // }
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Validate CNIC
    if (cnic.length !== 13) {
      Alert.alert('Error', 'CNIC must be exactly 13 digits');
      return;
    }

    // Check if the last digit of CNIC is even
    const lastDigit = parseInt(cnic.slice(-1));
    if (lastDigit % 2 !== 0) {
      Alert.alert('Error', 'Account registration failed: Only females can register');
      return;
    }

    // Validate Password
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
    try {
      const { data } = await axios.post("/auth/register", { name, email, cnic, password })
      alert(data && data.message)
      navigation.navigate("Login")
    }
    catch (error) {
      alert(error.response.data.message);
    }
  };


  const handleReset = () => {
    setName('');
    setEmail('');
    setCnic('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Name</Text>
        <TextInput
          style={styles.inputBox}
          value={name}
          onChangeText={setName}
        />
        <Text style={{ fontWeight: "bold" }}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={{ fontWeight: "bold" }}>CNIC</Text>
        <TextInput
          style={styles.inputBox}
          value={cnic}
          onChangeText={setCnic}
          keyboardType="numeric"
        />
        <Text style={{ fontWeight: "bold" }}>Password</Text>
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            disabled={!name || !email || !cnic || !password}
            onPress={handleRegister}
            style={styles.btn}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={handleReset}
            style={styles.btn}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Reset</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.linkText}>Already Registered? Please &nbsp;<Text style={styles.link} onPress={() => navigation.navigate("Login")}>LOGIN</Text> </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 2
  },
  btn: {
    backgroundColor: "purple",
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "blue",
    fontWeight: "bold"
  }
});

export default Register;
