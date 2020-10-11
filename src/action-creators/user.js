import {
  FETCH_CURRENT_WEATHER_REQUEST, FETCH_CURRENT_WEATHER_SUCCESS, FETCH_CURRENT_WEATHER_FAILURE,
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
