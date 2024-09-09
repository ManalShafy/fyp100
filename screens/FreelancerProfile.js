import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard"; // Import the ReviewCard component
import { AuthContext } from "../context/authContext";

const FreelancerProfile = ({ route, navigation }) => {
  const { freelancerId, proposalId } = route.params;
  const [state] = useContext(AuthContext);
  const { user } = state;
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [ratingLoading, setRatingLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]); // Store fetched reviews
  const [showRatingInput, setShowRatingInput] = useState(false);
  const currentUserId = state.user?._id;

  const fetchFreelancerProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/proposal/get-freelancer/${proposalId}`
      );
      const { freelancerId } = response.data;
      setFreelancer(freelancerId);
      await fetchRatings();
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to load freelancer profile");
      setLoading(false);
    }
  };

  const fetchRatings = async () => {
    if (!currentUserId) return;

    try {
      const { data } = await axios.get(`/rating/get-ratings/${freelancerId}`);
      setAverageRating(data.averageRating);
      //setReviews(data.ratings || []); // Set the reviews state
    } catch (error) {
      console.error(error);
      alert("Failed to load ratings");
    }
  };

  const fetchPrevRatings = async () => {
    if (!currentUserId) return;

    try {
      const { data } = await axios.get(
        `/rating/get-ratings-prev/${freelancerId}`
      );
      //setAverageRating(data.averageRating);
      setReviews(data.ratings || []); // Set the reviews state
    } catch (error) {
      console.error(error);
      alert("Failed to load ratings");
    }
  };
  useEffect(() => {
    fetchFreelancerProfile();
    fetchPrevRatings();
  }, [freelancerId]);

  const handleRatingSubmit = async () => {
    if (!rating || rating < 1 || rating > 5 || !review) {
      alert("Please provide a valid rating (1-5) and review.");
      return;
    }

    try {
      setRatingLoading(true);
      await axios.post("/rating/add-rating", {
        receiverId: freelancerId,
        rating,
        review,
      });
      setRatingLoading(false);
      alert("Rating added successfully");
      setRating("");
      setReview("");
      fetchRatings();
      setShowRatingInput(false);
    } catch (error) {
      setRatingLoading(false);
      console.error(error);
      alert("Failed to add/update rating");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#800080" />
      </View>
    );
  }

  if (!freelancer) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Freelancer not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        {freelancer.profilePicture ? (
          <Image
            source={{ uri: freelancer.profilePicture }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileImagePlaceholder} />
        )}
        <Text style={styles.name}>{freelancer.name}</Text>
        <Text style={styles.email}>{freelancer.email}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.averageRating}>
            Rating: {averageRating.toFixed(1)} / 5
          </Text>
          <StarRating rating={averageRating} />
        </View>
        <TouchableOpacity
          style={styles.rateButton}
          onPress={() => {
            console.log("TouchableOpacity pressed");
            setShowRatingInput(!showRatingInput);
          }}
        >
          <Text style={styles.rateButtonText}>Rate Freelancer</Text>
        </TouchableOpacity>
        {showRatingInput && (
          <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingTitle}>Add Your Rating:</Text>
            <TextInput
              style={styles.input}
              placeholder="Rating (1-5)"
              keyboardType="numeric"
              value={rating}
              onChangeText={setRating}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Review"
              multiline
              numberOfLines={4}
              value={review}
              onChangeText={setReview}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleRatingSubmit}
              disabled={ratingLoading}
            >
              <Text style={styles.submitButtonText}>
                {ratingLoading ? "Submitting..." : "Submit Rating"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.reviewsContainer}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        ) : (
          <Text style={styles.noReviewsText}>No reviews yet</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black", // Purple color
  },
  email: {
    fontSize: 20,
    // fontWeight: "bold",
    color: "black", // Purple color
  },
  averageRating: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "black", // Purple color
  },
  stars: {
    flexDirection: "row",
  },
  star: {
    marginHorizontal: 2,
  },
  coursesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "black", // Purple color
  },
  backButton: {
    marginBottom: 10,
    justifyContent: "flex-start",
  },
  backButtonText: {
    fontSize: 16,
    color: "#6a1b9a", // Purple color
  },
  noCoursesText: {
    fontSize: 16,
    color: "#888",
    marginVertical: 20,
  },
  coursesContainer: {
    flexGrow: 1,
    width: "100%",
  },
  ratingContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  rateButton: {
    backgroundColor: "#800080", // Purple color
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  rateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  ratingInputContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#800080", // Purple color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  reviewsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  noReviewsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
});

export default FreelancerProfile;
