import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

export default function TabsLayout() {
    return (
            <Tabs screenOptions={{ headerShown: false, tabBarStyle:{backgroundColor:"#09f"} }}>
                <Tabs.Screen name="profile" options={{ lazy:true, title: "Perfil", tabBarIcon: () => <AntDesign name="user" size={24} color="black" />, tabBarActiveBackgroundColor:"#0284db", tabBarActiveTintColor:"black", tabBarInactiveTintColor:"black" }} />
                <Tabs.Screen name="home" options={{ title: "Inicio", tabBarIcon: () => <AntDesign name="home" size={24} color="black" />, tabBarActiveBackgroundColor:"#0284db", tabBarActiveTintColor:"black", tabBarInactiveTintColor:"black" }} />
                <Tabs.Screen name="requests" options={{lazy:true, title: "Solicitudes", tabBarIcon: () => <Feather name="inbox" size={24} color="black" />, tabBarActiveBackgroundColor:"#0284db", tabBarActiveTintColor:"black", tabBarInactiveTintColor:"black" }} />
            </Tabs>
    )
}