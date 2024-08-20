// import React, { useContext, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import { CardField, useStripe } from "@stripe/stripe-react-native";
// import axios from "axios";
// import FooterMenu from "../components/Menus/FooterMenu";
// import { AuthContext } from "../context/authContext"; // Adjust the import path as necessary

// const GigPaymentScreen = ({ route, navigation }) => {
//   const { project } = route.params;
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [loading, setLoading] = useState(false);
//   const [state] = useContext(AuthContext);

//   const handlePayment = async () => {
//     setLoading(true);
//     try {
//       // Step 1: Create Payment Intent
//       const { data } = await axios.post("/payment/create-payment-intent", {
//         amount: course.amount,
//         paymentType: "course",
//         courseId: course._id,
//         userId: state.user._id,
//         receiverId: course.updatedBy._id,
//       });

//       const { clientSecret, paymentId } = data;

//       // Step 2: Initialize Payment Sheet
//       const { error: initError } = await initPaymentSheet({
//         paymentIntentClientSecret: clientSecret,
//         merchantDisplayName: "Your Merchant Name",
//       });

//       if (initError) {
//         console.error("Payment sheet initialization error:", initError);
//         Alert.alert(`Initialization Error: ${initError.message}`);
//         return;
//       }

//       // Step 3: Present Payment Sheet
//       const { error } = await presentPaymentSheet();

//       if (error) {
//         console.error("Stripe error:", error);
//         Alert.alert(`Error: ${error.message}`);
//       } else {
//         // Step 4: Handle successful payment
//         await axios.post("/payment/payment-success", {
//           paymentId,
//           paymentMethodId: "pm_card_visa", // Replace with real payment method ID
//         });

//         // Register the course after successful payment
//         const registerResponse = await axios.put("/course/register-course", {
//           courseId: course._id,
//         });

//         if (registerResponse.data.success) {
//           Alert.alert(
//             "Success",
//             "Payment completed and course registered successfully"
//           );
//           navigation.goBack();
//         } else {
//           Alert.alert(
//             "Error",
//             "Payment completed but failed to register the course"
//           );
//         }
//       }
//     } catch (error) {
//       console.error("Error in handlePayment:", error);
//       Alert.alert("Error", "Failed to complete payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Complete Payment</Text>
//       <Text style={styles.courseTitle}>{course.title}</Text>
//       <Text style={styles.courseAmount}>${course.amount}</Text>
//       <TouchableOpacity
//         style={styles.payButton}
//         onPress={handlePayment}
//         disabled={loading}
//       >
//         <Text style={styles.payButtonText}>
//           {loading ? "Processing..." : "Pay Now"}
//         </Text>
//       </TouchableOpacity>
//       <View style={styles.container2}>
//         <FooterMenu />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     margin: 10,
//     marginTop: 40,
//   },
//   container2: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   courseTitle: {
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   courseAmount: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: "#efefef",
//   },
//   cardContainer: {
//     height: 50,
//     marginVertical: 30,
//   },
//   payButton: {
//     backgroundColor: "purple",
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   payButtonText: {
//     color: "#fff",
//     fontSize: 18,
//   },
// });

// export default GigPaymentScreen;
