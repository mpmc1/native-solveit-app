import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const ExpansionPanel = ({ title, children }) => {
    const [expanded, setExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setExpanded(!expanded);
    };

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight],
    });

    return (
        <View style={styles.panelContainer}>
            <TouchableOpacity onPress={toggleExpand} style={styles.panelHeader}>
                <Text style={styles.panelTitle}>{title}</Text>
                {expanded ?
                    <AntDesign name="up" size={15} color="black" />

                    : <AntDesign name="down" size={15} color="black" />
                }
            </TouchableOpacity>
            <Animated.View style={[styles.panelBody, { height: heightInterpolate }]}>
                <View style={styles.contentWrapper} onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setContentHeight(height);
                }
                }>
                    {children}
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    panelContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        overflow: 'hidden',
        width: 350
    },
    panelHeader: {
        backgroundColor: '#eee',
        padding: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    panelTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    panelBody: {
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    contentWrapper: {
        padding: 12,
    },
});

export default ExpansionPanel;
