import React from "react";
import { Text, View } from "react-native";
import MapNearby from "./MapNearby";

const NearbyScreen = ({ spots, location }) => {
  return (
    <View>
      <MapNearby spots={spots} location={location} />
    </View>
  );
};

export default NearbyScreen;
