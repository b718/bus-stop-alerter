import * as env from "@/data/env.json";
import * as endpoints from "@/data/endpoints.json";
import { useQuery } from '@tanstack/react-query';

function createGeoSearchQuery(searchQuery: string): string {
  const limit = "limit=5";
  const query = `q=${searchQuery.split(" ").join("+")}`;
  const key = `key=${env.openCageAPIKey}`;
  const language = "language=en";
  const pretty = "pretty=1";
  return `${query}&${key}&${language}&${pretty}&${limit}`;
}

async function fetchGeoSearchResults(searchQuery: string) {
  const query = createGeoSearchQuery(searchQuery);
  return fetch(`${endpoints.openCageEndpoint}${query}`).then((response) => response.json());
}

export function useGeoSearchQuery(searchQuery: string) {
  return useQuery({ queryKey: [searchQuery], queryFn: () => fetchGeoSearchResults(searchQuery)});
}


