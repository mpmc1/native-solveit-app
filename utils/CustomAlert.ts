import { Alert, AlertButton, Platform } from "react-native";

export default function CustomAlert(title: string,
    message: string,
    webMessage: string,
    buttons?: AlertButton[]) {
    if (Platform.OS === 'web') {
        alert(webMessage);
    } else {
        Alert.alert(title, message, buttons ?? [{ text: "Ok" }])
    }
}