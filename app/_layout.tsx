import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { persistor, userStore } from "../redux/user/userStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "../context/authContext";

export default function Layout() {
    return (
        <Provider store={userStore}>
            <AuthProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <View style={styles.layoutContainer}>
                        <Stack screenOptions={{
                            headerShown: false
                        }} />
                    </View>
                </PersistGate>
            </AuthProvider>
        </Provider>
    )

}
const styles = StyleSheet.create({
    layoutContainer: {
        flex: 1
    }
})