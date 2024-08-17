import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CourseCard from "../components/CourseCard";
import FooterMenu from "../components/Menus/FooterMenu";
import { CourseContext } from "../context/courseContext";

const Courses = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // Manage filter state
  const [course] = useContext(CourseContext);

  const FetchMentor = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/mentor/get-mentor/");
      await AsyncStorage.setItem("@mentor", JSON.stringify(response));

      if (response.data.success) {
        navigation.navigate("Mentor");
      } else {
        navigation.navigate("");
      }
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchMentor();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "all" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("all")}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "paid" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("paid")}
        >
          <Text style={styles.filterText}>Paid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "unpaid" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("unpaid")}
        >
          <Text style={styles.filterText}>Unpaid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.regBtn}
          onPress={() => navigation.navigate("RegisterMentor")}
          disabled={loading}
        >
          <Text style={styles.postBtnText}>
            {loading ? "Loading..." : "Register as Mentor"}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.pageTitle}>Courses</Text>
      <ScrollView style={styles.scrollView}>
        <CourseCard
          course={course.filter((c) => {
            if (filter === "all") return true;
            return filter === "paid" ? c.type === "paid" : c.type !== "paid";
          })}
          navigation={navigation}
        />
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#DDD",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: "#800080",
  },
  filterText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  regBtn: {
    backgroundColor: "#800080",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    elevation: 2,
  },
  postBtnText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  scrollView: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
});

export default Courses;
