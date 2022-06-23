import React from "react";
import { Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";

const submitForm = (values, { resetForm }) => {
  console.log(values);
  fetch("https://your-wave-api.herokuapp.com/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spot_name: values.spot_name,
      country: values.country,
      city: values.city,
      wave_form: values.wave_form,
      wave_direction: values.wave_direction,
      break_type: values.break_type,
      rating: values.rating,
    }),
  });

  resetForm();
};

const Form = ({ location }) => (
  <Formik
    initialValues={{
      spot_name: "",
      country: "",
      city: "",
      wave_form: "",
      wave_direction: "",
      break_type: "",
      rating: "",
      location: "",
      selectedFile: "",
    }}
    onSubmit={submitForm}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <TextInput
          onChangeText={handleChange("spot_name")}
          onBlur={handleBlur("spot_name")}
          value={values.spot_name}
          style={{ backgroundColor: "grey", padding: 3, marginBottom: 3 }}
        />
        <TextInput
          onChangeText={handleChange("country")}
          onBlur={handleBlur("country")}
          value={values.country}
          style={{ backgroundColor: "grey", padding: 3, marginBottom: 3 }}
        />
        <TextInput
          onChangeText={handleChange("city")}
          onBlur={handleBlur("city")}
          value={values.city}
          style={{ backgroundColor: "grey", padding: 3, marginBottom: 3 }}
        />
        <TextInput
          onChangeText={handleChange("wave_form")}
          onBlur={handleBlur("wave_form")}
          value={values.wave_form}
          style={{ backgroundColor: "grey", padding: 3, marginBottom: 3 }}
        />
        <TextInput
          onChangeText={handleChange("wave_direction")}
          onBlur={handleBlur("wave_direction")}
          value={values.wave_direction}
          style={{ backgroundColor: "grey", padding: 3, marginBottom: 3 }}
        />
        <TextInput
          onChangeText={handleChange("break_type")}
          onBlur={handleBlur("break_type")}
          value={values.break_type}
          style={{ backgroundColor: "grey", padding: 3, marginBottom: 3 }}
        />
        <TextInput
          onChangeText={handleChange("rating")}
          onBlur={handleBlur("rating")}
          value={values.rating}
          style={{ backgroundColor: "grey", padding: 3, marginBottom: 3 }}
        />
        <Button onPress={handleSubmit} title="Submit" />
        <Text>{location.coords.latitude}</Text>
      </View>
    )}
  </Formik>
);

export default Form;
