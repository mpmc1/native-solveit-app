import { StyleSheet } from "react-native";

export const GLOBAL_STYLES = StyleSheet.create({
    input: {
        width: 250,
        height: 40,
        borderColor: "#e3e4e8",
        borderWidth: 2,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: "#ebeded",
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    }
});