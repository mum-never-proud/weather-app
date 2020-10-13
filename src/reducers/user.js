import {
  FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_CURRENT_FAILURE,
  FETCH_GEO_WEATHER_REQUEST, FETCH_GEO_WEATHER_SUCCESS, FETCH_GEO_WEATHER_FAILURE,
  ADD_TO_FAVOURITES_REQUEST, ADD_TO_FAVOURITES_SUCCESS, ADD_TO_FAVOURITES_FAILURE,
  REMOVE_FROM_FAVOURITES_REQUEST, REMOVE_FROM_FAVOURITES_SUCCESS, REMOVE_FROM_FAVOURITES_FAILURE,
  REMOVE_FROM_DEFAULT_REQUEST, REMOVE_FROM_DEFAULT_SUCCESS, REMOVE_FROM_DEFAULT_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE,
} from '@action-types';

export const userState = {
  isFetchingWeatherReport: false,
  isFetchingGeoWeatherReport: false,
  isUpdatingStorage: false,
  isUpdateCommentSuccessful: false,
  currentLocationReport: undefined,
  geoWeatherError: '',
  favoriteCities: [],
  defaultCities: [],
  errors: [],
  notes: [],
};

export default function weatherReducer(state = userState, action) {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        isFetchingWeatherReport: true,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        isFetchingWeatherReport: false,
        ...action.payload,
      };
    case FETCH_CURRENT_FAILURE:
      return {
        ...state,
        isFetchingWeatherReport: false,
        errors: action.payload,
      };
    case FETCH_GEO_WEATHER_REQUEST:
      return {
        ...state,
        isFetchingGeoWeatherReport: true,
      };
    case FETCH_GEO_WEATHER_SUCCESS:
      return {
        ...state,
        isFetchingGeoWeatherReport: false,
        currentLocationReport: action.payload,
      };
    case FETCH_GEO_WEATHER_FAILURE:
      return {
        ...state,
        isFetchingGeoWeatherReport: false,
        geoWeatherError: action.payload,
      };
    case ADD_TO_FAVOURITES_REQUEST:
      return {
        ...state,
        isUpdatingStorage: true,
      };
    case ADD_TO_FAVOURITES_SUCCESS: {
      const { payload } = action;
      const weatherIndex = state.defaultCities.findIndex((report) => report.id === payload.id);

      if (weatherIndex === -1) {
        return state;
      }

      const defaultCities = [...state.defaultCities];

      defaultCities.splice(weatherIndex, 1);

      return {
        ...state,
        isUpdatingStorage: false,
        defaultCities,
        favoriteCities: state.favoriteCities.concat({ ...payload, isFavorite: true }),
      };
    }
    case ADD_TO_FAVOURITES_FAILURE:
      return {
        ...state,
        isUpdatingStorage: false,
      };
    case REMOVE_FROM_FAVOURITES_REQUEST:
      return {
        ...state,
        isUpdatingStorage: true,
      };
    case REMOVE_FROM_FAVOURITES_SUCCESS: {
      return {
        ...state,
        isUpdatingStorage: false,
        favoriteCities: state.favoriteCities.filter((city) => city.id !== action.payload),
      };
    }
    case REMOVE_FROM_FAVOURITES_FAILURE:
      return {
        ...state,
        isUpdatingStorage: false,
      };
    case REMOVE_FROM_DEFAULT_REQUEST:
      return {
        ...state,
        isUpdatingStorage: true,
      };
    case REMOVE_FROM_DEFAULT_SUCCESS: {
      return {
        ...state,
        isUpdatingStorage: false,
        defaultCities: state.defaultCities.filter((city) => city.id !== action.payload),
      };
    }
    case REMOVE_FROM_DEFAULT_FAILURE:
      return {
        ...state,
        isUpdatingStorage: false,
      };
    case ADD_COMMENT_REQUEST:
    case REMOVE_COMMENT_REQUEST:
      return {
        ...state,
        isUpdateCommentSuccessful: false,
        isUpdatingStorage: true,
      };
    case ADD_COMMENT_SUCCESS:
    case REMOVE_COMMENT_SUCCESS:
    {
      return {
        ...state,
        isUpdatingStorage: false,
        isUpdateCommentSuccessful: true,
        notes: action.payload,
      };
    }
    case ADD_COMMENT_FAILURE:
    case REMOVE_COMMENT_FAILURE:
      return {
        ...state,
        isUpdateCommentSuccessful: false,
        isUpdatingStorage: false,
      };
    default:
      return state;
  }
}
