import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const items = Object.values(cartItems);
  const total = items.reduce((sum, item) => sum + item.productData.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛒 Your Cart</Text>

      {items.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.productData.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image
                  source={{ uri: item.productData.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text numberOfLines={2} style={styles.title}>{item.productData.title}</Text>
                  <Text style={styles.price}>₹ {item.productData.price}</Text>

                  <View style={styles.qtyContainer}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => removeFromCart(item.productData.id)}>
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => addToCart(item.productData)}>
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ₹ {total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
              <Text style={styles.clearText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f9f9f9' },
    heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    emptyText: { fontSize: 16, textAlign: 'center', marginTop: 50 },
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 1,
    },
    image: { width: 70, height: 70 },
    title: { fontSize: 14, fontWeight: '600' },
    price: { fontWeight: 'bold', fontSize: 16, marginVertical: 4 },
    qtyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
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
    totalContainer: {
      padding: 10,
      borderTopWidth: 1,
      borderColor: '#ccc',
      marginTop: 10,
    },
    totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    clearBtn: {
      backgroundColor: '#ff3b30',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    clearText: { color: '#fff', fontWeight: 'bold' },
  });
  