import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import { useNavigation } from "@react-navigation/native";

const ClientHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: "https://cdn2.f-cdn.com/contestentries/1440473/30778261/5bdd02db9ff4c_thumb900.jpg",
          }}
          style={{ height: 200, width: 200, borderRadius: 100 }}
        />
      </View> */}
      {/* <View>
        <Text style={styles.Name}>{name}</Text>
      </View> */}
      {/* <ScrollView style={styles.container2}> */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddGig")}
        >
          <Text style={styles.buttonText}>Add A Project</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ViewMyGigsClient")}
        >
          <Text style={styles.buttonText}>View My Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ViewInprogressGigsClient")}
        >
          <Text style={styles.buttonText}>View In Progress Project</Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
      <FooterMenu />
    </View>
  );
};

export default ClientHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 40,
  },
  container2: {
    margin: 10,
    // alignItems: "center",
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
