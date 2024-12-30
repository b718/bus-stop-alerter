import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import {
  widthPercentageToDP as screenWidthPercentage,
  heightPercentageToDP as screenHeightPercentage,
} from "react-native-responsive-screen";
import SearchQueryResults from "./SearchQueryResults";

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
    justifyContent: "center",
    position: "absolute",
    zIndex: 3,
    width: screenWidthPercentage("90%"),
  },
  searchBar: {
    maxWidth: screenWidthPercentage("90%"),
    minWidth: screenWidthPercentage("90%"),
    marginTop: screenHeightPercentage("7%"),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
});

export default SearchMenu;
