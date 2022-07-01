import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  ActionSheetIOS,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImgToBase64 from "react-native-image-base64";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  buttonContainer: {
    marginTop: 110,
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover",
  },
});

const Cam = (props) => {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      props.func(result.uri);
      ImgToBase64.getBase64String(result.uri)
        .then((base64String) => console.log(base64String, "Base64String"))
        .catch((err) => console.log(err));
      console.log(result.uri, "del cam");
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result, "result");

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  const openModalCam = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Take a picture", "Select existing photo"],
        // destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          console.log("Take picture");
          openCamera();
        } else if (buttonIndex === 2) {
          console.log("Select existing photo");
          showImagePicker();
        }
      }
    );

  return (
    <ScrollView>
      <Button onPress={openModalCam} title="Picture" />
    </ScrollView>
  );
};

export default Cam;
