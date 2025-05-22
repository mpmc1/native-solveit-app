// components/CustomDropdown.js

import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { GLOBAL_STYLES } from '../../styles/styles';
import AntDesign from '@expo/vector-icons/AntDesign';

const CustomDropdown = ({ options = [], selected, onSelect, placeholder = 'Seleccionar opción' }) => {
    const [visible, setVisible] = useState(false);

    const handleSelect = (option) => {
        onSelect(option);
        setVisible(false);
    };

    return (
        <View>
            <Pressable style={[GLOBAL_STYLES.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]} onPress={() => setVisible(!visible)}>
                <Text style={selected ? {} : { color: "#5f5b5b" }}>{selected || placeholder}</Text>
                <AntDesign name="down" size={15} color="black" />
            </Pressable>
            {visible && (
                <View style={styles.dropdownAbsolute}>
                    <ScrollView style={styles.dropdownContainer}>
                        {options.map((item, idx) => (
                            <Pressable key={idx} style={styles.option} onPress={() => handleSelect(item)}>
                                <Text>{item}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default CustomDropdown;

const styles = StyleSheet.create({
    dropdownAbsolute: {
        position: 'absolute',
        top: 40,
        left: 0,
        width: '100%',
        zIndex: 100,
        elevation: 10,
    },
    dropdownContainer: {
        maxHeight: 100,
        backgroundColor: '#ebeded',
        borderRadius: 6,
        paddingVertical: 8,
        elevation: 5,
        shadowColor: '#e3e4e8',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});
