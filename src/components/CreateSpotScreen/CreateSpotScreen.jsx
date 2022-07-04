import React from "react";
import { View } from "react-native";
import Form from "./Form";

const CreateSpotScreen = ({ location }) => {
  return (
    <View>
      <Form location={location} />
    </View>
  );
};

export default CreateSpotScreen;
