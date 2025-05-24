import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GLOBAL_STYLES } from "../styles/styles";
import CustomAlert from "../utils/CustomAlert";
import { useState } from "react";

interface Props {
    ratingModalVisible: boolean;
    setRatingModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RateModal({ ratingModalVisible, setRatingModalVisible }: Props) {

    const [rating, setRating] = useState(0);

    function closeRatingModal() {
        setRatingModalVisible(false);
        setRating(0);
    }

    function handleSetRating(value: number) {
        setRating(value);
    }

    function handleSubmitRating() {
        CustomAlert("Gracias!", `Calificación enviada: ${rating} estrellas`, `Calificación enviada: ${rating} estrellas`)
        closeRatingModal();
    }

    return (
        <Modal
            visible={ratingModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeRatingModal}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.ratingModalContent}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 16, textAlign: "center" }}>
                        Califica el servicio
                    </Text>
                    <View style={styles.starsRow}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => handleSetRating(star)}>
                                <Image
                                    source={
                                        rating >= star
                                            ? require("../assets/star-filled.png")
                                            : require("../assets/star-outline.png")
                                    }
                                    style={styles.starIcon}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
                        <Pressable
                            style={[GLOBAL_STYLES.button, { flex: 1, marginRight: 8 }]}
                            onPress={handleSubmitRating}
                            disabled={rating === 0}
                        >
                            <Text style={GLOBAL_STYLES.buttonText}>Calificar</Text>
                        </Pressable>
                        <Pressable
                            style={[GLOBAL_STYLES.button, { backgroundColor: "#aaa", flex: 1, marginLeft: 8 }]}
                            onPress={closeRatingModal}
                        >
                            <Text style={GLOBAL_STYLES.buttonText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    starIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 4,
    },
    starsRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },
    ratingModalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 24,
        width: "85%",
        elevation: 5,
        alignItems: "center"
    },
});