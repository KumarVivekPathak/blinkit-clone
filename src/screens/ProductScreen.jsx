import React, { use, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BASE_URL } from "../utils/config";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "../context/CartContext";

const ProductScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const { addToCart, cartItems } = useContext(CartContext);
  const [productData, setProductData] = useState({});

  const getProductDetails = async () => {
    try {
      const response = await axios(`${BASE_URL}/products/${productId}`);
      const data = await response.data;
      setProductData(data.product);
    } catch (error) {
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleAddToCart = () => {
    const items = Object.values(cartItems);
    const existingItem = items.find((item) => item.productData.id === productData.id);

    addToCart(productData);
    Alert.alert( "Product added to cart successfully!","Please Check Your Cart", [
      { text: "OK", onPress: () => navigation.navigate("Cart") },
    ]);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["bottom"]}
    >
      <ScrollView style={styles.container}>
        <Image source={{ uri: productData.image }} style={styles.imageStyle} />
        <Text style={styles.title}>{productData.title}</Text>
        <View style={styles.brandPriceContainer}>
          <Text style={styles.brand}>Brand : {productData.brand}</Text>
          <Text style={styles.price}>${productData.price}</Text>
        </View>
        <Text style={styles.color}>Color : {productData.color}</Text>
        <Text style={styles.color}>Model : {productData.model}</Text>
        <Text style={styles.description}>{productData.description}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleAddToCart}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 60,
  },
  imageStyle: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textWrap: "wrap",
  },
  price: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },

  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    // textAlign: 'justify',
    marginTop: 10,
    textWrap: "wrap",
  },
  brand: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  brandPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    backgroundColor: "lightgreen",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    position: "absolute",
    bottom: 20,
    width: "90%",
    marginHorizontal: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  color: {
    fontSize: 16,
    color: "black",
    fontWeight: "semibold",
  },
});
