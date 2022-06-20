import React from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

const SpotItem = (spot) => {
  return (
    <View
      key={spot.id}
      style={{ padding: 20, paddingBottom: 5, paddingTop: 5 }}
    >
      <ImageBackground
        source={{ uri: spot.selectedFile }}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}>{spot.spot_name}</Text>
        <Text style={styles.text}>{spot.break_type}</Text>
        <Text style={styles.text}>{spot.city}</Text>
        <Text style={styles.text}>{spot.country}</Text>
      </ImageBackground>
    </View>
  );
};

export default SpotItem;
