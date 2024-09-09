// ReviewCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StarRating from "./StarRating"; // Assuming you have a StarRating component

const ReviewCard = ({ review }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.reviewerName}>{review.raterId.name}</Text>
      <StarRating rating={review.rating} />
      <Text style={styles.reviewText}>{review.review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
  },
});

export default ReviewCard;
