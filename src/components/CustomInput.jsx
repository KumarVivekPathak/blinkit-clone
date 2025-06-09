import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const CustomInput = ({placeholder, value, onChangeText}) => {
    return (
        <View style={styles.container}>
            <Feather name="search" size={24} color="black" />
            <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} style={styles.input}/>
            
        </View>
    );
}

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 10,
        margin: 16,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    input:{
        flex: 1, 
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        color: 'gray',
        fontSize: 16,
        fontWeight: '500',
    }
});
