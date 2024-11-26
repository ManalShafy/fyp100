import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const interviewChecklist = () => {
  const route = useRoute();
  const { designation, interviewType } = route.params;
  const [checklist, setChecklist] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchResponse = async () => {
    try {
      setLoading(true); // Start loading
      console.log(designation, interviewType);
      const response = await axios.post(
        "/interviewChecklist/generate-interview-checklist",
        { designation: designation, interview_type: interviewType }
      );
      console.log(response.data);
      // setChecklist(response.data);
      setChecklist(response.data.checklist);
      //renderChecklist(); //added by me
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error in generating Interview Checklist. Please try again.");
    } finally {
      setLoading(false); // Stop loadin
    }
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  // const handleGenerateNew = () => {
  //   // Clear all fields and checklist
  //   setDesignation("");
  //   setInterviewType("");
  //   setChecklist(null);
  //   navigation.navigate("interviewChecklistSplash");
  // };

  // const renderChecklist = () => {
  //   if (typeof checklist === "string") {
  //     return <Text>{checklist}</Text>;
  //   } else if (typeof checklist === "object" && checklist !== null) {
  //     return Object.keys(checklist).map((key) => (
  //       <View key={key} style={styles.resultItem}>
  //         <Text style={styles.resultKey}>{key}:</Text>
  //         <Text style={styles.resultValue}>{checklist[key]}</Text>
  //       </View>
  //     ));
  //   }
  //   return null;
  // };
  // each letter render
  // const renderChecklist = () => {
  //   if (!checklist || checklist.length === 0) {
  //     return <Text>No checklist available</Text>; // Handle case where no checklist is available
  //   }

  //   try {
  //     if (typeof checklist === "object" && checklist !== null) {
  //       return Object.keys(checklist).map((sectionKey) => (
  //         <View key={sectionKey} style={styles.resultItem}>
  //           {/* Render main section title */}
  //           <Text style={styles.sectionTitle}>
  //             {sectionKey.replace(/_/g, " ").toUpperCase()}
  //           </Text>

  //           {/* Render subsections */}
  //           {Object.keys(checklist[sectionKey]).map((subKey) => (
  //             <View key={subKey} style={styles.subSection}>
  //               {/* Render subheading title */}
  //               <Text style={styles.subSectionTitle}>
  //                 {subKey.replace(/_/g, " ")}
  //               </Text>

  //               {/* Check if checklist[sectionKey][subKey] is an array */}
  //               {Array.isArray(checklist[sectionKey][subKey]) ? (
  //                 checklist[sectionKey][subKey].map((item, index) => (
  //                   <Text key={index} style={styles.itemText}>
  //                     - {item.replace(/_/g, " ")}
  //                   </Text>
  //                 ))
  //               ) : (
  //                 <Text style={styles.itemText}>
  //                   - {checklist[sectionKey][subKey].replace(/_/g, " ")}
  //                 </Text>
  //               )}
  //             </View>
  //           ))}
  //         </View>
  //       ));
  //     }
  //   } catch (error) {
  //     console.error("Error parsing checklist: ", error);
  //     return <Text>Error displaying the checklist</Text>; // Fallback in case of parsing errors
  //   }

  //   return null;
  // };

  // displaying data
  const renderChecklist = () => {
    // Check if checklist exists and is not empty
    if (!checklist || checklist.length === 0) {
      return <Text>No checklist available</Text>; // Handle case where no checklist is available
    }

    // Parse the JSON-like string from the backen
    let parsedChecklist;
    try {
      if (typeof checklist === "string") {
        // Extract the actual JSON object from the string
        // parsedChecklist = JSON.parse(
        //   checklist.replace(/```JSON|```/g, "")
        // ).trim();

        // Extract the actual JSON object from the string
        let cleanedChecklist = checklist.replace(/```json|```JSON|```/gi, ""); // Removes both 'json' and 'JSON', case-insensitive
        console.log("Cleaned checklist string: ", cleanedChecklist); // Log cleaned string for debugging
        parsedChecklist = JSON.parse(cleanedChecklist);
      } else {
        console.error("Checklist is not a string:", checklist);
        return <Text>Invalid checklist format</Text>;
      }
    } catch (error) {
      console.error("Error parsing checklist: ", error);
      return <Text>Error displaying the checklist</Text>; // Fallback in case of parsing errors
    }

    // Render the parsed checklist
    try {
      if (typeof parsedChecklist === "object" && parsedChecklist !== null) {
        return Object.keys(parsedChecklist).map((sectionKey) => (
          <View key={sectionKey} style={styles.resultItem}>
            {/* Render main section title */}
            <Text style={styles.sectionTitle}>
              {sectionKey.replace(/_/g, " ").toUpperCase()}
            </Text>

            {/* Render subsections */}
            {Object.keys(parsedChecklist[sectionKey]).map((subKey) => (
              <View key={subKey} style={styles.subSection}>
                {/* Render subheading title */}
                <Text style={styles.subSectionTitle}>
                  {subKey.replace(/_/g, " ")}
                </Text>

                {/* Check if parsedChecklist[sectionKey][subKey] is an array */}
                {Array.isArray(parsedChecklist[sectionKey][subKey]) ? (
                  parsedChecklist[sectionKey][subKey].map((item, index) => (
                    <Text key={index} style={styles.itemText}>
                      - {item.replace(/_/g, " ")}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.itemText}>
                    - {parsedChecklist[sectionKey][subKey].replace(/_/g, " ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ));
      }
    } catch (error) {
      console.error("Error rendering checklist: ", error);
      return <Text>Error displaying the checklist</Text>; // Fallback in case of rendering errors
    }

    return null;
  };

  // const renderChecklist = () => {
  //   // Check if checklist exists and is not empty
  //   if (!checklist || checklist.length === 0) {
  //     return <Text>No checklist available</Text>; // Handle case where no checklist is available
  //   }

  //   // Parse the JSON-like string from the backend
  //   let parsedChecklist;
  //   try {
  //     if (typeof checklist === "string") {
  //       // Extract the actual JSON object from the string
  //       parsedChecklist = JSON.parse(checklist.replace(/```json|```/g, ""));
  //     } else {
  //       console.error("Checklist is not a string:", checklist);
  //       return <Text>Invalid checklist format</Text>;
  //     }
  //   } catch (error) {
  //     console.error("Error parsing checklist: ", error);
  //     return <Text>Error displaying the checklist</Text>; // Fallback in case of parsing errors
  //   }

  //   // Render the parsed checklist
  //   try {
  //     if (typeof parsedChecklist === "object" && parsedChecklist !== null) {
  //       return Object.keys(parsedChecklist).map((sectionKey) => (
  //         <View key={sectionKey} style={styles.resultItem}>
  //           {/* Render main section title with bold styling */}
  //           <Text style={styles.sectionTitle}>
  //             {sectionKey.replace(/_/g, " ").toUpperCase()}
  //           </Text>

  //           {/* Render subsections */}
  //           {Object.keys(parsedChecklist[sectionKey]).map((subKey) => (
  //             <View key={subKey} style={styles.subSection}>
  //               {/* Render subheading title with bold styling */}
  //               <Text style={styles.subSectionTitle}>
  //                 {subKey.replace(/_/g, " ").toUpperCase()}
  //               </Text>

  //               {/* Check if parsedChecklist[sectionKey][subKey] is an array */}
  //               {Array.isArray(parsedChecklist[sectionKey][subKey]) ? (
  //                 parsedChecklist[sectionKey][subKey].map((item, index) => (
  //                   <Text key={index} style={styles.itemText}>
  //                     • {item.replace(/_/g, " ")}
  //                   </Text>
  //                 ))
  //               ) : (
  //                 <Text style={styles.itemText}>
  //                   • {parsedChecklist[sectionKey][subKey].replace(/_/g, " ")}
  //                 </Text>
  //               )}
  //             </View>
  //           ))}
  //         </View>
  //       ));
  //     }
  //   } catch (error) {
  //     console.error("Error rendering checklist: ", error);
  //     return <Text>Error displaying the checklist</Text>; // Fallback in case of rendering errors
  //   }

  //   return null;
  // };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Interview Checklist</Text>
        {/* <TextInput
          style={styles.inputBox}
          placeholder="Enter Designation"
          value={designation}
          onChangeText={setDesignation}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Type of Interview"
          value={interviewType}
          onChangeText={setInterviewType}
        /> */}
        <View style={styles.container2}>
          {/* <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate("interviewChecklist", {
                designation: designation,
                interviewType: interviewType,
              })
            }
          >
            <Text style={styles.BtnText}>Generate Checklist</Text>
          </TouchableOpacity> */}

          {/* genrate noew button */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("interviewChecklistSplash")}
            // onPress={handleGenerateNew}
            disabled={loading} // Disable the button while loading
          >
            <Text style={styles.BtnText}>
              {loading ? "Loading..." : "Generate New"}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("interviewChecklistSplash")}
          >
            <Text style={styles.BtnText}>Generate New</Text>
          </TouchableOpacity> */}
        </View>
        {checklist ? (
          <ScrollView style={styles.resultContainer}>
            {/* <Text style={styles.resultTitle}>Checklist:</Text> */}
            {renderChecklist()}
          </ScrollView>
        ) : null}
      </ScrollView>

      {/* <View style={styles.container3}>
        <TouchableOpacity
          style={styles.btn2}
          onPress={() => navigation.navigate("flashcards")}
        >
          <Text style={styles.BtnText}>Flashcards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn2}
          onPress={() => navigation.navigate("quizSplash")}
        >
          <Text style={styles.BtnText}>Take a Quiz</Text>
        </TouchableOpacity>
      </View> */}

      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  container2: {
    alignItems: "center",
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultItem: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold", // Makes the main section title bold
    marginBottom: 10,
    color: "#333", // Darker text color for better contrast
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "bold", // Makes the subsection title bold
    marginBottom: 5,
    color: "#555", // Lighter than the main title, but still bold
  },
  itemText: {
    fontSize: 14,
    color: "#666", // Normal text color for checklist items
    marginBottom: 5,
  },
  subSection: {
    marginLeft: 10, // Indent subsections for better hierarchy
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputBox: {
    backgroundColor: "#e6e6fa",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  resultContainer: {
    marginTop: 16,
    // borderWidth: 2,
    // borderColor: "black",
    // borderRadius: 10,
    // padding: 16,
    // marginLeft: 10,
    width: "100%",
    // maxHeight: 500, // Fixed max height
    height: "auto", // Adjust the height as per your requirement
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resultItem: {
    marginBottom: 8,
  },
  resultKey: {
    fontWeight: "bold",
  },
  resultValue: {
    // marginLeft: 8,
    fontSize: 18,
  },
  btn: {
    backgroundColor: "#800080",
    width: 300,
    marginTop: 15,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btn2: {
    backgroundColor: "#800080",
    width: 140,
    marginTop: 30,
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

export default interviewChecklist;
