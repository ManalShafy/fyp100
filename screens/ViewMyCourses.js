import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FooterMenu from "../components/Menus/FooterMenu";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

const ViewMyCourses = ({ navigation }) => {
  //local state
  const [course, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // Manage filter state

  //get user course
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/course/get-user-course");
      setLoading(false);
      setCourses(data?.course);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  //initial
  useEffect(() => {
    getUserPosts();
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
      </View>
      <Text style={styles.pageTitle}>My Courses</Text>
      <ScrollView>
        <CourseCard
          course={course.filter((c) => {
            if (filter === "all") return true;
            return filter === "paid" ? c.type === "paid" : c.type !== "paid";
          })}
          navigation={navigation}
        />
      </ScrollView>
      <View>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
    marginTop: 40,
  },
  container2: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // width: 200,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#DDD",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    elevation: 2,
    margin: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  filterButtonActive: {
    backgroundColor: "#800080",
  },
  filterText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ViewMyCourses;
