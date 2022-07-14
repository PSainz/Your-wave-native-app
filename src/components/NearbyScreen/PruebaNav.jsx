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

import { OpenMapDirections } from "react-native-navigation-directions";
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default class App extends React.Component {
  _callShowDirections = () => {
    const startPoint = {
      longitude: -8.945406,
      latitude: 38.575078,
    };

    const endPoint = {
      longitude: -8.9454275,
      latitude: 38.5722429,
    };

    const transportPlan = "w";

    OpenMapDirections(startPoint, endPoint, transportPlan).then((res) => {
      console.log(res);
    });
  };

  render() {
    return (
      <View>
        <Text>Show direction between two random points!</Text>
        <Button
          onPress={() => {
            this._callShowDirections();
          }}
          title="Open map"
          color="#841584"
        />
      </View>
    );
  }
}
