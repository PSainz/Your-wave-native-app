import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
  
import HomeScreen from "./src/components/HomeScreen/HomeScreen.jsx";
import CreateSpotScreen from "./src/components/CreateSpotScreen/CreateSpotScreen.jsx";
import SpotsScreen from "./src/components/SpotsScreen/SpotsScreen.jsx";
  
const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarOptions: {
        activeTintColor: "#006600",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-home"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
          />
        );
      },
    },
  },
  User: {
    screen: CreateSpotScreen,
    navigationOptions: {
      tabBarLabel: "Create",
      tabBarOptions: {
        activeTintColor: "#006600",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-person-circle-outline"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
          />
        );
      },
    },
  },
  Setting: {
    screen: SpotsScreen,
    navigationOptions: {
      tabBarLabel: "Spots",
      tabBarOptions: {
        activeTintColor: "#006600",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-settings-outline"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
          />
        );
      },
    },
  },
});
  
const Navigator = createAppContainer(TabNavigator);
  
export default function App() {
  return (
    <Navigator>
      <HomeScreen />
    </Navigator>
  );
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Provider as PaperProvider } from 'react-native-paper';
// import HomeScreen from "./src/components/HomeScreen/HomeScreen.jsx";
// import SpotsScreen from "./src/components/SpotsScreen/SpotsScreen.jsx";

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <PaperProvider>
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//         />
//         <Stack.Screen name="Spots" component={SpotsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     </PaperProvider>
//   );
// };
// export default App;