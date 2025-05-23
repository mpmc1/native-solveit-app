import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Link, useNavigation } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Constants from "expo-constants";
import { GLOBAL_STYLES } from "../../../styles/styles";
import { PostCard } from "../../../components/PostCard";
import { PostModel } from "../../../types/Posts";
import { listPost } from "../../../services/post";

export default function Home() {
    const [posts, setPosts] = useState<PostModel[]>(null);
    const [searchValue, setSearchValue] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            getPostsList();
        });

        return focus;
    }, [navigation]);

    const getPostsList = async () => {
        const response = await listPost();

        if (response) {
            setPosts(response);
        }
    }



    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: Constants.statusBarHeight }}>
            <View style={styles.topBar}>
                <TextInput placeholder="Buscar" value={searchValue} style={styles.searchInput} inputMode="text" onChangeText={setSearchValue} />
            </View>
            <View style={styles.content}>
                <Link href="/chat/0">Ir a chat</Link>
                <Text style={[GLOBAL_STYLES.title, { marginTop: 20 }]}>Publicaciones disponibles</Text>

                {posts && posts.length > 0 ? (
                    <FlatList
                        style={{ flex: 1, width: '100%' }}
                        data={posts}
                        renderItem={(item) => <PostCard post={item.item} />}
                        keyExtractor={(post) => post.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.container} />)
                    : (<Text >No hay publicaciones disponibles</Text>)}
            </View>
            <Link asChild href="/post/create">
                <Pressable style={styles.floatButton}>
                    <AntDesign name="plus" size={24} color="black" />
                </Pressable>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        padding: 10,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#09f'
    },
    searchInput: {
        ...GLOBAL_STYLES.input,
        marginBottom: 0,
        width: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        borderRadius: 10,
    },
    container: {
        padding: 12,
    },
    floatButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#09f',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    }
})