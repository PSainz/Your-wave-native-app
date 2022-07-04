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
import * as FileSystem from "expo-file-system";

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
  const [pickedImagePath, setPickedImagePath] = useState("");

  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      // setSelectedFile(result.uri);
      setPickedImagePath(result.uri);
      props.func(result.uri);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      // setSelectedFile(result.uri);
      setPickedImagePath(result.uri);
      props.func(result.uri);
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
