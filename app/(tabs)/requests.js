import { ScrollView, Text, View } from "react-native";
import { DefaultScreen } from "../../components/defaultScreen";
import { GLOBAL_STYLES } from "../../styles/styles";

export default function Requests() {
    return (
        <DefaultScreen>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={[GLOBAL_STYLES.card, { height: "auto", width: 350 }]}>
                    <Text style={GLOBAL_STYLES.title}>Solicitudes</Text>
                    <Text >No hay solicitudes disponibles</Text>
                </View>
            </ScrollView>
        </DefaultScreen>
    );
 }