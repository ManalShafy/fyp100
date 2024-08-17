import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);

  const navigation = useNavigation();
  // logout
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("Logout Successful");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        // onPress={() => navigation.navigate("Account")}
        onPress={() => navigation.navigate("About")}
      >
        <FontAwesome5 name="user-circle" style={styles.iconStyle} />
      </TouchableOpacity>

      {/* <View style={styles.searchContainer}>
        <TouchableOpacity>
          <FontAwesome5 name="search" style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
      </View> */}

      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 15,
  },
  iconStyle: {
    margin: 20,
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
    color: "#800080",
  },
  text: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "#333",
  },
  searchIcon: {
    fontSize: 20,
    color: "#666",
    marginLeft: 30,
  },
});
