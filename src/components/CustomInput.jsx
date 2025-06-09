import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const CustomInput = ({placeholder, value, onChangeText, searchProduct}) => {
    return (
        <View style={styles.container}>
            <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} style={styles.input}/>
            <TouchableOpacity onPress={searchProduct} >
            <Feather name="search" size={20} color="black" style={styles.icon} />
            </TouchableOpacity>
            
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
        padding: 4,
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
    },
    icon: {
        marginLeft: 5,
        marginRight: 10,
    },
});
