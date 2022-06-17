import React from "react";
import { Text, View, FlatList } from "react-native";
import spots from "../data/spots.js";
import SpotItem from "./SpotItem.jsx";

const SpotsList = () => {
  console.log("---------------------------o----------------------------------");
  return (
    <FlatList
      data={spots}
      ItemSeparatorComponent={() => <Text></Text>}
      renderItem={({ item: spot }) => <SpotItem {...spot} />}
    />
  );
};

export default SpotsList;

// style={{ backgroundColor: "#84b6f4" }}
{
  /* <SpotItem {...spot} */
}
