import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { JobContext } from "../context/jobContext";
import JobCardApplicant from "../components/JobCardApplicant";
import FooterMenu from "../components/Menus/FooterMenu";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TextInput } from "react-native";

// const JobBoard = () => {
//   const navigation = useNavigation();
//   const [job, getAllJob] = useContext(JobContext);
//   //const [job, setJobs] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [allJobs, setAllJobs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // useEffect(() => {
//   //   console.log("jobborad use effect");
//   //   // getAllJob();
//   // }, [getAllJob]);

//   useEffect(() => {
//     console.log("jobborad use effect");
//     getAllJobs();
//   }, []);
//   // useEffect(() => {
//   //   getAllJobs();
//   // }, []);

//   const getAllJobs = async () => {
//     // setLoading(true);
//     try {
//       console.log("herere");
//       const { data } = await axios.get("/job/zz");
//       console.log(data, "data check");
//       // setLoading(false);
//       setJobs(data?.jobs);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     getAllJobs();
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, []);
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     const filteredJobs = allJobs.filter((job) =>
//       job.title.toLowerCase().includes(query.toLowerCase())
//     );
//     setAllJobs(filteredJobs);
//   };

//   console.log("job check", job);

//   return (
//     <View style={styles.container}>
//       <View style={styles.container2}>
//         <TouchableOpacity
//           style={styles.btn}
//           onPress={() => navigation.navigate("ViewAppliedJobs")}
//         >
//           <Text style={styles.BtnText}>Applied Jobs</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.btn}
//           onPress={() => navigation.navigate("EmployerLogin")}
//         >
//           <Text style={styles.BtnText}>Post A Job</Text>
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.heading}>Job Board</Text>
//       <Text style={styles.heading2}>
//         Find Your Next {"\n"}
//         {"\t"}
//         {"\t"} <Text style={styles.heading2P}>Dream Job</Text>
//       </Text>

//       {/* <View style={styles.searchContainer}>
//         <TouchableOpacity>
//           <FontAwesome5 name="search" style={styles.searchIcon} />
//         </TouchableOpacity>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search"
//           placeholderTextColor="#666"
//         />
//       </View> */}
//       <View style={styles.searchContainer}>
//         <FontAwesome5 name="search" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search jobs by title"
//           placeholderTextColor="#666"
//           value={searchQuery}
//           onChangeText={handleSearch}
//         />
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         <JobCardApplicant jobs={jobs} />
//       </ScrollView>
//       <FooterMenu />
//     </View>
//   );
// };

const JobBoard = () => {
  const navigation = useNavigation();
  const [job, getAllJob] = useContext(JobContext);
  const [refreshing, setRefreshing] = useState(false);
  const [jobs, setJobs] = useState([]); // Displayed jobs
  const [allJobs, setAllJobs] = useState([]); // Full dataset
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    try {
      const { data } = await axios.get("/job/zz");
      console.log("jobcheck", data.jobs);
      setAllJobs(data?.jobs);
      setJobs(data?.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllJobs();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setJobs(allJobs);
    } else {
      const filteredJobs = allJobs.filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase())
      );
      setJobs(filteredJobs);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("ViewAppliedJobs")}
        >
          <Text style={styles.BtnText}>Applied Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("EmployerLogin")}
        >
          <Text style={styles.BtnText}>Post A Job</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Job Board</Text>
      <Text style={styles.heading2}>
        Find Your Next {"\n"}
        {"\t"} <Text style={styles.heading2P}>Dream Job</Text>
      </Text>

      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs by title"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <JobCardApplicant jobs={jobs} />
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
  scrollView: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
    // flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    // flex: 1,
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
});

export default JobBoard;
