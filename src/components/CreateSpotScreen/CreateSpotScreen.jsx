import React from "react";
import { Text, View } from "react-native";
import Form from "./Form";
import Cam from "./Cam";
import ActionSheet from "./ActionSheet";

const CreateSpotScreen = ({ location }) => {
  return (
    <View>
      <Text></Text>
      <Cam />
      <ActionSheet />
      {/* <Form location={location} /> */}
    </View>
  );
};

export default CreateSpotScreen;
