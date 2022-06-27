// import * as React from "react";
// import { Checkbox } from "react-native-paper";

// const CheckBoxPrueba = () => {
//   const [checked, setChecked] = React.useState(false);

//   return (
//     <Checkbox
//       title="hOLA"
//       status={checked ? "checked" : "unchecked"}
//       onPress={() => {
//         setChecked(!checked);
//       }}
//     />
//   );
// };

// export default CheckBoxPrueba;

// import React, { useState } from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";
// import Ionicons from "@expo/vector-icons/Ionicons";

// function MyCheckbox({ checked, onChange }) {
//   function onCheckmarkPress() {
//     onChange(!checked);
//   }

//   return (
//     <Pressable
//       style={[styles.checkboxBase, checked && styles.checkboxChecked]}
//       onPress={onCheckmarkPress}
//     >
//       {checked && <Ionicons name="checkmark" size={24} color="white" />}
//     </Pressable>
//   );
// }

// function App() {
//   const [checked, onChange] = useState(false);

//   return (
//     <View style={styles.appContainer}>
//       <Text style={styles.appTitle}>Checkbox Example</Text>

//       <View style={styles.checkboxContainer}>
//         <MyCheckbox checked={checked} onChange={onChange} />
//         <Text style={styles.checkboxLabel}>Prueba</Text>

//         <MyCheckbox checked={checked} onChange={onChange} />
//         <Text style={styles.checkboxLabel}>Prueba2</Text>

//         <MyCheckbox checked={checked} onChange={onChange} />
//         <Text style={styles.checkboxLabel}>Prueba3</Text>
//       </View>
//     </View>
//   );
// }

// export default App;

// const styles = StyleSheet.create({
//   checkboxBase: {
//     width: 24,
//     height: 24,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 4,
//     borderWidth: 2,
//     borderColor: "coral",
//     backgroundColor: "transparent",
//   },

//   checkboxChecked: {
//     backgroundColor: "coral",
//   },

//   appContainer: {
//     flex: 1,
//     alignItems: "center",
//   },

//   appTitle: {
//     marginVertical: 16,
//     fontWeight: "bold",
//     fontSize: 24,
//   },

//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   checkboxLabel: {
//     marginLeft: 8,
//     // fontWeight: 500,
//     color: "black",
//     fontSize: 18,
//   },
// });

import React, { useState } from "react";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View } from "react-native";

const onpress = (e) => {
  console.log(e, "PREESED");
};

const staticData = [
  {
    id: 0,
    text: "Fat",
    fillColor: "#84E0DA",
    unfillColor: "white",
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
        data={staticData}
        style={{
          // paddingRight: 55,
          borderColor: "blue",
          borderWidth: 1,
          // flex: 3,
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
