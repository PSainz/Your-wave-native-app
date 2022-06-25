// import React, { useState, useCallback } from "react";
// import { Image, View } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
// import countries from "../../../src/utils/countries.js";

// const FormPrueba = () => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState(countries);
//   // const [items, setItems] = useState([
//   //   {
//   //     label: "Apple",
//   //     value: "apple",
//   //     // icon: () => (
//   //     //   <Image
//   //     //     style={{
//   //     //       width: 10,
//   //     //       height: 10,
//   //     //     }}
//   //     //     source={{
//   //     //       uri: imagen,
//   //     //     }}
//   //     //   />
//   //     // ),
//   //   },
//   //   {
//   //     label: "Banana",
//   //     value: "banana",
//   //     icon: () => (
//   //       <Image
//   //         source={require("./../CreateSpotScreen/plus.png")}
//   //         style={{
//   //           width: 10,
//   //           height: 10,
//   //         }}
//   //       />
//   //     ),
//   //   },
//   // ]);

//   return (
//     <DropDownPicker
//       open={open}
//       value={value}
//       items={items}
//       showArrowIcon={true}
//       showTickIcon={true}
//       setOpen={setOpen}
//       setValue={setValue}
//       setItems={setItems}
//       placeholder="Country*"
//       maxHeight={600}
//       zIndex={3000}
//     />
//   );
// };

// export default FormPrueba;

import React from "react";
import { View, StyleSheet } from "react-native";
import CountryPicker from "rn-country-dropdown-picker";

const FormPrueba = () => {
  const handleSelection = (e) => {
    console.log(e);
  };

  const styles = StyleSheet.create({
    container: {
      borderRadius: 2,
    },
  });

  return (
    <View style={styles.container}>
      <CountryPicker
        InputFieldStyle={styles.ContainerStyle}
        DropdownContainerStyle={styles.myDropdownContainerStyle}
        DropdownRowStyle={styles.myDropdownRowStyle}
        Placeholder="Country*"
        DropdownCountryTextStyle={styles.myDropdownCountryTextStyle}
        countryNameStyle={styles.mycountryNameStyle}
        flagSize={24}
        selectedItem={handleSelection}
      />
    </View>
  );
};

export default FormPrueba;
