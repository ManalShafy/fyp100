import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import MentorFooter from "../components/Menus/MentorFooter";
import { AuthContext } from "../context/authContext";

const Mentor = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const { user } = state;
  const [name, setName] = useState(user?.name);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: "https://cdn2.f-cdn.com/contestentries/1440473/30778261/5bdd02db9ff4c_thumb900.jpg",
          }}
          style={{ height: 200, width: 200, borderRadius: 100 }}
        />
      </View>
      <View>
        <Text style={styles.Name}>{name}</Text>
      </View>
      <ScrollView>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddCourse")}
          >
            <Text style={styles.buttonText}>Add Course</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ViewMyCourses")}
          >
            <Text style={styles.buttonText}>View My Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ViewCommunity")}
          >
            <Text style={styles.buttonText}>View Community</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <MentorFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  Name: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  navigationContainer: {
    flex: 1,
    justifyContent: "center", // Center buttons vertically
  },
  button: {
    backgroundColor: "#800080", // Purple color
    padding: 15,
    borderRadius: 10,
    marginBottom: 20, // Space between buttons
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center", // Center text in button
  },
});

export default Mentor;
