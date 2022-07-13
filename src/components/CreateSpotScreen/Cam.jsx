import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Pressable,
  ActionSheetIOS,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome5";

const Cam = ({ setSelectedFile }) => {
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
      setPickedImagePath(result.uri);
      setSelectedFile(result.uri);
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
      setPickedImagePath(result.uri);
      setSelectedFile(result.uri);
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
          openCamera();
        } else if (buttonIndex === 2) {
          showImagePicker();
        }
      }
    );

  return (
    <View>
      <Pressable style={styles.buttonSubmit} onPress={openModalCam}>
        <Icon
          name="camera-retro"
          size={25}
          color="#84E0DA"
          onPress={openModalCam}
          style={styles.buttonCam}
        />
        <Text style={styles.text}>Take Picture</Text>
      </Pressable>
    </View>
  );
};

export default Cam;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  buttonSubmit: {
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 340,
    height: 45,
    marginBottom: 40,
  },
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
  buttonCam: {
    marginRight: 10,
  },
});
