import React from "react";
import { Text, View } from "react-native";
import Form from "./Form";
import FormPrueba from "./FormPrueba";
// import SelectCountries from "./SelectCountries";

const CreateSpotScreen = ({ location }) => {
  return (
    <View>
      {/* <SelectCountries /> */}
      <FormPrueba />
      <Text></Text>
      <Form location={location} />
    </View>
  );
};

export default CreateSpotScreen;
