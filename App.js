import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { CartProvider } from "./src/context/CartContext";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <CartProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
