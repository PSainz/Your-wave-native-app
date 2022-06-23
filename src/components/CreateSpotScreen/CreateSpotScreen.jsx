import React from "react";
import { Text, View } from "react-native";
import Form from "./Form";

const CreateSpotScreen = ({ location }) => {
  console.log(location, "LOCATION CREATE");
  return (
    <View>
      <Form location={location} />
    </View>
  );
};

export default CreateSpotScreen;
