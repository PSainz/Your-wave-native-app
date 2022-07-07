import React from "react";
import { View } from "react-native";
import Form from "./Form";
import Map from "./Map";

const CreateSpotScreen = ({ location }) => {
  return (
    <View>
      <Map location={location} />
      {/* <Form location={location} /> */}
    </View>
  );
};

export default CreateSpotScreen;
