import { Provider } from "react-redux";
import { persistor, userStore } from "../../redux/user/userStore";
import { AdminProvider } from "../../context/adminContext";
import { PersistGate } from "redux-persist/integration/react";
import { Stack } from "expo-router";

export default function AdminLayout() {

    return (
        <Provider store={userStore}>
            <AdminProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <Stack screenOptions={{
                        headerShown: false
                    }} />
                </PersistGate>
            </AdminProvider>
        </Provider>
    )
}