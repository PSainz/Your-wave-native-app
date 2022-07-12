import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import { Marker } from "react-native-maps";
import CustomMarker from "./CustomMarker.jsx";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "../../utils/mapStyle";

const Map = (props) => {
  const [region, setRegion] = useState(props.location || null);
  const [isActive, setIsActive] = useState(true);

  if (region !== null) {
    props.func(region);
  }

  const handlePress = (e) => {
    setIsActive((current) => !current);
  };

  const Loader = () => {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  };

  return props.location ? (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={isActive ? styles.map : styles.fullMap}
        initialRegion={{
          latitude: props.location.coords.latitude || "",
          longitude: props.location.coords.longitude || "",
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        customMapStyle={mapStyle}
      >
        <Marker
          coordinate={{
            latitude: props.location.coords.latitude || "",
            longitude: props.location.coords.longitude || "",
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
          draggable
          onDragEnd={(e) => setRegion(e.nativeEvent.coordinate)}
          title={"Choose Location"}
          pinColor={"#84E0DA"}
          style={{ width: 26, height: 28 }}
        />
        <Button
          onPress={() => handlePress()}
          title={isActive ? "Show Map" : "Close Map"}
        />
      </MapView>
      <Text style={styles.text}>Move the pin to get exact location 🤙🏿</Text>
    </View>
  ) : (
    <Loader />
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // marginBottom: 100,
    // flex: 1,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 340,
    height: 240,
  },

  fullMap: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
});
