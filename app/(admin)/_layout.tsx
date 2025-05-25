import { Provider } from "react-redux";
import { persistor, userStore } from "../../redux/user/userStore";
import { AdminProvider } from "../../context/adminContext";
import { PersistGate } from "redux-persist/integration/react";
import { Stack } from "expo-router";
import { DefaultScreen } from "../../components/defaultScreen";

export default function AdminLayout() {

    return (
        <Provider store={userStore}>
            <AdminProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <DefaultScreen>
                        <Stack screenOptions={{
                            headerShown: false
                        }} />
                    </DefaultScreen>
                </PersistGate>
            </AdminProvider>
        </Provider>
    )
}