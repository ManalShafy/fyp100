import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterMenu from "../components/Menus/FooterMenu";

const QuizKey = () => {
  const route = useRoute();
  const { score, totalScore, reactQuestions } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attempted Quiz Key</Text>
      {/* <Image
          source={require("../../fypProject/assets/Exams-rafiki.png")}
          style={styles.img}
        />
        <Text style={styles.txt}>
          Congratulations! You Scored {score} Points out of {totalScore}
        </Text> */}

      <ScrollView
        style={styles.containerscroll}
        contentContainerStyle={styles.scrollContent} // Use contentContainerStyle here
      >
        {/* <Text style={styles.sectionTitle}>All Questions:</Text> */}

        {reactQuestions.questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>
              {index + 1}. {question.question}
            </Text>

            {question.options.map((option, optionIndex) => (
              <Text
                key={optionIndex}
                style={[
                  styles.option,
                  //   // option === question.correctAnswer
                  //   //   ? styles.correctAnswer
                  //     : null,
                ]}
              >
                {optionIndex + 1}. {option}
              </Text>
            ))}

            <Text style={styles.answer}>
              Correct Answer: {question.correctAnswer}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.btn2}
        onPress={() => navigation.navigate("quizSplash")}
      >
        <Text style={styles.BtnText}>Play Again</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
          style={styles.btn2}
          onPress={() =>
            navigation.navigate("QuizKey", {
              reactQuestions: reactQuestions,
            })
          }
        >
          <Text style={styles.BtnText}>View Key </Text>
        </TouchableOpacity> */}

      <View style={styles.containerEnd}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default QuizKey;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerscroll: {
    width: "100%", // Set full width for scroll view
  },
  scrollContent: {
    padding: 20, // Add padding to all sides of the scrollable content
    alignItems: "center", // Center items inside the ScrollView
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
  },
  img: {
    height: 250,
    width: 150,
  },
  txt: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
    //flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  questionContainer: {
    marginBottom: 15,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  correctAnswer: {
    color: "green",
    fontWeight: "bold",
  },
  answer: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
    fontWeight: "bold",
  },
});
