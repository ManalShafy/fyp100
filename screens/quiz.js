import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
// import { reactQuestions } from "../assets/reactQuestions";
import FooterMenu from "../components/Menus/FooterMenu";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigation = useNavigation();

  const route = useRoute();
  const [reactQuestions, setReactQuestions] = useState([]);

  const { designation, difficulty } = route.params;
  const [totalScore, setTotalScore] = useState(0);

  console.log(" route check", totalScore, designation, difficulty);

  const fetchResponse = async () => {
    try {
      console.log(totalScore, designation, difficulty);

      const { data } = await axios.post("/quiz/generate-response-quiz", {
        designation: designation,
        difficulty: difficulty,
      });
      console.log("response check", data);
      // const response = JSON.parse(data.questions);

      console.log("react questions", data.questions);
      console.log("react queston", data.questions[0].options);
      setReactQuestions(data);
      console.log("react queston", data.questions[0].options);
      setTotalScore(data.questions.length);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex === reactQuestions.questions.length - 1) {
      navigation.navigate("score", { score: score, totalScore: totalScore });
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handlePrev = () => {
    if (currentQuestionIndex === 0) {
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOption = (pressedOption) => {
    setSelectedOption(pressedOption);
    const isAnswerCorrect =
      reactQuestions.questions[currentQuestionIndex].correctAnswer ===
      pressedOption;
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {reactQuestions.questions &&
          reactQuestions.questions[currentQuestionIndex].question}
      </Text>

      {reactQuestions.length == 0 ? (
        <></>
      ) : (
        reactQuestions.questions[currentQuestionIndex].options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.options,
              selectedOption === option && isCorrect === true
                ? styles.correctOption
                : selectedOption === option && isCorrect === false
                ? styles.incorrectOption
                : null,
            ]}
            onPress={() => handleOption(option)}
            disabled={!!selectedOption}
          >
            <Text style={styles.optionTxt}>{option}</Text>
          </TouchableOpacity>
        ))
      )}

      <View style={styles.btnCont}>
        {/* <TouchableOpacity style={styles.btn2} onPress={handlePrev}>
          <Text style={styles.BtnText}>Previous</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.btn2} onPress={handleNext}>
          <Text style={styles.BtnText}>
            {currentQuestionIndex === reactQuestions.length - 1
              ? "Finish Quiz"
              : "Next"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerEnd}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 14,
  },
  question: {
    fontSize: 26,
    marginBottom: 20,
  },
  options: {
    margin: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: "#800080",
    borderRadius: 5,
  },
  optionTxt: {
    fontSize: 16,
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
  btnCont: {
    alignItems: "center",
    // flexDirection: "row",
    // padding: 4,
    // justifyContent: "space-between",
  },
  containerEnd: {
    flex: 1,
    justifyContent: "flex-end",
  },
  correctOption: {
    borderColor: "green",
    backgroundColor: "#90ee90",
  },
  incorrectOption: {
    borderColor: "red",
    backgroundColor: "#cd5c5c",
  },
});
