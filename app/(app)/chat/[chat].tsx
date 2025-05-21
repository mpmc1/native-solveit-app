import React, { useState, useRef } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { GLOBAL_STYLES } from "../../../styles/styles";
import { DefaultScreen } from "../../../components/defaultScreen";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Chat() {
    const [messages, setMessages] = useState([
        { id: 1, text: "¡Hola! ¿En qué puedo ayudarte?", fromMe: false },
        { id: 2, text: "Hola, tengo una duda sobre tu publicación.", fromMe: true },
    ]);
    const [input, setInput] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);

    const sendMessage = () => {
        if (input.trim() === "") return;
        setMessages([...messages, { id: Date.now(), text: input, fromMe: true }]);
        setInput("");
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    return (
        <DefaultScreen>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={80}
            >
                <View style={GLOBAL_STYLES.card}>
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={styles.messagesContainer}
                        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                    >
                        {messages.map((msg) => (
                            <View
                                key={msg.id}
                                style={[
                                    styles.messageBubble,
                                    msg.fromMe ? styles.myMessage : styles.otherMessage,
                                ]}
                            >
                                <Text style={styles.messageText}>{msg.text}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[GLOBAL_STYLES.input, { marginBottom: 0, width: 260, height: 'auto' }]}
                            value={input}
                            onChangeText={setInput}
                            placeholder="Escribe un mensaje..."
                            multiline
                        />
                        <Pressable style={styles.sendButton} onPress={sendMessage}>
                            <MaterialCommunityIcons name="send-outline" size={20} color="black" />
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#f5fcff",
        paddingVertical: 10,
    },
    messagesContainer: {
        width: 340,
        minHeight: 400,
    },
    messageBubble: {
        maxWidth: "80%",
        borderRadius: 12,
        padding: 10,
        marginVertical: 4,
    },
    myMessage: {
        backgroundColor: "#09f",
        alignSelf: "flex-end",
    },
    otherMessage: {
        backgroundColor: "#e0e0e0",
        alignSelf: "flex-start",
    },
    messageText: {
        color: "#222",
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 340,
        gap: 8,
        marginTop: 8,
    },
    sendButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 40,
        alignItems: "center",
    }
});