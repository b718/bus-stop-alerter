import React, { useState } from "react";
import { View, StyleSheet, TextInput, Dimensions, Text } from "react-native";
import SearchQueryResults from "./SearchQueryResults";

const ScreenWidth = Dimensions.get("window").width;
const SearchMenu = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder={"Vancouver, BC"}
        placeholderTextColor={"#ccc"}
        value={searchQuery}
        onChangeText={(newQuery) => setSearchQuery(newQuery)}
      />
      <SearchQueryResults
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 3,
    width: ScreenWidth * 0.9,
  },
  searchBar: {
    maxWidth: ScreenWidth * 0.9,
    minWidth: ScreenWidth * 0.9,
    marginTop: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
});

export default SearchMenu;
