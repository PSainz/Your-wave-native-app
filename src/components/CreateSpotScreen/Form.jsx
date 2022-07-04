import React, { useState } from "react";
import { Button, TextInput, View, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import CountryPicker from "react-native-country-picker-modal";
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import { vibes } from "../../utils/vibe.js";
import Cam from "./Cam";
import SelectWaveForm from "./SelectWaveForm.jsx";
import SelectWaveDirection from "./SelectWaveDirection.jsx";
import SelectBreakType from "./SelectBreakType.jsx";

const Form = ({ location }) => {
  const [country, setCountry] = useState("");
  const [waveForm, setWaveForm] = useState("");
  const [waveDirection, setWaveDirection] = useState("");
  const [breakType, setBreakType] = useState("");
  const [vibe, setVibe] = useState("");
  const [selected_File, setSelectedFile] = useState("");

  let countryRender = country.name || "Country";

  const pullCam = (pictureData) => {
    setSelectedFile(pictureData);
  };

  const pullWaveForm = (waveFormData) => {
    setWaveForm(waveFormData);
  };

  const pullWaveDirection = (waveDirectionData) => {
    setWaveDirection(waveDirectionData);
  };

  const pullBreakType = (breakTypeData) => {
    setBreakType(breakTypeData);
  };

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
        wave_form: waveForm,
        wave_direction: waveDirection,
        break_type: breakType,
        rating: values.rating,
        location: values.location,
        vibe: vibe,
        beer: values.beer,
        selectedFile: selected_File,
      }),
    });
    resetForm();
    setCountry("");
    setWaveForm("");
    setWaveDirection("");
    setBreakType("");
    setVibe("");
    setSelectedFile("");
  };

  const ControlRenderLocation = () => {
    return (
      <View>
        <Text>Necesitamos tu ubicación porfavor </Text>
      </View>
    );
  };

  return location ? (
    <ScrollView style={{ marginBottom: 40 }}>
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
          location:
            {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            } || "",
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
                marginBottom: 20,
              }}
            />

            <Text>Country*</Text>
            <CountryPicker
              placeholder={countryRender}
              withFilter
              withFlag
              withAlphaFilter={true}
              withCurrencyButton={false}
              withCallineCode={false}
              withCountryNameButton
              onSelect={(country) => {
                setCountry(country);
              }}
              containerButtonStyle={{
                height: 40,
                borderColor: "blue",
                borderWidth: 1,
                padding: 6,
                marginBottom: 20,
              }}
              label={country.name}
            />
            <Text>City*</Text>
            <TextInput
              onChangeText={handleChange("city")}
              onBlur={handleBlur("city")}
              value={values.city}
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
              }}
            />
            <Text
              style={{
                marginBottom: 20,
              }}
            >
              Spot details
            </Text>
            <SelectWaveForm func={pullWaveForm} />
            <SelectWaveDirection func={pullWaveDirection} />
            <SelectBreakType func={pullBreakType} />
            <Text>Vibe*</Text>
            <BouncyCheckboxGroup
              // textStyle={{
              //   textDecorationLine: "none",
              // }}
              data={vibes}
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 50,
                // alignItems: "space-evenly",
              }}
              onChange={(e) => setVibe(e.text)}
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
            <Cam func={pullCam} />
            {/* <Button onPress={openModalCam} title="Picture" /> */}
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
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </ScrollView>
  ) : (
    <ControlRenderLocation />
  );
};

export default Form;
