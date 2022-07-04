import React, { useState } from "react";
import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
import { waveForms } from "../../utils/waveForm.js";

const SelectWaveForm = (props) => {
  const [value, setValue] = useState(null);
  // console.log(value.value, "value wf");

  if (value !== null) {
    props.func(value.value);
  }

  return (
    <RNSingleSelect
      data={waveForms}
      placeholder="Wave form"
      width={360}
      menuBarContainerWidth={360}
      onSelect={(selectedItem) => setValue(selectedItem)}
    />
  );
};

export default SelectWaveForm;
