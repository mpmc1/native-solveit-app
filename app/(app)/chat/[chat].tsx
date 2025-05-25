import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { GLOBAL_STYLES } from "../../../styles/styles";
import { DefaultScreen } from "../../../components/defaultScreen";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { connectChat, disconnectChat, sendMessage as sendMessageWS } from "../../../services/chat";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/user/userStore";
import { jwtDecode } from "jwt-decode";

export default function Chat() {
    const { chat: recipient } = useLocalSearchParams<{ chat: string }>();
    const scrollViewRef = useRef<ScrollView>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [userId, setUserId] = useState<string>("");
    const [input, setInput] = useState("");
    const user = useSelector((state: RootState) => state.UserData);

    useEffect(() => {

        if (!user?.token) return;
        const decodedToken = jwtDecode(user.token);
        //@ts-ignore
        setUserId(decodedToken.UserId);
        connectChat(
            userId,
            (msg) => {

                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + Math.random(),
                        text: msg.content,
                        fromMe: Number(msg.sender) === Number(userId),
                    },
                ]);
                setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);
            }
        );
        return () => {
            disconnectChat();
        };
    }, [user?.token, userId]);

    const sendMessage = () => {
        if (input.trim() === "") return;
        sendMessageWS({
            sender: userId,
            recipient,
            content: input,
        });
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now() + Math.random(),
                text: input,
                fromMe: true,
            },
        ]);
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
                        {messages.map((msg, idx) => (
                            <View
                                key={msg.id || idx}
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
        height: "auto",
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