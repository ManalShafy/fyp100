import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const AdminComplaintCell = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/complaintcell/get-page-complaints/`);
      setComplaints(response.data.complaints);
    } catch (error) {
      console.error("Error fetching complaints", error);
      Alert.alert("Error", "Failed to fetch complaints.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await axios.put(`/complaintcell/update-status/${complaintId}`, {
        status: newStatus,
      });

      // Update the status locally to reflect the change
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === complaintId
            ? { ...complaint, status: newStatus }
            : complaint
        )
      );

      Alert.alert("Success", "Complaint status updated.");
    } catch (error) {
      console.error("Error updating status", error);
      Alert.alert("Error", "Failed to update complaint status.");
    }
  };

  const renderComplaintItem = ({ item }) => {
    return (
      <View style={styles.complaintItem}>
        <Text style={styles.complaintText}>Complaint: {item.complaint}</Text>
        <Text style={styles.statusText}>Status: {item.status}</Text>

        <Picker
          selectedValue={item.status}
          style={styles.picker}
          onValueChange={(itemValue) => handleStatusChange(item._id, itemValue)}
        >
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="In Progress" value="In Progress" />
          <Picker.Item label="Resolved" value="Resolved" />
        </Picker>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Complaints</Text>

      {loading ? (
        <Text>Loading complaints...</Text>
      ) : (
        <FlatList
          data={complaints}
          renderItem={renderComplaintItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  complaintItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3, // For shadow effect
  },
  complaintText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default AdminComplaintCell;
