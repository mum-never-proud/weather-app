import {
  FETCH_CURRENT_WEATHER_REQUEST, FETCH_CURRENT_WEATHER_SUCCESS, FETCH_CURRENT_WEATHER_FAILURE,
  FETCH_CURRENT_LOCATION_WEATHER_REQUEST, FETCH_CURRENT_LOCATION_WEATHER_SUCCESS,
  FETCH_CURRENT_LOCATION_WEATHER_FAILURE,
  ADD_TO_FAVOURITES_REQUEST, ADD_TO_FAVOURITES_SUCCESS, ADD_TO_FAVOURITES_FAILURE,
  REMOVE_FROM_FAVOURITES_REQUEST, REMOVE_FROM_FAVOURITES_SUCCESS, REMOVE_FROM_FAVOURITES_FAILURE,
} from '@action-types';

export const fetchCurrentWeatherRequest = () => ({
  type: FETCH_CURRENT_WEATHER_REQUEST,
});

export const fetchCurrentWeatherSuccess = (payload) => ({
  type: FETCH_CURRENT_WEATHER_SUCCESS,
  payload,
});

export const fetchCurrentWeatherFailure = (payload) => ({
  type: FETCH_CURRENT_WEATHER_FAILURE,
  payload,
});

export const fetchCurrentLocationWeatherRequest = () => ({
  type: FETCH_CURRENT_LOCATION_WEATHER_REQUEST,
});

export const fetchCurrentLocationWeatherSuccess = (payload) => ({
  type: FETCH_CURRENT_LOCATION_WEATHER_SUCCESS,
  payload,
});

export const fetchCurrentLocationWeatherFailure = (payload) => ({
  type: FETCH_CURRENT_LOCATION_WEATHER_FAILURE,
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
