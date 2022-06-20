import React from "react";
import { Text, View, FlatList } from "react-native";
import spots from "../../data/spots.js";
import SpotItem from "./SpotItem.jsx";

const SpotsScreen = () => {
  return (
    <FlatList
      data={spots}
      ItemSeparatorComponent={() => <Text></Text>}
      renderItem={({ item: spot }) => <SpotItem {...spot} />}
    />
  );
};

export default SpotsScreen;
