import React from "react";
import { Text, View } from "react-native";
import MapNearby from "./MapNearby";
import PruebaNav from "./PruebaNav";

const NearbyScreen = ({ spots, location }) => {
  return (
    <View>
      <PruebaNav />
      {/* <MapNearby spots={spots} location={location} /> */}
    </View>
  );
};

export default NearbyScreen;
