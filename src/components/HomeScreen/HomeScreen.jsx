import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { DefaultTheme } from "react-native-paper";

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.scrollView}>
      <Card style={styles.card}>
        <Card.Title title="Navigate to 'Spots' Screen" />
        <Card.Content>
          <Button mode="contained" onPress={() => navigation.navigate("Spots")}>
            Navigate
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
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
