import React, { useState } from "react";
import { Button, TextInput, View, Text, Touchable } from "react-native";
import { Formik } from "formik";
import CountryPicker from "react-native-country-picker-modal";

const Form = ({ location }) => {
  const [country, setCountry] = useState("");

  const submitForm = (values, { resetForm }) => {
    const apiUrl = "https://your-wave-api.vercel.app/";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spot_name: values.spot_name,
        country: country.name,
        city: values.city,
        wave_form: values.wave_form,
        wave_direction: values.wave_direction,
        break_type: values.break_type,
        rating: values.rating,
        location: values.location,
        vibe: values.vibe,
        beer: values.beer,
      }),
    });

    resetForm();
  };

  const ControlRenderLocation = () => {
    return (
      <View>
        <Text>Necesitamos tu ubicación porfavor </Text>
      </View>
    );
  };
  return location ? (
    <Formik
      initialValues={{
        spot_name: "",
        country: "",
        city: "",
        wave_form: "",
        wave_direction: "",
        break_type: "",
        rating: "",
        vibe: "",
        beer: "",
        location: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
        selectedFile: "",
      }}
      onSubmit={submitForm}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text>Spot Name*</Text>
          <TextInput
            onChangeText={handleChange("spot_name")}
            onBlur={handleBlur("spot_name")}
            value={values.spot_name}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 5,
            }}
          />
          <CountryPicker
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            withFilter
            withFlag
            withAlphaFilter={false}
            withCurrencyButton={false}
            withCallineCode
            onSelect={(country) => {
              setCountry(country);
            }}
            containerButtonStyle={{
              height: 40,
              borderColor: "red",
              borderWidth: 1,
            }}
          />

          {/* <CountryPicker
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            withFilter
            withFlag
            withAlphaFilter={false}
            withCurrencyButton={false}
            withCallineCode
            onSelect={(country) => {
              setCountry(country);
            }}
          /> */}
          <Text>City*</Text>
          <TextInput
            onChangeText={handleChange("city")}
            onBlur={handleBlur("city")}
            value={values.city}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 3,
            }}
          />
          <Text>Wave form*</Text>
          <TextInput
            onChangeText={handleChange("wave_form")}
            onBlur={handleBlur("wave_form")}
            value={values.wave_form}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 5,
            }}
          />
          <Text>Wave direction*</Text>
          <TextInput
            onChangeText={handleChange("wave_direction")}
            onBlur={handleBlur("wave_direction")}
            value={values.wave_direction}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 5,
            }}
          />
          <Text>Break Type*</Text>
          <TextInput
            onChangeText={handleChange("break_type")}
            onBlur={handleBlur("break_type")}
            value={values.break_type}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 5,
            }}
          />
          <Text>Rating*</Text>
          <TextInput
            onChangeText={handleChange("rating")}
            onBlur={handleBlur("rating")}
            value={values.rating}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 5,
            }}
          />
          <Text>Vibe*</Text>
          <TextInput
            onChangeText={handleChange("vibe")}
            onBlur={handleBlur("rating")}
            value={values.vibe}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 5,
            }}
          />
          <Text>Beer*</Text>
          <TextInput
            onChangeText={handleChange("beer")}
            onBlur={handleBlur("rating")}
            value={values.beer}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 5,
            }}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  ) : (
    <ControlRenderLocation />
  );
};

export default Form;
