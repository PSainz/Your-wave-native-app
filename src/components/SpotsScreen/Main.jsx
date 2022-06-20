import React from "react";
import { Text, View } from "react-native";
import Constants from "expo-constants";
import SpotsList from "./SpotsList";

const Main = () => {
  return (
    <View
      style={{
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        backgroundColor: "#84b6f4",
      }}
    >
      <Text>Your wave App </Text>
      <SpotsList />
    </View>
  );
};

export default Main;

// style={{ backgroundColor: "#84b6f4" }}
