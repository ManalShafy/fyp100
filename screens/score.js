import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterMenu from "../components/Menus/FooterMenu";

const score = () => {
  const route = useRoute();
  const { score, totalScore } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Image
        source={require("../../fypProject/assets/Exams-rafiki.png")}
        style={styles.img}
      />
      <Text style={styles.txt}>
        Congratulations Your Scored {score} Points out of Total {totalScore}
      </Text>
      <TouchableOpacity
        style={styles.btn2}
        onPress={() => navigation.navigate("quizSplash")}
      >
        <Text style={styles.BtnText}> Play Again</Text>
      </TouchableOpacity>
      <View style={styles.containerEnd}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default score;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
  },
  img: {
    height: 350,
    width: 250,
  },
  txt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btn2: {
    backgroundColor: "#800080",
    width: 280,
    marginTop: 30,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  BtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerEnd: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
