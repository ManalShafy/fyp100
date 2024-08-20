import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation";
import Mentor from "./screens/Mentor";
import { CourseProvider } from "./context/courseContext";
// import { StripeProvider } from "@stripe/stripe-react-native";
// import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
    <NavigationContainer>
      <CourseProvider>
        {/* <StripeProvider publishableKey="pk_test_51Pau8gRsiE5h3fd3e8v6oC7SX2yU7rpSwPiBQ0oB4EWFpGT2ZGknjmbTrxvPwHGCyhtIseIvIO8EVTNu8ni1I5PI00qsHnFSfb"> */}
        <RootNavigation />
        {/* </StripeProvider> */}
      </CourseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
