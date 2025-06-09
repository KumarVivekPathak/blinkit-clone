import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextComponent,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../utils/config";
import axios from "axios";

const CategoryScreen = ({ navigation, route }) => {
  const { categoryName } = route.params || {};
  const [categoryData, setCategoryData] = useState(null);

  console.log("Category Name:", categoryName);

  const getCategortProducts = async () => {
    const response = await axios(
      `${BASE_URL}/products/category?type=${categoryName}`
    );
    const data = await response.data.products;
    const products = data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      brand: product.brand,
      model: product.model,
    }));
    setCategoryData(products);
    console.log("Category Products:", data);
  };

  const handleProductPress = ({ item }) => {
    navigation.navigate("ProductDetails", {
      productId: item.id,
    });
  };

  useEffect(() => {
    if (categoryName) {
      getCategortProducts();
    }
  }, [categoryName]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress({ item })}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 100, height: 100, marginBottom: 10 }}
      />
      <View style={styles.productItemDetails}>
        <Text style={styles.productItemTitle}>{item.title}</Text>
        <Text>Price: ${item.price}</Text>
        <Text>band: {item.brand}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        style={styles.productList}
        containerStyle={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  screenTitleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productList: {
    height: "100%",
    paddingVertical: 0,
    marginBottom: 0,
    // backgroundColor:'red',
  },
  productItem: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "lightyellow",
    flexDirection: "row",
    textAlign: "center",
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    elevation: 2,
  },
  productItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    textWrap: "wrap",
  },
  productItemDetails: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
