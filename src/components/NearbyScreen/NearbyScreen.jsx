import React from "react";
import { Text, View } from "react-native";
import MapNearby from "./MapNearby";
import SpotInfo from "./SpotInfo";

const NearbyScreen = ({ spots, location }) => {
  return (
    <View>
      {/* <SpotInfo /> */}
      <MapNearby spots={spots} location={location} />
    </View>
  );
};

export default NearbyScreen;
