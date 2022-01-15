import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { COLOR, FONT_WEIGHT } from "./constants";

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.btnText}>Work</Text>
                <Text style={styles.btnText}>Learn</Text>
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
        color: COLOR.WHITE,
    },
});
