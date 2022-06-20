import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { fetchSpots } from "../../redux/actions/SpotActions.js";
import { useDispatch, useSelector } from "react-redux";
import SpotItem from "./SpotItem.jsx";

export default SpotsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  // const getSpots = async () => {
  //   try {
  //     const response = await fetch("https://your-wave-api.herokuapp.com/");
  //     const json = await response.json();
  //     setData(json);
  //     // console.log(data, "DATA JSON");
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getSpots();
  // }, []);

  useEffect(() => {
    dispatch(fetchSpots(setData));
    setLoading(false);
  }, [dispatch]);

  console.log(data[0].location, "DATA");

  return (
    <View style={{ flex: 1, padding: 4 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item: spot }) => <SpotItem {...spot} />}
        />
      )}
    </View>
  );
};
