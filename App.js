import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SpotsScreen from './src/components/SpotsScreen/SpotsScreen';
import CreateSpotScreen from './src/components/CreateSpotScreen/CreateSpotScreen';
import NearbyScreen from './src/components/NearbyScreen/NearbyScreen';
import plus from './assets/plus.png'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRef } from 'react';
import { Provider } from 'react-redux';
import store from './store.js';

const Tab = createBottomTabNavigator();

function getWidth() {
  let width = Dimensions.get("window").width

  // Horizontal Padding = 20...
  width = width - 80

  // Total five Tabs...
  return width / 5
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#272F40',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default function App() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        showLabel: false,
        // Floating Tab Bar...
        style: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 20,
          // Max Height...
          height: 60,
          borderRadius: 10,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          paddingHorizontal: 20,
        }
      }}>

        <Tab.Screen name={"Spots"} component={SpotsScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="home"
                size={20}
                color={focused ? '#84E0DA' : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

        <Tab.Screen name={"Create"} component={CreateSpotScreen} options={{
          tabBarIcon: ({ focused }) => (
              <View style={{
                width: 55,
                height: 55,
                backgroundColor: '#84E0DA',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: Platform.OS == "android" ? 50 : 30
              }}>
                <Image source={plus} style={{
                  width: 22,
                  height: 22,
                  tintColor: '#272F40',
                }}></Image>
              </View>
          )
        }} listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true
              }).start();
            }
          })}></Tab.Screen>

       

        <Tab.Screen name={"Nearby"} component={NearbyScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="user-alt"
                size={20}
                color={focused ? '#84E0DA' : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 4,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

      </Tab.Navigator>

      <Animated.View style={{
        width: getWidth() - 20,
        height: 3,
        backgroundColor: '#84E0DA',
        position: 'absolute',
        bottom: 78,
        // Horizontal Padding = 20...
        left: 50,
        borderRadius: 20,
        transform: [
          { translateX: tabOffsetValue }
        ]
      }}>

      </Animated.View>
    </NavigationContainer>
    </Provider>
  );
}

