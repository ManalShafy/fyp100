import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ProjectCardBidder from "../components/ProjectCardBidder";
import FooterMenu from "../components/Menus/FooterMenu";
import { useNavigation } from "@react-navigation/native";

const ProjectBoard = () => {
  const navigation = useNavigation();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    try {
      const { data } = await axios.get("/project/get-all-project");
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/project/categories");
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySelect = async (category) => {
    setSearchQuery(category);
    try {
      const { data } = await axios.get(
        `/project/get-projects-by-category?category=${category}`
      );
      setProjects(data);
      setIsSearchFocused(false); // Close the dropdown after selecting a category
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("ViewInprogressGigsFreelancer")}
        >
          <Text style={styles.BtnText}>In Progress {"\n"}Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("ClientHome")}
        >
          <Text style={styles.BtnText}>Switch to {"\n"}Client Side</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Project Board</Text>
      <Text style={styles.heading2}>
        Find Your Next {"\n"}
        <Text style={styles.heading2P}>Dream Project</Text>
      </Text>

      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={getCategories}>
          <FontAwesome5 name="search" style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearchFocused(true)}
        />
      </View>

      {isSearchFocused && categories.length > 0 && (
        <ScrollView style={styles.categoryDropdown}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryItem}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView style={styles.scrollView}>
        <ProjectCardBidder projects={projects} />
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    marginTop: 15,
    fontSize: 36,
    fontWeight: "bold",
  },
  heading2P: {
    marginTop: 15,
    fontSize: 36,
    fontWeight: "bold",
    alignSelf: "center",
    color: "purple",
  },
  heading2: {
    marginTop: 15,
    fontSize: 36,
    fontWeight: "bold",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#800080",
    width: 110,
    marginTop: 15,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  BtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "grey",
  },
  searchIcon: {
    fontSize: 20,
    color: "#666",
    marginLeft: 30,
  },
  categoryDropdown: {
    maxHeight: 200,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 10,
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ProjectBoard;
