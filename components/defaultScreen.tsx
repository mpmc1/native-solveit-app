import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

export function DefaultScreen({ children }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#09f',
        paddingTop: Constants.statusBarHeight,
        paddingBottom: Constants.statusBarHeight,
    }
});