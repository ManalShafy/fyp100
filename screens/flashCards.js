import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import FooterMenu from "../components/Menus/FooterMenu";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState({ questions: [] });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [designation, setDesignation] = useState("");
  const flatListRef = useRef(null);

  const handleFetchFlashcards = async () => {
    try {
      const response = await axios.post("/flashcards/generate_flashcards", {
        designation,
      });

      console.log("Fetched data:", response.data);

      setFlashcards(response.data);
      setCurrentIndex(0); // Reset index when new data is fetched
      setModalVisible(true); // Show modal after data is fetched
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleSubmitDesignation = () => {
    if (designation.trim()) {
      handleFetchFlashcards();
    } else {
      alert("Please enter a designation");
    }
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    const nextIndex = (currentIndex + 1) % flashcards.questions.length;
    setCurrentIndex(nextIndex);
    flatListRef.current.scrollToIndex({ index: nextIndex });
    setIsFlipped(false);
  };

  const handlePreviousCard = () => {
    const prevIndex =
      (currentIndex - 1 + flashcards.questions.length) %
      flashcards.questions.length;
    setCurrentIndex(prevIndex);
    flatListRef.current.scrollToIndex({ index: prevIndex });
    setIsFlipped(false);
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>
        {isFlipped ? item.answer : item.statement}
      </Text>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Flashcards</Text>
        <Image
          source={require("../../fypProject/assets/Education-rafiki.png")}
          style={styles.img}
        />
        <Text style={styles.title}>Enter designation</Text>

        <TextInput
          style={styles.input}
          value={designation}
          onChangeText={setDesignation}
        />
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.btn}
            onPress={handleSubmitDesignation}
          >
            <Text style={styles.BtnText}>Generate Flashcards</Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {flashcards.questions.length > 0 ? (
              <>
                <FlatList
                  ref={flatListRef}
                  data={flashcards.questions}
                  renderItem={renderCard}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  extraData={currentIndex}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handlePreviousCard}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Previous</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleFlipCard}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>
                      {isFlipped ? "Show Question" : "Show Answer"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNextCard}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text>No flashcards available</Text>
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <FooterMenu />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  container2: {
    alignItems: "center",
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    margin: 10,
  },
  cardText: {
    fontSize: 18,
    textAlign: "center",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: "#800080",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  BtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  img: {
    height: 350,
    width: 250,
  },
});

export default Flashcards;
