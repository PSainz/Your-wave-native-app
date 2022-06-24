import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import SpotItem from "./SpotItem.jsx";

export default SpotsScreen = ({ spots }) => {
  return (
    <View style={{ flex: 1, padding: 4 }}>
      {!spots ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={spots}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item: spot }) => <SpotItem {...spot} />}
        />
      )}
    </View>
  );
};
