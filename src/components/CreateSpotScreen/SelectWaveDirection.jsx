import React, { useState } from "react";
import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
import { waveDirections } from "../../utils/waveDirections.js";

const SelectWaveDirection = (props) => {
  const [value, setValue] = useState(null);

  if (value !== null) {
    props.func(value.value);
  }

  return (
    <RNSingleSelect
      data={waveDirections}
      placeholder="Break type"
      width={360}
      menuBarContainerWidth={360}
      onSelect={(selectedItem) => setValue(selectedItem)}
    />
  );
};

export default SelectWaveDirection;
