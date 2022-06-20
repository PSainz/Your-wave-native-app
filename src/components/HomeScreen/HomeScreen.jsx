import React from "react";
import { ScrollView, StyleSheet } from "react-native";
// import { Button, Card } from "react-native-paper";
import { DefaultTheme } from "react-native-paper";
import { Text, View } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: DefaultTheme.colors.background,
    paddingTop: 10,
  },
  card: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default HomeScreen;

// import React from "react";
// import { Text, View } from "react-native";

// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>HomeScreen</Text>
//     </View>
//   );
// };

// export default HomeScreen;

// style={{ backgroundColor: "#84b6f4" }}
{
  /* <SpotItem {...spot} */
}
