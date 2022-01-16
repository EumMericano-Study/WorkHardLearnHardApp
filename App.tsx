import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLOR, FONT_WEIGHT } from "./constants";

export default function App() {
  const [working, setWorking] = useState<boolean>(true);
  const [text, setText] = useState<string>("");

  const setToLearn = () => setWorking(false);
  const setToWork = () => setWorking(true);

  const onChangeText = (payload: string) => setText(payload);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={setToWork}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? COLOR.WHITE : COLOR.GREY,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={setToLearn}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? COLOR.GREY : COLOR.WHITE,
            }}
          >
            Learn
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          returnKeyType="send"
          onChangeText={onChangeText}
          value={text}
          placeholder={working ? "업무를 추가하세요" : "스택을 추가하세요"}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BLACK,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  input: {
    backgroundColor: COLOR.WHITE,
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 30,
  },
});
