import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from "./src/components/HomeScreen/HomeScreen.jsx";
import SpotsScreen from "./src/components/SpotsScreen/SpotsScreen.jsx";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Spots" component={SpotsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};
export default App;