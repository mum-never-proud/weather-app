import {
  FETCH_CURRENT_WEATHER_REQUEST, FETCH_CURRENT_WEATHER_SUCCESS, FETCH_CURRENT_WEATHER_FAILURE,
  FETCH_CURRENT_LOCATION_WEATHER_REQUEST, FETCH_CURRENT_LOCATION_WEATHER_SUCCESS,
  FETCH_CURRENT_LOCATION_WEATHER_FAILURE,
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
