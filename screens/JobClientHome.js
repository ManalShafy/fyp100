import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import Footer from "../components/Menus/FooterMenu";
import { AuthPageContext } from "../context/authPageContext";
import Icon from "react-native-vector-icons/FontAwesome"; // Import icons
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const JobClientHome = ({ navigation }) => {
  const [state, setState] = useContext(AuthPageContext);
  const { page } = state;
  const [name, setName] = useState(page?.name);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: page.profilePicture }}
          style={styles.profileImage}
        />
      </View>
      <View>
        <Text style={styles.Name}>{name}</Text>
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddAJob")}
        >
          <Icon name="plus" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Add A Job</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ViewPostedJobs")}
        >
          <Icon
            name="folder-open"
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>View Posted Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("GroupMessage")}
        >
          <FontAwesome5
            name="user-friends"
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>View Communities</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AdminComplaintCell")}
        >
          <Icon name="tasks" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>View Complaints</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 40,
  },
  Name: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  navigationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center buttons horizontally
    marginTop: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#800080",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%", // Ensures buttons are centered and responsive
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginLeft: 10, // Add space between icon and text
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  icon: {
    marginRight: 10, // Adjust margin between icon and text
  },
});

export default JobClientHome;
