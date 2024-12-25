export type OpenCageApiResponse = {
  annotations: {
    DMS?: {
      lat: string;
      lng: string;
    };
    MGRS?: string;
    Maidenhead?: string;
    Mercator?: {
      x: number;
      y: number;
    };
    // Add more fields as per your needs
    timezone?: {
      name: string;
      offset_sec: number;
      offset_string: string;
      short_name: string;
    };
    [key: string]: any; // For additional optional annotations
  };
  bounds?: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };
  components: {
    [key: string]: string | undefined;
    city?: string;
    country?: string;
    country_code?: string;
    postcode?: string;
    road?: string;
    state?: string;
  };
  confidence: number;
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
};
