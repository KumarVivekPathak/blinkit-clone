import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

export default function CategoryScreen({ route }) {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  const fetchCategoryProducts = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error('Category Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const qty = cartItems[item.id]?.quantity || 0;

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>

        {qty === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
            <Text style={styles.addText}>+ Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => removeFromCart(item.id)}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => addToCart(item)}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{category.toUpperCase()}</Text>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f9f9f9' },
    heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    card: {
      backgroundColor: '#fff',
      flex: 1,
      margin: 5,
      padding: 10,
      borderRadius: 10,
      elevation: 1,
    },
    image: { height: 100, width: '100%', marginBottom: 10 },
    title: { fontSize: 14, fontWeight: '600' },
    price: { fontWeight: 'bold', fontSize: 16, marginVertical: 4 },
    addButton: {
      backgroundColor: '#00b050',
      padding: 8,
      borderRadius: 6,
      alignItems: 'center',
    },
    addText: { color: '#fff', fontWeight: 'bold' },
    qtyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    qtyBtn: {
      backgroundColor: '#ddd',
      borderRadius: 5,
      padding: 5,
      minWidth: 30,
      alignItems: 'center',
    },
    qtyText: { fontSize: 18, fontWeight: 'bold' },
    qty: { fontSize: 16, fontWeight: 'bold' },
  });
  