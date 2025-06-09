
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../components/CustomInput';
import { BASE_URL } from '../utils/config';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  

  const handleSearch = (text) => {
    setSearchQuery(text);
  }


  return (
    <SafeAreaView>
      <CustomInput placeholder={"Search for the product"} value={searchQuery} onChangeText={handleSearch} />


      
    </SafeAreaView>
  );
}


export default HomeScreen;