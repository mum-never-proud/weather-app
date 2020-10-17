import {
  FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE,
  FETCH_GEO_WEATHER_REQUEST, FETCH_GEO_WEATHER_SUCCESS, FETCH_GEO_WEATHER_FAILURE,
  ADD_TO_FAVORITES_REQUEST, ADD_TO_FAVORITES_SUCCESS, ADD_TO_FAVORITES_FAILURE,
  REMOVE_FROM_FAVORITES_REQUEST, REMOVE_FROM_FAVORITES_SUCCESS, REMOVE_FROM_FAVORITES_FAILURE,
  REMOVE_FROM_DEFAULT_REQUEST, REMOVE_FROM_DEFAULT_SUCCESS, REMOVE_FROM_DEFAULT_FAILURE,
  ADD_OR_UPDATE_COMMENT_REQUEST, ADD_OR_UPDATE_COMMENT_SUCCESS, ADD_OR_UPDATE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE,
} from '@action-types';

export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});

export const fetchWeatherSuccess = (payload) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload,
});

export const fetchWeatherFailure = (payload) => ({
  type: FETCH_WEATHER_FAILURE,
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

export const addToFavoritesRequest = () => ({
  type: ADD_TO_FAVORITES_REQUEST,
});

export const addToFavoritesSuccess = (payload) => ({
  type: ADD_TO_FAVORITES_SUCCESS,
  payload,
});

export const addToFavoritesFailure = (payload) => ({
  type: ADD_TO_FAVORITES_FAILURE,
  payload,
});

export const removeFromFavoritesRequest = () => ({
  type: REMOVE_FROM_FAVORITES_REQUEST,
});

export const removeFromFavoritesSuccess = (payload) => ({
  type: REMOVE_FROM_FAVORITES_SUCCESS,
  payload,
});

export const removeFromFavoritesFailure = (payload) => ({
  type: REMOVE_FROM_FAVORITES_FAILURE,
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

export const addOrUpdateCommentRequest = () => ({
  type: ADD_OR_UPDATE_COMMENT_REQUEST,
});

export const addOrUpdateCommentSuccess = (payload) => ({
  type: ADD_OR_UPDATE_COMMENT_SUCCESS,
  payload,
});

export const addOrUpdateCommentFailure = (payload) => ({
  type: ADD_OR_UPDATE_COMMENT_FAILURE,
  payload,
});

export const removeCommentRequest = () => ({
  type: REMOVE_COMMENT_REQUEST,
});

export const removeCommentSuccess = (payload) => ({
  type: REMOVE_COMMENT_SUCCESS,
  payload,
});

export const removeCommentFailure = (payload) => ({
  type: REMOVE_COMMENT_FAILURE,
  payload,
});
