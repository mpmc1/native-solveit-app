import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

const WS_URL = "http://192.168.20.29:9595/ws";

let stompClient: Client | null = null;

/**
 * Conecta al websocket y registra el usuario.
 * @param username Nombre de usuario para registrar y suscribirse.
 * @param onMessage Callback para mensajes recibidos.
 * @param onConnect Callback opcional al conectar.
 * @param onDisconnect Callback opcional al desconectar.
 */
export function connectChat(
    username: string,
    onMessage: (msg: any) => void,
    onConnect?: () => void,
    onDisconnect?: () => void
) {
    const socket = new SockJS(WS_URL);

    stompClient = new Client({
        webSocketFactory: () => socket,
        debug: () => { },
        onConnect: () => {

            // Suscribirse a la cola privada del usuario
            stompClient?.subscribe(`/user/${username}/queue/messages`, (message: IMessage) => {
                if (message.body) {
                    onMessage(JSON.parse(message.body));
                }
            });

            // Registrar usuario en el chat
            stompClient?.publish({
                destination: "/app/chat.register",
                body: JSON.stringify({
                    sender: username,
                    type: "JOIN",
                }),
            });

            if (onConnect) onConnect();
        },
        onStompError: (frame) => {
            console.error("STOMP error", frame);
            if (onDisconnect) onDisconnect();
        },
        onWebSocketClose: () => {
            if (onDisconnect) onDisconnect();
        }
    });

    stompClient.activate();
}

/**
 * Desconecta el websocket.
 */
export function disconnectChat() {
    stompClient?.deactivate();
    stompClient = null;
}

/**
 * Envía un mensaje privado a otro usuario.
 * @param sender Usuario que envía el mensaje.
 * @param recipient Usuario destinatario.
 * @param content Contenido del mensaje.
 */
export function sendMessage({
    sender,
    recipient,
    content
}: {
    sender: string;
    recipient: string;
    content: string;
}) {

    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify({
                sender,
                recipient,
                content,
                type: "CHAT",
                timestamp: null,
            }),
        });
    }
}