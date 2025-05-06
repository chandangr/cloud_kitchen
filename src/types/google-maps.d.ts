declare namespace google.maps {
  interface PlacesService {
    getDetails(request: PlaceDetailsRequest, callback: (result: PlaceResult | null, status: PlacesServiceStatus) => void): void;
  }

  interface PlaceDetailsRequest {
    placeId: string;
  }

  interface PlaceResult {
    formatted_address: string;
    geometry: {
      location: LatLng;
    };
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  class AutocompleteService {
    getPlacePredictions(request: AutocompletionRequest): Promise<{ predictions: AutocompletePrediction[] }>;
  }

  interface AutocompletionRequest {
    input: string;
    types?: string[];
  }

  interface AutocompleteResponse {
    predictions: AutocompletePrediction[];
  }

  interface AutocompletePrediction {
    place_id: string;
    description: string;
    structured_formatting?: {
      main_text: string;
      secondary_text: string;
    };
    terms?: Array<{
      offset: number;
      value: string;
    }>;
    types?: string[];
    matched_substrings?: Array<{
      length: number;
      offset: number;
    }>;
  }

  class Geocoder {
    geocode(request: GeocoderRequest): Promise<GeocoderResponse>;
  }

  interface GeocoderRequest {
    placeId?: string;
    address?: string;
    location?: LatLng;
    bounds?: LatLngBounds;
    componentRestrictions?: GeocoderComponentRestrictions;
    region?: string;
  }

  interface GeocoderComponentRestrictions {
    country: string | string[];
  }

  interface LatLngBounds {
    northeast: LatLng;
    southwest: LatLng;
  }

  interface GeocoderResponse {
    results: GeocoderResult[];
    status: GeocoderStatus;
  }

  enum GeocoderStatus {
    OK = 'OK',
    ZERO_RESULTS = 'ZERO_RESULTS',
    OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
    REQUEST_DENIED = 'REQUEST_DENIED',
    INVALID_REQUEST = 'INVALID_REQUEST',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
  }

  interface GeocoderResult {
    formatted_address: string;
    geometry: {
      location: LatLng;
      location_type?: GeocoderLocationType;
      viewport?: LatLngBounds;
      bounds?: LatLngBounds;
    };
    place_id: string;
    types?: string[];
    address_components?: GeocoderAddressComponent[];
  }

  interface GeocoderAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  enum GeocoderLocationType {
    APPROXIMATE = 'APPROXIMATE',
    GEOMETRIC_CENTER = 'GEOMETRIC_CENTER',
    RANGE_INTERPOLATED = 'RANGE_INTERPOLATED',
    ROOFTOP = 'ROOFTOP'
  }

  enum GeocoderStatus {
    OK = 'OK',
    ZERO_RESULTS = 'ZERO_RESULTS',
    OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
    REQUEST_DENIED = 'REQUEST_DENIED',
    INVALID_REQUEST = 'INVALID_REQUEST',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
  }

  enum PlacesServiceStatus {
    OK = 'OK',
    ZERO_RESULTS = 'ZERO_RESULTS',
    OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
    REQUEST_DENIED = 'REQUEST_DENIED',
    INVALID_REQUEST = 'INVALID_REQUEST'
  }

  namespace places {
    class AutocompleteService {
      getPlacePredictions(request: AutocompletionRequest): Promise<AutocompleteResponse>;
    }
  }
}