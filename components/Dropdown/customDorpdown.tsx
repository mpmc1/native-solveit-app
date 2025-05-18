// components/CustomDropdown.js

import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Modal,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { GLOBAL_STYLES } from '../../styles/styles';

const CustomDropdown = ({ options = [], selected, onSelect, placeholder = 'Seleccionar opción' }) => {
    const [visible, setVisible] = useState(false);

    const handleSelect = (option) => {
        onSelect(option); // comunicamos la selección al padre
        setVisible(false);
    };

    return (
        <View>
            <Pressable style={GLOBAL_STYLES.input} onPress={() => setVisible(true)}>
                <Text style={selected ? {} : { color: "#5f5b5b" }}>{selected || placeholder}</Text>
            </Pressable>

            <Modal
                transparent
                animationType="fade"
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPressOut={() => setVisible(false)}
                >
                    <View style={styles.dropdownContainer}>
                        <FlatList
                            data={options}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Pressable style={styles.option} onPress={() => handleSelect(item)}>
                                    <Text>{item}</Text>
                                </Pressable>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default CustomDropdown;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownContainer: {
        width: 200,
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
