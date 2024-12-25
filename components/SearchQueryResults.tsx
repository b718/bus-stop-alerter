import { DestinationLocationContext } from "@/app/_layout";
import { OpenCageApiResponse } from "@/types/open-cage-api";
import { constructLocationObjectFromOpenCageAPI } from "@/utilities/user-destination/user-destination-adapter";
import { useGeoSearchQuery } from "@/utilities/user-destination/user-destination-search-query";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SearchQueryResultsProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

const ScreenWidth = Dimensions.get("window").width;
const ERROR_CODE = 400;

const RenderSeachQueryResults = ({ queryResultData, handlePress }: any) => {
  return queryResultData.results.map(
    (openCageApiResponse: OpenCageApiResponse, index: number) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(openCageApiResponse)}
          style={styles.searchBarResultsItem}
        >
          <Text key={index}>{openCageApiResponse.formatted}</Text>
        </TouchableOpacity>
      );
    }
  );
};

const SearchQueryResults:FunctionComponent<SearchQueryResultsProps> = ({searchQuery, setSearchQuery}) => {
  const { destinationLocation, setDestinationLocation } = useContext(DestinationLocationContext);
  const { data, isLoading, isError } = useGeoSearchQuery(searchQuery);
  const [queryResultData, setQueryResultData] = useState<any>(undefined);
  const handlePress = (openCageApiResponse: OpenCageApiResponse) => {
    setDestinationLocation(constructLocationObjectFromOpenCageAPI(openCageApiResponse));
    setQueryResultData(undefined);
    setSearchQuery("");
  };

  useEffect(() => {
    setQueryResultData(data);
  }, [data]);

  
  return (
    <View style={styles.searchBarResults}>
      {queryResultData && queryResultData.status.code != ERROR_CODE ? (
        <RenderSeachQueryResults
          queryResultData={queryResultData}
          handlePress={handlePress}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarResults: {
    alignItems: "center",
    minWidth: ScreenWidth * 0.9,
    maxWidth: ScreenWidth * 0.9,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
  searchBarResultsItem: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    margin: 4,
    minWidth: ScreenWidth * 0.7,
    maxWidth: ScreenWidth * 0.7,
  }
});

export default SearchQueryResults;
