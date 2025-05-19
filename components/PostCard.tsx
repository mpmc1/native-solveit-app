import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { GLOBAL_STYLES } from "../styles/styles";
import { PostModel } from "../types/Posts";
import { Link } from "expo-router";

export function PostCard({ post }: { post: PostModel }) {
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = screenWidth / 2 - 24;
    return (
        <Link href={`/post/${post.id}`} key={post.id} asChild>
            <Pressable>
                <View style={[styles.card, { width: itemWidth }]}>
                    <Text style={GLOBAL_STYLES.cardTitle}>{post.titulo}</Text>
                    <Text style={{ marginBottom: 8 }}>{post.descripcion.length < 120 ? post.descripcion : post.descripcion.slice(0, 120) + '...'}</Text>
                    <Text style={{ fontSize: 10 }}>Creado por: {post.nombreUsuario}</Text>
                </View>
            </Pressable>
        </Link>

    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f0f0f0',
        margin: 6,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // shadow for Android
        shadowColor: '#000', // shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        height: 220,
    },
})