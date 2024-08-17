import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ChatState } from "../context/chatContext";

const Message = () => {
  const [fetchAgain, setFetchAgain] = useStateeState(false);
  const { user } = ChatState();
  return (
    <View>
      <Text>Message</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
