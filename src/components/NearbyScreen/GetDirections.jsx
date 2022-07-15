import { OpenMapDirections } from "react-native-navigation-directions";
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const GetDirections = ({ spots, location }) => {
  const mySpot = spots.slice(-1);
  // console.log(location, "MY SPOT");
  const callShowDirections = () => {
    console.log(mySpot, "MY SPOT");
    const startPoint = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const endPoint = {
      latitude: mySpot[0].location.latitude,
      longitude: mySpot[0].location.longitude,
    };

    const transportPlan = "d";

    OpenMapDirections(startPoint, endPoint, transportPlan).then((res) => {
      console.log(res, "RESPONSE DEL GET DIRECTIONS");
    });
  };

  return (
    <View>
      <Text>Show direction between two random points!</Text>
      <Button
        onPress={() => {
          callShowDirections();
        }}
        title="Open map"
        color="#841584"
      />
    </View>
  );
};

export default GetDirections;

// import * as React from "react";
// import { StyleSheet, View } from "react-native";
// import MapboxNavigation from "@homee/react-native-mapbox-navigation";

// const PruebaNav = () => {
//   return (
//     <View style={styles.container}>
//       <MapboxNavigation
//         origin={[-97.760288, 30.273566]}
//         destination={[-97.918842, 30.494466]}
//         shouldSimulateRoute
//         showsEndOfRouteFeedback
//         onLocationChange={(event) => {
//           const { latitude, longitude } = event.nativeEvent;
//         }}
//         onRouteProgressChange={(event) => {
//           const {
//             distanceTraveled,
//             durationRemaining,
//             fractionTraveled,
//             distanceRemaining,
//           } = event.nativeEvent;
//         }}
//         onError={(event) => {
//           const { message } = event.nativeEvent;
//         }}
//         onCancelNavigation={() => {
//           // User tapped the "X" cancel button in the nav UI
//           // or canceled via the OS system tray on android.
//           // Do whatever you need to here.
//         }}
//         onArrive={() => {
//           // Called when you arrive at the destination.
//         }}
//       />
//     </View>
//   );
// };

// export default PruebaNav;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
