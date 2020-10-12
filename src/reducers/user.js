import {
  FETCH_CURRENT_WEATHER_REQUEST, FETCH_CURRENT_WEATHER_SUCCESS, FETCH_CURRENT_WEATHER_FAILURE,
  FETCH_CURRENT_LOCATION_WEATHER_REQUEST, FETCH_CURRENT_LOCATION_WEATHER_SUCCESS,
  FETCH_CURRENT_LOCATION_WEATHER_FAILURE,
  ADD_TO_FAVOURITES_REQUEST, ADD_TO_FAVOURITES_SUCCESS, ADD_TO_FAVOURITES_FAILURE,
} from '@action-types';

export const userState = {
  isFetching: false,
  isFetchingGeoReport: false,
  isAddingToFavourites: false,
  currentLocationReport: undefined,
  geoReportError: '',
  favorites: [],
  default: [],
  errors: [],
};

export default function weatherReducer(state = userState, action) {
  switch (action.type) {
    case FETCH_CURRENT_WEATHER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload,
      };
    case FETCH_CURRENT_WEATHER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    case FETCH_CURRENT_LOCATION_WEATHER_REQUEST:
      return {
        ...state,
        isFetchingGeoReport: true,
      };
    case FETCH_CURRENT_LOCATION_WEATHER_SUCCESS:
      return {
        ...state,
        isFetchingGeoReport: false,
        currentLocationReport: action.payload,
      };
    case FETCH_CURRENT_LOCATION_WEATHER_FAILURE:
      return {
        ...state,
        isFetchingGeoReport: false,
        geoReportError: action.payload,
      };
    case ADD_TO_FAVOURITES_REQUEST:
      return {
        ...state,
        isAddingToFavourites: true,
      };
    case ADD_TO_FAVOURITES_SUCCESS:
      return {
        ...state,
        isAddingToFavourites: false,
      };
    case ADD_TO_FAVOURITES_FAILURE:
      return {
        ...state,
        isAddingToFavourites: false,
      };
    default:
      return state;
  }
}
