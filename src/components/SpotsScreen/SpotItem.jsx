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
  // const src = "./../../../assets/logo.png";
  const src =
    "https://media.istockphoto.com/photos/surfing-picture-id160896636?k=20&m=160896636&s=612x612&w=0&h=Lh-q3Rx3xW2O6R12hXyAAGx3N_6grI4_-7LqaezaJYE=";
  return (
    <View
      key={spot.id}
      style={{ padding: 20, paddingBottom: 5, paddingTop: 5 }}
    >
      <ImageBackground
        source={{ uri: spot.selectedFile || src }}
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
