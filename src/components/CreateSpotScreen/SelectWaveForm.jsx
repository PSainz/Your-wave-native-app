import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { waveForms } from "../../utils/waveForm.js";

const SelectWaveDirection = ({ setWaveForm }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {value}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor={styles.iconColor}
        containerStyle={styles.containerStyle}
        data={waveForms}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Wave Form*" : "..."}
        dropdownPosition={"bottom"}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setWaveForm(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default SelectWaveDirection;

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 45,
    padding: 16,
    marginBottom: 10,
  },
  containerStyle: {
    backgroundColor: "gray",
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "transparent",
    left: 16,
    top: 0,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    display: "none",
  },
  placeholderStyle: {
    fontSize: 16,
    backgroundColor: "transparent",
  },
  selectedTextStyle: {
    fontSize: 16,
    backgroundColor: "transparent",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  iconColor: {
    color: "red",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
