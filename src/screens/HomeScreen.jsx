// src/screens/HomeScreen.js
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        axios.get('https://fakestoreapi.com/products/categories'),
        axios.get('https://fakestoreapi.com/products'),
      ]);
      setCategories(catRes.data);
      setAllProducts(prodRes.data);
      setProducts(prodRes.data);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setProducts(allProducts);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error('Category Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Blinkit Clone</Text>

      {/* Search */}
      <TextInput
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      {/* Categories */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={['', ...categories]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === item && styles.selectedCategory,
            ]}
            onPress={() => filterByCategory(item)}
          >
            <Text style={styles.categoryText}>
              {item === '' ? 'All' : item.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Product List */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Text numberOfLines={2} style={styles.productTitle}>
                {item.title}
              </Text>
              <Text style={styles.productPrice}>₹ {item.price}</Text>
              <TouchableOpacity
                onPress={() => addToCart(item)}
                style={styles.addButton}
              >
                <Text style={styles.addText}>+ Add</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 10,
      backgroundColor: '#f9f9f9',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    searchInput: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      borderColor: '#ddd',
      borderWidth: 1,
    },
    categoryItem: {
      backgroundColor: '#eee',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
    },
    selectedCategory: {
      backgroundColor: '#222',
    },
    categoryText: {
      color: '#000',
    },
    productList: {
      paddingBottom: 100,
    },
    card: {
      backgroundColor: '#fff',
      flex: 1,
      margin: 5,
      padding: 10,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#ccc',
    },
    productImage: {
      height: 100,
      width: '100%',
      marginBottom: 10,
    },
    productTitle: {
      fontSize: 14,
      fontWeight: '600',
    },
    productPrice: {
      marginVertical: 5,
      fontWeight: 'bold',
      fontSize: 16,
    },
    addButton: {
      backgroundColor: '#00b050',
      padding: 8,
      borderRadius: 6,
      alignItems: 'center',
    },
    addText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  
