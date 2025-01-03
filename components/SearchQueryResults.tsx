import { DestinationLocationContext } from "@/app/_layout";
import { OpenCageApiResponse } from "@/types/open-cage-api";
import { constructLocationObjectFromOpenCageAPI } from "@/utilities/user-destination/user-destination-adapter";
import { fetchGeoSearchResults } from "@/utilities/user-destination/user-destination-search-query";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDebounce } from "@uidotdev/usehooks";
import {
  widthPercentageToDP as screenWidthPercentage,
  heightPercentageToDP as screenHeightPercentage,
} from "react-native-responsive-screen";

type SearchQueryResultsProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

const ERROR_CODE = 400;

const RenderSeachQueryResults = ({ queryResultData, handlePress }: any) => {
  if (queryResultData.results.length === 0) {
    return <Text>No results found</Text>;
  }

  return queryResultData.results.map(
    (openCageApiResponse: OpenCageApiResponse, index: number) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(openCageApiResponse)}
        >
          <Text style={styles.searchBarResultsItem}>
            {index + 1}. {openCageApiResponse.formatted}
          </Text>
        </TouchableOpacity>
      );
    }
  );
};

const SearchQueryResults:FunctionComponent<SearchQueryResultsProps> = ({searchQuery, setSearchQuery}) => {
  const { setDestinationLocation } = useContext(DestinationLocationContext);
  const [queryResultData, setQueryResultData] = useState<any>(undefined);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const handlePress = (openCageApiResponse: OpenCageApiResponse) => {
    setDestinationLocation(constructLocationObjectFromOpenCageAPI(openCageApiResponse));
    setQueryResultData(undefined);
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchSearchQueryResults = async (debouncedSearchQuery: string) => {
      const data = await fetchGeoSearchResults(debouncedSearchQuery);
      setQueryResultData(data);
    };

    fetchSearchQueryResults(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <>
      {queryResultData && queryResultData.status.code != ERROR_CODE ? (
        <View style={styles.searchBarResults}>
          <ScrollView>
            <RenderSeachQueryResults
              queryResultData={queryResultData}
              handlePress={handlePress}
            />
          </ScrollView>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  searchBarResults: {
    alignItems: "center",
    minWidth: screenWidthPercentage("90%"),
    maxWidth: screenWidthPercentage("90%"),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
    maxHeight: screenHeightPercentage("25%"),
  },
  searchBarResultsItem: {
    borderWidth: 1,
    padding: 8,
    margin: 4,
    minWidth: screenWidthPercentage("80%"),
    maxWidth: screenWidthPercentage("80%"),
  }
});

export default SearchQueryResults;
