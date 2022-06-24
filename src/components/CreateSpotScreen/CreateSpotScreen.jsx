import React from "react";
import { Text, View } from "react-native";
import Form from "./Form";
// import SelectCountries from "./SelectCountries";

const CreateSpotScreen = ({ location }) => {
  return (
    <View>
      {/* <SelectCountries /> */}
      <Text></Text>
      <Form location={location} />
    </View>
  );
};

export default CreateSpotScreen;
