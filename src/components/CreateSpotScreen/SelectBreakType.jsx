import React, { useState } from "react";
import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
import { breakTypes } from "../../utils/breakTypes.js";

const SelectBreakType = (props) => {
  const [value, setValue] = useState(null);

  if (value !== null) {
    props.func(value.value);
  }

  return (
    <RNSingleSelect
      data={breakTypes}
      placeholder="Break type"
      width={360}
      menuBarContainerWidth={360}
      onSelect={(selectedItem) => setValue(selectedItem)}
    />
  );
};

export default SelectBreakType;
