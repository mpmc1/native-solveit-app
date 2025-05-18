import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import Constants  from "expo-constants";

export default function Layout() {
    return (
        <View  style={styles.layoutContainer}>
            <Slot />
        </View>
    )
    
}
const styles = StyleSheet.create({
    layoutContainer: {
        flex: 1,
        backgroundColor: '#09f',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingBottom: Constants.statusBarHeight,
    }
})