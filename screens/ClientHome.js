import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import Footer from "../components/Menus/FooterMenu";
import { AuthContext } from "../context/authContext";
import Icon from "react-native-vector-icons/FontAwesome"; // Import icons

const ClientHome = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const { user } = state;
  const [name, setName] = useState(user?.name);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
        />
      </View>
      <View>
        <Text style={styles.Name}>{name}</Text>
      </View>
      <ScrollView>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddGig")}
          >
            <Icon name="plus" size={20} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Add A Project</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ViewMyGigsClient")}
          >
            <Icon
              name="folder-open"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>View My Projects</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ViewInprogressGigsClient")}
          >
            <Icon name="tasks" size={20} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>View In Progress Project</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  navigationContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    flexDirection: "row", // To align icon and text horizontally
    alignItems: "center", // Align vertically centered
    backgroundColor: "#800080",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    marginLeft: 40,
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

export default ClientHome;
