import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const UserProfileCard = ({ user, onAddFriend }) => {
  const { name, profilePicture, skills } = user;
  const [buttonColor, setButtonColor] = useState("purple");
  const [isAdded, setIsAdded] = useState(false);

  // Truncate skills to 20 characters
  const truncatedSkills =
    skills.join(", ").length > 20
      ? skills.join(", ").substring(0, 17) + "..."
      : skills.join(", ");

  const handlePress = () => {
    onAddFriend(user._id, setIsAdded); // Pass state updater to parent
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.skills}>{truncatedSkills}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handlePress}
        disabled={isAdded} // Disable button if friend is added
      >
        <Text style={styles.buttonText}>
          {isAdded ? "Friend Added" : "Add Friend"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
    width: 150,
    height: 230, // Increased height
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    position: "relative", // Make sure card is positioned relative
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center", // Center text content
    alignItems: "center",
    marginBottom: 50,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  skills: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  button: {
    position: "absolute",
    bottom: 10, // Fixed distance from bottom
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default UserProfileCard;
