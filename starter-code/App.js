import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/Navigator";
import HomeScreen from "./src/screen/HomeScreen";
import ItemScreen from "./src/screen/ItemScreen";
import { ItemsProvider } from "./src/components/ItemsContext";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ItemsProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Tab"
              component={Navigator}
              options={{ animation: "slide_from_bottom" }}
            ></Stack.Screen>
            <Stack.Screen
              name="ItemDetails"
              component={ItemScreen}
              options={({ navigation }) => ({
                navigation: navigation,
              })}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ItemsProvider>
  );
};

export default App;
