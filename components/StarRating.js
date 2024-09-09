import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Ensure FontAwesome is linked correctly

const StarRating = ({ rating }) => {
  const fullStar = <Icon name="star" size={24} color="#800080" />;
  const halfStar = <Icon name="star-half-o" size={24} color="#800080" />;
  const emptyStar = <Icon name="star-o" size={24} color="#800080" />;

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(fullStar);
    } else if (rating >= i - 0.5) {
      stars.push(halfStar);
    } else {
      stars.push(emptyStar);
    }
  }

  return (
    <View style={styles.starsContainer}>
      {stars.map((star, index) => (
        <React.Fragment key={index}>{star}</React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: "row",
  },
});

export default StarRating;
