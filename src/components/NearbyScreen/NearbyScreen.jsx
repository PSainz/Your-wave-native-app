import React from "react";
import { Text, View } from "react-native";
import MapNearby from "./MapNearby";
import GetDirections from "./GetDirections";

const NearbyScreen = ({ spots, location }) => {
  return (
    <View>
      {/* <GetDirections spots={spots} location={location} /> */}
      <MapNearby spots={spots} location={location} />
    </View>
  );
};

export default NearbyScreen;
