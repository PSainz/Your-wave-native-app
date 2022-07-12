import React from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import SpotItem from "./SpotItem.jsx";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default SpotsScreen = ({ spots }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 4 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!spots ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={spots}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item: spot }) => <SpotItem {...spot} />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
