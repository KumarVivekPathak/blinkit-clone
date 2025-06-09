import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../components/CustomInput";
import { BASE_URL } from "../utils/config";
import axios, { all } from "axios";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [Categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios(`${BASE_URL}/products/category`);
      const data = await response.data.categories;
      setCategories(data);
    } catch (error) {
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios(`${BASE_URL}/products`);
      const data = await response.data.products;
      // console.log("All Products:", data);
      const products = data
        .map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          description: product.description,
          image: product.image,
          brand: product.brand,
          model: product.model,
        }))
        .slice(0, 10);
      setAllProducts(products);
      console.log("All Products:", products);
    } catch (error) {
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const searchProduct = async () => {
    if (searchQuery.trim() === "") {
      getAllProducts();
      return;
    }

    const searchProduct = allProducts.filter((product) => {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setAllProducts(searchProduct);

  }

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, []);

  const handleProductPress = ({item}) => {
      navigation.navigate("ProductDetails", {
        productId: item.id,
      });
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate("Category", { categoryName: item })}>
        <Text style={styles.listItemTitle}>{capitalizeFirstLetter(item)}</Text>
      </TouchableOpacity>
    );
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={()=>handleProductPress({item})}>
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
    <SafeAreaView style={styles.container}>
      <CustomInput
        placeholder={"Search for the product"}
        value={searchQuery}
        onChangeText={handleSearch}
        searchProduct={searchProduct}
      />
      <ScrollView>
      <View>
        <Text style={styles.productcategoryText}>Product Category</Text>
        <FlatList
          data={Categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        {allProducts.length > 0 ? <View style={{flex:1,height: "100%"}}>
          <Text style={styles.allProductsText}>All Products</Text>
          <FlatList
            data={allProducts}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
            style={styles.productList}
            containerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          />
        </View> : 
        <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundTxt}>No Product Found</Text>
        </View>
        }
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
  },

  productcategoryText: {
    fontSize: 18,
    fontWeight: "semibold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  categoryItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    aliggnItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  allProductsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  productItem: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "lightyellow",
    flexDirection:"row",
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
  productList: {
    height: "100%",
    paddingVertical: 0,
    marginBottom: 0,
    // backgroundColor:'red',
  },
  notFoundContainer: {
    flex: 1,
    height: "100%",
    flexGrow: 1,
    width: "100%",
    paddingBottom: 20,
    justifyContent: "center", 
    alignItems: "center"
    
  },
  notFoundTxt:{
    textAlign: "center",
     marginTop: 20, 
     fontWeight:'bold', 
    fontSize: 24,
    }
});
