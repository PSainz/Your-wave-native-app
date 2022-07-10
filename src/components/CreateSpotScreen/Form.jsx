import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Keyboard,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import CountryPicker from "react-native-country-picker-modal";
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import { vibes } from "../../utils/vibe.js";
import Cam from "./Cam";
import SelectWaveForm from "./SelectWaveForm.jsx";
import SelectWaveDirection from "./SelectWaveDirection.jsx";
import SelectBreakType from "./SelectBreakType.jsx";
import Map from "./Map.jsx";
import Rating from "./Rating.jsx";

const Form = ({ location }) => {
  const [country, setCountry] = useState("");
  const [waveForm, setWaveForm] = useState("");
  const [waveDirection, setWaveDirection] = useState("");
  const [breakType, setBreakType] = useState("");
  const [vibe, setVibe] = useState("");
  const [selected_File, setSelectedFile] = useState("");
  const [locationSelected, setLocation] = useState("");
  const [ratingSelected, setRating] = useState("");
  const [focus, setFocus] = useState(false);
  console.log("focus: " + focus);
  const beerNear = "Beer Near 🍻 ❄️";
  const customStyle = focus ? styles.textInputFocus : styles.spotName;

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

  const pullMap = (region) => {
    setLocation(region);
  };

  const pullRating = (ratingData) => {
    setRating(ratingData);
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
        rating: ratingSelected,
        location: locationSelected,
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
    setLocation("");
    setRating(0);
    console.log("submitForm");
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
          <View style={styles.container}>
            <Map func={pullMap} location={location} />
            <Text style={styles.spotNameText}>Spot Name*</Text>
            <TextInput
              onChangeText={handleChange("spot_name")}
              value={values.spot_name}
              style={customStyle}
              onFocus={() => setFocus(true)}
              //  Keyboard.dismmiss()
              onSubmitEditing={setFocus(false)}
              selectionColor="blue"
            />

            <Text style={styles.spotCountryText}>Country*</Text>
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
              containerButtonStyle={styles.country}
              label={country.name}
            />
            <Text style={styles.cityText}>City*</Text>
            <TextInput
              onChangeText={handleChange("city")}
              onBlur={handleBlur("city")}
              value={values.city}
              style={styles.cityInput}
            />
            <Text style={styles.spotDetailsText}>Spot details</Text>
            <SelectWaveForm func={pullWaveForm} />
            <SelectWaveDirection func={pullWaveDirection} />
            <SelectBreakType func={pullBreakType} />
            <Text style={styles.beerText}>{beerNear}</Text>
            <TextInput
              onChangeText={handleChange("beer")}
              onBlur={handleBlur("beer")}
              value={values.beer}
              style={styles.beerInput}
            />
            <Text style={styles.vibeText}>Vibe on the peak*</Text>
            <BouncyCheckboxGroup
              data={vibes}
              style={styles.vibeCheckbox}
              onChange={(e) => setVibe(e.text)}
            />

            <Cam func={pullCam} />
            <Text style={styles.ratingText}>Rate it!*</Text>
            <Rating func={pullRating} />
            <Pressable style={styles.buttonSubmit} onPress={handleSubmit}>
              <Text style={styles.text}>Submit</Text>
            </Pressable>
            {/* <Button
              onPress={handleSubmit}
              title="Submit"
              style={styles.buttonSubmit}
              color="#841584"
            /> */}
          </View>
        )}
      </Formik>
    </ScrollView>
  ) : (
    <ControlRenderLocation />
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInputFocus: {
    height: 45,
    width: 340,
    borderColor: "blue",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  spotName: {
    height: 45,
    width: 340,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  spotNameText: {
    marginTop: 30,
    marginRight: 235,
    marginBottom: 10,
    fontSize: 18,
  },
  spotCountryText: {
    marginTop: 0,
    marginRight: 255,
    marginBottom: 10,
    fontSize: 18,
  },
  cityText: {
    marginTop: 0,
    marginRight: 290,
    marginBottom: 10,
    fontSize: 18,
  },
  vibeText: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 30,
  },
  beerText: {
    marginTop: 80,
    marginRight: 190,
    marginBottom: 10,
    fontSize: 18,
  },
  country: {
    height: 45,
    width: 340,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  cityInput: {
    height: 45,
    width: 340,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  spotDetailsText: {
    fontSize: 25,
    marginRight: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
  },
  vibeCheckbox: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  beerInput: {
    height: 45,
    width: 340,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  buttonSubmit: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
