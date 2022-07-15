import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import { Marker } from "react-native-maps";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "../../utils/mapStyle";
import { OpenMapDirections } from "react-native-navigation-directions";
import { decode } from "@mapbox/polyline";
import GetDirections from "./GetDirections";

const Map = ({ spots, location }) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS;
  console.log(API_KEY, "api key");
  const [coords, setCoords] = useState([]);

  //   const getDirections = async (startLoc, destinationLoc) => {
  //     try {
  //       const KEY = ; //put your API key here.
  //       //otherwise, you'll have an 'unauthorized' error.
  //       let resp = await fetch(
  //         `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
  //       );
  //       let respJson = await resp.json();
  //       let points = decode(respJson.routes[0].overview_polyline.points);
  //       console.log(points);
  //       let coords = points.map((point, index) => {
  //         return {
  //           latitude: point[0],
  //           longitude: point[1],
  //         };
  //       });
  //       return coords;
  //     } catch (error) {
  //       return error;
  //     }
  //   };

  //   useEffect(() => {
  //     //fetch the coordinates and then store its value into the coords Hook.
  //     getDirections("52.5200066,13.404954", "50.1109221,8.6821267")
  //       .then((coords) => setCoords(coords))
  //       .catch((err) => console.log("Something went wrong"));
  //   }, []);

  const prueba = (spot) => {
    const mySpot = spots.slice(-1);
    console.log(spot, "coordinate");
    console.log("click");
    const startPoint = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const endPoint = {
      latitude: spot.location.lat,
      longitude: spot.location.lng,
    };

    const transportPlan = "d";

    OpenMapDirections(startPoint, endPoint, transportPlan).then((res) => {
      console.log(res, "RESPONSE DEL GET DIRECTIONS");
    });
    // return <GetDirections spots={spots} location={location} />;
  };

  const Loader = () => {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  };

  return location ? (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.fullMap}
        initialRegion={{
          latitude: location.coords.latitude || "",
          longitude: location.coords.longitude || "",
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        customMapStyle={mapStyle}
      >
        {/* {coords.length > 0 && <Polyline coordinates={coords} />} */}
        {spots.map((spot, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: spot.location.lat,
              longitude: spot.location.lng,
            }}
            title={spot.spot_name}
            pinColor={"#84E0DA"}
            onPress={() => prueba(spot)}
            //   description={marker.description}
          />
        ))}
        {/* <Button
          onPress={() => handlePress()}
          title={isActive ? "Show Map" : "Close Map"}
        /> */}
      </MapView>
      {/* <GetDirections spots={spots} location={location} /> */}
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
