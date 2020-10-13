import {
  FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_CURRENT_FAILURE,
  FETCH_GEO_WEATHER_REQUEST, FETCH_GEO_WEATHER_SUCCESS, FETCH_GEO_WEATHER_FAILURE,
  ADD_TO_FAVOURITES_REQUEST, ADD_TO_FAVOURITES_SUCCESS, ADD_TO_FAVOURITES_FAILURE,
  REMOVE_FROM_FAVOURITES_REQUEST, REMOVE_FROM_FAVOURITES_SUCCESS, REMOVE_FROM_FAVOURITES_FAILURE,
  REMOVE_FROM_DEFAULT_REQUEST, REMOVE_FROM_DEFAULT_SUCCESS, REMOVE_FROM_DEFAULT_FAILURE,
} from '@action-types';

export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});

export const fetchWeatherSuccess = (payload) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload,
});

export const fetchWeatherFailure = (payload) => ({
  type: FETCH_CURRENT_FAILURE,
  payload,
});

export const fetchGeoWeatherRequest = () => ({
  type: FETCH_GEO_WEATHER_REQUEST,
});

export const fetchGeoWeatherSuccess = (payload) => ({
  type: FETCH_GEO_WEATHER_SUCCESS,
  payload,
});

export const fetchGeoWeatherFailure = (payload) => ({
  type: FETCH_GEO_WEATHER_FAILURE,
  payload,
});

export const addToFavouritesRequest = () => ({
  type: ADD_TO_FAVOURITES_REQUEST,
});

export const addToFavouritesSuccess = (payload) => ({
  type: ADD_TO_FAVOURITES_SUCCESS,
  payload,
});

export const addToFavouritesFailure = (payload) => ({
  type: ADD_TO_FAVOURITES_FAILURE,
  payload,
});

export const removeFromFavouritesRequest = () => ({
  type: REMOVE_FROM_FAVOURITES_REQUEST,
});

export const removeFromFavouritesSuccess = (payload) => ({
  type: REMOVE_FROM_FAVOURITES_SUCCESS,
  payload,
});

export const removeFromFavouritesFailure = (payload) => ({
  type: REMOVE_FROM_FAVOURITES_FAILURE,
  payload,
});

export const removeFromDefaultRequest = () => ({
  type: REMOVE_FROM_DEFAULT_REQUEST,
});

export const removeFromDefaultSuccess = (payload) => ({
  type: REMOVE_FROM_DEFAULT_SUCCESS,
  payload,
});

export const removeFromDefaultFailure = (payload) => ({
  type: REMOVE_FROM_DEFAULT_FAILURE,
  payload,
});
