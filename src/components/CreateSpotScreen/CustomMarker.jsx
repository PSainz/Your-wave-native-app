import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CustomMarker = () => {
  return (
    <View style={styles.marker}>
      <Text style={styles.color}>Tu puta madre</Text>
    </View>
  );
};
//styles for our custom marker.
const styles = StyleSheet.create({
  marker: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#007bff",
    borderColor: "#eee",
    borderRadius: 5,
    elevation: 10,
  },
  text: {
    color: "#fff",
  },
});

export default CustomMarker;
