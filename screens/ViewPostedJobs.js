import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import JobCard from "../components/JobCard";
import FooterMenu from "../components/Menus/FooterMenu";
import JobFooterMenu from "../components/Menus/JobFooterMenu";

const ViewPostedJobs = () => {
  const navigation = useNavigation();

  // State
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get page jobs
  const getPageJobs = async () => {
    try {
      console.log(axios.get("/job/get-page-jobs"));
      console.log("entry check ");
      setLoading(true);
      //[AxiosError: Request failed with status code 401] erorr araha console pr

      const { data } = await axios.get("/job/get-page-jobs");
      console.log(axios.get("/job/get-page-jobs"));
      console.log("exit check ");
      console.log(data);
      setLoading(false);
      setJobs(data?.pageJobs);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.message); // Display error message instead of the error object
    }
  };

  // Initial data fetch
  useEffect(() => {
    getPageJobs();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.heading}>Posted Jobs</Text>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("AddAJob")}
        >
          <Text style={styles.BtnText}>Add a Job</Text>
        </TouchableOpacity> */}
      </View>
      <ScrollView>
        <JobCard jobs={jobs} myJobScreen={true} />
        {/* <Text>{JSON.stringify(jobs, null, 4)}</Text> */}
        {/* Optional debug line */}
      </ScrollView>
      <JobFooterMenu />
    </View>
  );
};

export default ViewPostedJobs;

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
  btn: {
    backgroundColor: "#800080",
    width: 100,
    marginTop: 15,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  BtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
