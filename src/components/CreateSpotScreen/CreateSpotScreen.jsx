import React from "react";
import { Text, View } from "react-native";
import Form from "./Form";
import CheckBox from "./CheckboxPrueba";

const CreateSpotScreen = ({ location }) => {
  return (
    <View>
      <CheckBox />
      <Text></Text>
      <Form location={location} />
    </View>
  );
};

export default CreateSpotScreen;
