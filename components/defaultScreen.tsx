import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

type CustomContainerProps = {
    children: React.ReactNode;
    hasTab?: boolean;
};

export function DefaultScreen({ children, hasTab }: CustomContainerProps) {

    const hasTabStyle = StyleSheet.create({
        hasTab: {
            paddingBottom: hasTab ? 0 : Constants.statusBarHeight
        }
    })

    return (
        <View style={[styles.container, hasTabStyle.hasTab]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#09f',
        paddingTop: Constants.statusBarHeight,
    }
});