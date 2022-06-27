import React, { useState } from "react";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import { Text, View } from "react-native";

const onpress = (e) => {
  console.log(e.text, "PREESED");
};

const staticData = [
  {
    id: 0,
    text: "Fat",
    fillColor: "#84E0DA",
    unfillColor: "white",
    textStyle: "",
  },
  {
    id: 1,
    text: "Hollow",
    fillColor: "#84E0DA",
    unfillColor: "white",
  },
  {
    id: 2,
    text: "Mellow",
    fillColor: "#84E0DA",
    unfillColor: "white",
  },
];

const CheckboxPrueba = () => {
  return (
    <View>
      <BouncyCheckboxGroup
        textStyle={{
          textDecorationLine: "none",
        }}
        data={staticData}
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "space-evenly",
        }}
        // onChange={(selectedItem: ICheckboxButton) => {
        //   console.log("SelectedItem: ", JSON.stringify(selectedItem));
        // }}
        onChange={(e) => onpress(e)}
      />
      {/* <Text>{staticData.label}</Text> */}
    </View>
  );
};

export default CheckboxPrueba;

// <BouncyCheckbox
//   size={25}
//   fillColor="red"
//   unfillColor="#FFFFFF"
//   text="Left"
//   iconStyle={{ borderColor: "red" }}
//   textStyle={{ fontFamily: "JosefinSans-Regular" }}
//   onPress={onpress}
// />
