import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import { COLOR, FONT_WEIGHT } from "./constants";

interface toDoListState {
    [index: number]: toDoState;
}
interface toDoState {
    text: string;
    working: boolean;
}

const STORAGE_KEY = "@toDos";

export default function App() {
    const [working, setWorking] = useState<boolean>(true);
    const [text, setText] = useState<string>("");
    const [toDos, setToDos] = useState<toDoListState>({});
    const setToLearn = () => setWorking(false);
    const setToWork = () => setWorking(true);

    const onChangeText = (payload: string) => setText(payload);
    const saveToLocalStorage = async (toDos: toDoListState) =>
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toDos));
    const loadToDos = async () => {
        try {
            const loadedData = (await AsyncStorage.getItem(STORAGE_KEY)) || "";
            setToDos(JSON.parse(loadedData) as toDoListState);
        } catch (e) {
            console.log(e);
        }
    };

    const addToDo = async () => {
        if (text === "") return;

        const newToDos = { ...toDos, [Date.now()]: { text, working } };
        // 해싱 테이블에서 Date.now()가 키값으로 작동
        // Object.assign을 통해 객체를 합침
        setToDos(newToDos);
        try {
            await saveToLocalStorage(newToDos);
        } catch (e) {
            console.log(e);
        }
        setText("");
    };
    const deleteToDo = async (key: number) => {
        Alert.alert("ToDo를 삭제합니다", "동의하십니까?", [
            { text: "취소", style: "cancel" },
            {
                text: "삭제",
                style: "destructive",
                onPress: () => {
                    const newToDos = { ...toDos };
                    delete newToDos[key];
                    setToDos(newToDos);
                    try {
                        saveToLocalStorage(newToDos);
                    } catch (e) {
                        console.log(e);
                    }
                },
            },
        ]);
    };

    useEffect(() => {
        loadToDos();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <TouchableOpacity onPress={setToWork}>
                    <Text
                        style={{
                            fontSize: 38,
                            fontWeight: FONT_WEIGHT.BOLD,
                            color: working ? COLOR.WHITE : COLOR.DARK_GREY,
                        }}
                    >
                        Work
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={setToLearn}>
                    <Text
                        style={{
                            fontSize: 38,
                            fontWeight: FONT_WEIGHT.BOLD,
                            color: working ? COLOR.DARK_GREY : COLOR.WHITE,
                        }}
                    >
                        Learn
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TextInput
                    onChangeText={onChangeText}
                    onSubmitEditing={addToDo}
                    value={text}
                    placeholder={
                        working ? "업무를 추가하세요" : "스택을 추가하세요"
                    }
                    style={styles.input}
                    returnKeyType="done"
                />
            </View>
            <ScrollView>
                {Object.keys(toDos).map((key) =>
                    toDos[parseInt(key)].working === working ? (
                        <View style={styles.toDo} key={key}>
                            <Text style={styles.toDoText}>
                                {toDos[parseInt(key)].text}
                            </Text>
                            <TouchableOpacity
                                onPress={() => deleteToDo(parseInt(key))}
                            >
                                <Fontisto
                                    name="trash"
                                    size={18}
                                    color={COLOR.GREY}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : null
                )}
            </ScrollView>
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
    btnText: {},
    input: {
        backgroundColor: COLOR.WHITE,
        fontSize: 18,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 20,
        borderRadius: 30,
    },
    toDo: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: COLOR.DARK_GREY,
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginBottom: 10,
        borderRadius: 15,
    },
    toDoText: {
        fontSize: 16,
        color: COLOR.WHITE,
    },
});
