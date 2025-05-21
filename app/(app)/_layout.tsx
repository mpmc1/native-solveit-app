import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/authContext";

export default function PrivateLayout() {
    const { isSessionActive } = useAuth();
    return !isSessionActive ? (<Redirect href="/" />) : <Stack screenOptions={{
        headerShown: false
    }} />
}